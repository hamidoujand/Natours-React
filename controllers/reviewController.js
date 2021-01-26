let Review = require("../models/Review");
let catchAsync = require("../utils/catchAsync");
let AppError = require("../utils/AppError");
const Booking = require("../models/Booking");

exports.createReview = catchAsync(async (req, res, next) => {
  let review = await Review.create({
    review: req.body.review,
    rating: req.body.rating,
    tour: req.body.tour || req.params.tourId,
    user: req.user._id,
  });
  res.status(201).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter.tour = req.params.tourId;
  let allReviews = await Review.find(filter);
  res.status(200).json({
    status: "success",
    result: allReviews.length,
    data: {
      allReviews,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  let review = await Review.findOneAndDelete({
    user: req.user._id,
    _id: req.params.reviewId,
  });

  if (!review) {
    return next(new AppError("There is No review with this ID", 404));
  }

  res.status(204).json({
    status: "success",
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  let reviewId = req.params.reviewId;
  let user = req.user._id;
  let review = await Review.findByIdAndUpdate(
    { _id: reviewId, user },
    req.body,
    { runValidators: true, new: true }
  );
  if (!review) return next(new AppError("No review with this id", 404));
  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});
