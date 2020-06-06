const express = require("express");
const passport = require("passport");

const router = express.Router();

const userController = require("../controllers/user_controller");

router.get("/profile", userController.userProfile);
router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);
router.get("/sign-in", userController.signIn);

router.post("/create", userController.createUser);

// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

module.exports = router;
