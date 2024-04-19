const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const registerValidation = require("../middleware/registerValidation");
const updateValidation = require("../middleware/updateValidation");

router.route("/").get(usersController.getUsers);
router.route("/").post(registerValidation, usersController.createUser);
router.route("/:id").patch(updateValidation, usersController.updateUser);
router.route("/:id").delete(usersController.deleteUser);

module.exports = router;
