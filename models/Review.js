let mongoose = require("mongoose");
let Tour = require("./Tour");
let Schema = mongoose.Schema;

let reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, "review is required"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  //we are going to use aggregate pipeline
  let stats = await this.aggregate([
    {
      $match: {
        tour: tourId,
      },
    },
    {
      $group: {
        _id: null,
        totalRatings: { $sum: 1 },
        ratingsAverage: { $avg: "$rating" },
      },
    },
  ]);
  //now we find and update
  stats = stats[0];
  let tour = await Tour.findByIdAndUpdate(
    tourId,
    {
      ratingsAverage: stats ? stats.ratingsAverage : 4.5,
      ratingsQuantity: stats ? stats.totalRatings : 0,
    },
    { runValidators: true }
  );
};

reviewSchema.index({ tour: -1, user: -1 }, { unique: true });

reviewSchema.post("save", async function () {
  //"this" refers to the current doc so we need its Model constructor and then we can call method
  await this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  //"this" refers to the Query that executing so if we await it it would result to the "Doc" because this 'pre'
  let doc = await this.findOne();
  //now we have access to the review BUT we need to 'calculateAverage' after the doc is deleted so we need to go to "post" hook
  //so we need to pass this doc to the next hook the only thing travels to the next hook is "This" so we attach to it this "DOC"
  // console.log(doc); //this is the Old DOC not the one deleted or updated
  //NOTE "we only need the _id and we do our fn call at "
  this.review = doc;
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.review.constructor.calcAverageRatings(this.review.tour);
});

module.exports = mongoose.model("Review", reviewSchema);
