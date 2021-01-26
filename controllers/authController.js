let jwt = require("jsonwebtoken");
let crypto = require("crypto");
let User = require("../models/User");
let AppError = require("../utils/AppError");
let catchAsync = require("../utils/catchAsync");
let Email = require("../utils/email");
let filterObj = require("../utils/filterObjects");

let signJwtToken = (id) => {
  let token = jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.signup = catchAsync(async (req, res, next) => {
  let newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  let url = `${req.protocol}://${req.get("host")}/me`;
  new Email(newUser, url).sendWelcome();
  createSendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;
  //1) check if pass and email are defined
  if (!email || !password) {
    return next(new AppError("Please provide  Email and Password", 400));
  }
  //2) check the user exits and password match
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }
  let isCorrectPass = await user.correctPassword(user.password, password);
  if (!isCorrectPass) {
    return next(new AppError("Invalid email or password", 401));
  }
  //3) if everything is ok send the token
  createSendToken(user, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) get user base on email
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("There is no user related to this Email", 404));
  }
  //2) generate random token
  let token = await user.generateResetToken();
  //3) send it as email
  let resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/reset-password/${token}`;

  try {
    new Email(user, resetUrl).sendPasswordResetEmail();
    res.status(200).json({
      status: "success",
      message: "token sent to email",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error with sending email please try later",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  let token = req.params.token;
  //1) get user based on the token
  let hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  let user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  });
  if (!user) {
    return next(new AppError("Token is Expired please try again", 400));
  }
  //2) if token is not expired we change the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  //3) we remove those passwordRestToken and passwordExpire
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //4) log the user in and generate a token
  createSendToken(user, 200, res);
});

exports.protectRoutes = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    token = req.headers["authorization"].split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  //1) get the token and check if exists
  if (!token) {
    return next(
      new AppError("You are not logged in please login to get access", 401)
    );
  }
  //2) validate the token
  //Because we are using 'catchAsync'  so if these throw an error goes to .catch
  let data = jwt.verify(token, process.env.JWT_SECRET);
  //3) check user still exists
  let user = await User.findById(data._id);
  if (!user) {
    return next(new AppError("There is no user related to this token ", 401));
  }

  //4) check if user changed password after the jwt was issued
  if (user.isRecentlyChangedPassword(data.iat)) {
    return next(
      new AppError("user recently changed the password please login again", 401)
    );
  }

  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    } else {
      return next(new AppError("you are not Authorized to get access", 403));
    }
  };
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1) get the user from collection
  let { password, newPassword, newPasswordConfirm } = req.body;
  let user = await User.findOne({ _id: req.user._id }).select("+password");
  //2) check the posted password to be equal to the hash we have
  let isPasswordCorrect = await user.correctPassword(user.password, password);
  //3) if all good change the password
  if (!isPasswordCorrect) {
    return next(new AppError("password is invalid", 400));
  }
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  await user.save();
  //4) login user
  createSendToken(user, 200, res);
});

let createSendToken = (user, statusCode, res) => {
  user.password = undefined;
  let token = signJwtToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date( //browser will delete it  after this time so make sure the time match with jwt expire
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    secure: process.env.NODE_ENV === "production" ? true : false, //only cookie will be sent over https
    httpOnly: true, //only the server can read it client wont access it
  });
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "logged out", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(302).redirect("/");
};
