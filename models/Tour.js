let mongoose = require("mongoose");
const { default: slugify } = require("slugify");
let User = require("./User");
let Schema = mongoose.Schema;

let tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A tour name must be less or equal than 40 characters"],
      minlength: [10, "A tour name must be greater than 10 characters"],
    },
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "difficulty is either easy , medium , difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1"],
      max: [5, "Rating must be below 5"],
      set(value) {
        return Math.round(value * 10) / 10;
      },
    },
    ratingsQuantity: { type: Number, default: 0 },
    price: { type: Number, required: [true, "price is required"] },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          //"this" refers to the current document
          if (this.price < this.priceDiscount) {
            return false;
          }
          return true;
        },
        message: function (props) {
          return `Value ${props.value} is greater  than the price`;
        },
      },
    },
    summary: {
      type: String,
      required: [true, "A tour must have a summary"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must an image cover"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    startDates: [Date],
    slug: String,
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      description: String,
      address: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: "Point",
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ price: -1, ratingsAverage: -1 });

tourSchema.virtual("durationWeeks").get(function () {
  return Math.floor(this.duration / 7);
});

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.find({
    secretTour: { $ne: true },
  });
  this.wolfName = "Werewolf";
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  });
  next();
});

tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

let Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
