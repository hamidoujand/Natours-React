const AppError = require("../utils/AppError");
let ApiError = require("../utils/AppError");

let sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
  });
};

let sendErrorProd = (err, res) => {
  //for Operational Errors because these are our error with nice messages
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      //any other kind of error
      status: "error",
      message: "Something went very wrong",
    });
  }
};

let handleCastErrorDB = (err) => {
  let path = err.path;
  let value = err.value;
  return new ApiError(`invalid ${value} for path ${path}`, 400); //here we handle it with our app
};

let handleDuplicatedField = (err) => {
  let value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  let message = `Duplicated filed value : ${value}`;
  return new ApiError(message, 404);
};

let handleMongooseValidation = (err) => {
  let message = Object.values(err.errors)
    .map((filed) => filed.message)
    .join("   ");
  return new ApiError(message, 404);
};

let handleInvalidJwtToken = (err) => {
  return new AppError("Invalid token please login again", 401);
};

let handleJwtExpire = (err) =>
  new ApiError("Token is Expired please login again", 401);

module.exports = (err, req, res, next) => {
  //these 2 thing are mutual between all so we set them here
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res); //here we send all the error
  } else if (process.env.NODE_ENV === "production") {
    let error;
    //here we need to modify all errors to be our customize
    if (err.name === "CastError") error = handleCastErrorDB(err);
    //handle duplicate
    if (err.code === 11000) error = handleDuplicatedField(err);
    //handle mongoose validation Error
    if (err.name === "ValidationError") error = handleMongooseValidation(err);
    //handle Invalid JWT
    if (err.name === "JsonWebTokenError") error = handleInvalidJwtToken(err);
    //handle JWT expire error
    if (err.name === "TokenExpiredError") error = handleJwtExpire(err);
    sendErrorProd(error ? error : err, res); //here we send customize messages
  }
};
