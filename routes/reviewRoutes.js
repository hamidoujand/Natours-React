let router = require("express").Router({ mergeParams: true });
let authController = require("../controllers/authController");
let reviewController = require("../controllers/reviewController");

router.use(authController.protectRoutes);

router
  .route("/:reviewId")
  .delete(
    authController.protectRoutes,
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview
  )
  .patch(
    authController.protectRoutes,
    authController.restrictTo("user", "admin"),
    reviewController.updateReview
  );
router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protectRoutes,
    authController.restrictTo("user", "admin"),
    reviewController.createReview
  );

module.exports = router;
