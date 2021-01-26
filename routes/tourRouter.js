let router = require("express").Router();
let tourController = require("../controllers/tourController");
let authController = require("../controllers/authController");
let reviewRouter = require("./reviewRoutes");

router.use("/:tourId/reviews", reviewRouter);

router
  .route("/distances/:latlng/unit/:unit")
  .get(tourController.getTourDistances);

router
  .route("/tours-within/:distance/center/:latlng/unit/:unit")
  .get(tourController.getToursWithin);

router.get(
  "/top-5-cheap",
  tourController.aliasToTours,
  tourController.getAllTours
);

router.get("/tour-stats", tourController.getTourStats);

router.get(
  "/monthly-plan/:year",
  authController.protectRoutes,
  authController.restrictTo("admin", "lead-guide", "guide"),
  tourController.getMonthlyPlan
);

router
  .route("/")
  .post(
    authController.protectRoutes,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour
  )
  .get(tourController.getAllTours);

router
  .route("/:id")
  .get(tourController.getSingleTour)
  .delete(
    authController.protectRoutes,
    authController.restrictTo("admin"),
    tourController.deleteTour
  )
  .patch(
    authController.protectRoutes,
    authController.restrictTo("admin", "lead-guide"),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  );

module.exports = router;
