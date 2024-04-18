const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const registerValidation = require("../middleware/registerValidation");
const loginValidation = require("../middleware/loginValidation");

router
  .route("/register")
  .post(registerValidation, usersController.userRegistration);
router.route("/login").post(loginValidation, usersController.userLogin);

module.exports = router;
