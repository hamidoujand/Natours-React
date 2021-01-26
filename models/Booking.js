let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let bookingSchema = new Schema({
  tour: {
    type: Schema.Types.ObjectId,
    ref: "Tour",
    required: [true, "booking must belong to a tour"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "booking must belong to a user"],
  },
  price: {
    type: Number,
    required: [true, "booking must have a price"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  }).populate({
    path: "tour",
    select: "name",
  });
  next();
});
let Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
