const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const registerValidation = require("../middleware/registerValidation");
const loginValidation = require("../middleware/loginValidation");

router
  .route("/register")
  .post(registerValidation, adminController.userRegistration);
router.route("/login").post(loginValidation, adminController.userLogin);

module.exports = router;
