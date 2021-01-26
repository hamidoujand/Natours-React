let path = require("path");
let multer = require("multer");
let sharp = require("sharp");
let Tour = require("../models/Tour");
let ApiFeatures = require("../utils/ApiFeatures");
let AppError = require("../utils/AppError");
let catchAsync = require("../utils/catchAsync");

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

exports.uploadTourImages = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.resizeTourImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  //1) Cover image
  let imageCoverFilename = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(__dirname, `../public/img/tours/${imageCoverFilename}`));
  //because in update handler we are just passing the whole 'req.body' so we just need to attach it to this
  req.body.imageCover = imageCoverFilename;
  //2) Images
  //because they all in array we loop and do the sharp for each one
  req.body.images = [];
  let result = req.files.images.map(async (img, index) => {
    //assign 'async' here to be able use 'await' inside but in fact this await not works
    //you have to save it into a variable and await promise.all() it
    let imageName = `tour-${req.params.id}-${Date.now()}-${index + 1}.jpeg`;
    await sharp(img.buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(__dirname, `../public/img/tours/${imageName}`));
    //here we need to push all of these fileNames to 'req.body.images'
    req.body.images.push(imageName);
  });
  await Promise.all(result);
  next();
});

exports.getAllTours = catchAsync(async (req, res, next) => {
  let features = new ApiFeatures(Tour.find(), req.query)
    .filter()
    .fieldLimiting()
    .paginate()
    .sort();

  let tours = await features.mongooseQuery;
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.getSingleTour = catchAsync(async (req, res, next) => {
  let tour = await Tour.findOne({ _id: req.params.id }).populate("reviews");
  if (!tour) {
    let err = new AppError("There is no tour with this id", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  let tour = await Tour.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.updateTour = catchAsync(async (req, res, next) => {
  let tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) {
    return next(new AppError("There is no tour with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  let result = await Tour.findOneAndDelete({ _id: req.params.id });
  if (!result) {
    return next(new AppError("There is no tour with this id ", 404));
  }
  res.status(204).json({
    status: "success",
  });
});

exports.aliasToTours = (req, res, next) => {
  let query = {
    limit: "5",
    sort: "price,-ratingsAverage",
  };
  req.query = query;
  next();
};

exports.getTourStats = catchAsync(async (req, res, next) => {
  let stats = await Tour.aggregate([
    {
      $match: {
        ratingsAverage: {
          $gte: 4.5,
        },
      },
    },
    {
      $group: {
        _id: {
          difficulty: "$difficulty",
        },
        averageRating: { $avg: "$ratingsAverage" },
        averagePrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        totalTours: { $sum: 1 },
        totalRatings: { $sum: "$ratingsQuantity" },
      },
    },
    {
      $sort: {
        averagePrice: -1,
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  let year = req.params.year * 1;

  let monthlyPlan = await Tour.aggregate([
    {
      $unwind: "$startDates",
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        tours: { $sum: 1 },
        names: { $push: "$name" },
      },
    },
    {
      $addFields: { month: "$_id" },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        tours: -1,
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      monthlyPlan,
    },
  });
});

exports.getToursWithin = catchAsync(async (req, res, next) => {
  let { distance, latlng, unit } = req.params;
  let [lat, lng] = latlng.split(",");
  if (!lat || !lng) {
    return next(
      new AppError("please provide a center as format of lat,lng", 400)
    );
  }
  //must be a radian : distance / radiusOfEarth
  let radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  let tours = await Tour.find({
    startLocation: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius],
      },
    },
  });
  res.status(200).json({
    stats: "success",
    result: tours.length,
    data: {
      tours,
    },
  });
});

exports.getTourDistances = catchAsync(async (req, res, next) => {
  let { latlng, unit } = req.params;
  let [lat, lng] = latlng.split(",");
  if (!lat || !lng) {
    return next(
      new AppError("please provide a center as format of lat,lng", 400)
    );
  }
  let distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: "distanceToTour",
        spherical: true,
        distanceMultiplier: unit === "mi" ? 0.000621371 : 0.001,
      },
    },
    {
      $project: {
        name: 1,
        distanceToTour: { $trunc: ["$distanceToTour"] },
      },
    },
  ]);
  res.status(200).json({
    status: "success",
    data: {
      distances,
    },
  });
});
