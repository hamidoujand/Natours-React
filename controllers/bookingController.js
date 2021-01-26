let stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
let catchAsync = require("../utils/catchAsync");
let AppError = require("../utils/AppError");
let Tour = require("../models/Tour");
let Booking = require("../models/Booking");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  //1-get currently booked tour
  let tour = await Tour.findById(req.params.tourId);
  //2-create checkout session
  let session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/`, //this url for redirecting user,
    cancel_url: `${req.protocol}://${req.get("host")}/tours/${tour.id}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId, //here we passing some data that we need for recognizing the session and then store those in Booking Model
    //we have access to the "user_id" and "user_email" in the final route but we do not have access to the tourId so we just pass this one as the client
    //reference id
    line_items: [
      //some details about the product itself
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        images: [], //must be live images hosted on a real live server
        amount: tour.price * 100, //because it have to be in cents
        currency: "usd",
        quantity: 1,
      },
    ],
  });
  res.status(200).json({
    status: "success",
    data: {
      session,
    },
  });
});

exports.createNewBooking = catchAsync(async (req, res, next) => {
  let { tour, userId, price } = req.body;
  await Booking.create({
    tour,
    user: userId,
    price,
  });
  res.status(201).json({
    status: "success",
  });
});

exports.getUsersBookedTours = catchAsync(async (req, res, next) => {
  let bookings = await Booking.find({ user: req.user._id });
  let tourIds = bookings.map((booking) => booking.tour);
  let tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  let allBookings = await Booking.find();
  res.status(200).json({
    status: "success",
    data: {
      allBookings,
    },
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  let updatedBooking = await Booking.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { runValidators: true, new: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      updatedBooking,
    },
  });
});

exports.deleteSingleBooking = catchAsync(async (req, res, next) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    message: "deleted successfully",
  });
});

exports.getSingleBooking = catchAsync(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new AppError("No booking with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});
