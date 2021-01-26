let User = require("../models/User");
let AppError = require("../utils/AppError");
let catchAsync = require("../utils/catchAsync");
let filterObj = require("../utils/filterObjects");
let multer = require("multer");
let path = require("path");
let sharp = require("sharp");

// let multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../public/img/users"));
//   },
//   filename: (req, file, cb) => {
//     let extension = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user._id}-${Date.now()}.${extension}`);
//   },
// });

let multerStorage = multer.memoryStorage();

let multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    let error = new AppError("Not an image please upload only images", 400);
    cb(error, false);
  }
};

let upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhotos = upload.single("photo");

exports.resizeUserPhotos = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`; //we need to save it here because when its in memory the filename not exists
  //so we set it manually
  //we hard code the extension because we always turning them into jpeg
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(__dirname, `../public/img/users/${req.file.filename}`));

  next();
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: users,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //1)creates  error if user post info about password
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError('please use "/update-password" for updating password ', 400)
    );
  //2) update user info
  //we need to filter the obj because maybe user want to update the role
  let updates = filterObj(req.body, "name", "email");
  if (req.file) {
    updates.photo = req.file.filename;
  }

  let user = await User.findByIdAndUpdate(req.user._id, updates, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  let user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { active: false }
  );
  res.status(204).json({
    status: "success",
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user._id);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
