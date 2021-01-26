let router = require("express").Router();
let authController = require("../controllers/authController");
let userController = require("../controllers/userController");

router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.use(authController.protectRoutes);

router.delete(
  "/delete-me",
  authController.protectRoutes,
  userController.deleteMe
);

router.patch(
  "/update-me",
  authController.protectRoutes,
  userController.uploadUserPhotos,
  userController.resizeUserPhotos,
  userController.updateMe
);
router.patch(
  "/update-password",
  authController.protectRoutes,
  authController.updatePassword
);

router.get("/get-me", authController.protectRoutes, userController.getMe);
router.use(authController.restrictTo("admin"));
router.get("/", userController.getAllUsers);

module.exports = router;
