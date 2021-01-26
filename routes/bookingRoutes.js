let router = require("express").Router();
let bookingController = require("../controllers/bookingController");
let authController = require("../controllers/authController");

router.get(
  "/checkout-session/:tourId",
  authController.protectRoutes,
  bookingController.getCheckoutSession
);

router.post("/create-booking", bookingController.createNewBooking);

router.get(
  "/my-booked-tours",
  authController.protectRoutes,
  bookingController.getUsersBookedTours
);
router.use(authController.restrictTo("admin", "lead-guide"));

router
  .route("/")
  .get(bookingController.getAllBookings)
  .post(bookingController.createNewBooking);

router
  .route("/:id")
  .get(bookingController.getSingleBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteSingleBooking);

module.exports = router;
