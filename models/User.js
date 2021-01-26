let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let { default: validator } = require("validator");
let bcrypt = require("bcryptjs");
let crypto = require("crypto");

let userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "email is required"],
    validate: [validator.isEmail, "this email address is invalid"],
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["admin", "user", "guide", "lead-guide"],
      message: "value must be 'admin' 'user' 'guide' 'lead-guide'",
    },
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    trim: true,
    required: [true, "password is required"],
    minlength: [8, "password must be at least 8 char"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "passwordConfirm is required"],
    validate: {
      validator(value) {
        return value === this.password;
      },
      message: "password and passwordConfirm don't match",
    },
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next(); //because this is 'pre' hook so the save will be call after
});

userSchema.methods.correctPassword = async function (
  hashPassword,
  userPassword
) {
  //because we set the 'select' on password "false" so again we do not access to it on "this"
  //so we pass it from the controller
  return await bcrypt.compare(userPassword, hashPassword);
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    //if doc is New or the passWord is not modified and just .save() on another prop

    return next();
  }
  //problem happens because this is a "preSave" and doc would not be save till next hook so the JWT token will be some time initialize before the
  //passwordChangedAt to set so token is not going to be valid
  this.passwordChangedAt = new Date(Date.now() - 3000);
  next();
});

userSchema.methods.isRecentlyChangedPassword = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    return this.passwordChangedAt.getTime() / 1000 > jwtTimestamp;
  }
  return false;
};

userSchema.methods.generateResetToken = async function () {
  let randomBytes = crypto.randomBytes(32).toString("hex");
  let hash = crypto.createHash("sha256").update(randomBytes).digest("hex");
  this.passwordResetToken = hash;
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); //expires in 10 mins
  await this.save({ validateBeforeSave: false });
  return randomBytes;
};

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = mongoose.model("User", userSchema);
