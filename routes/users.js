const express = require("express");

const router = express.Router();

const userController = require("../controllers/user_controller");

router.get("/profile", userController.userProfile);
router.get("/login", userController.login);
router.post("/login", userController.createSession);
router.post("/create", userController.create);
// router.post("/", userController.userPost);
module.exports = router;
