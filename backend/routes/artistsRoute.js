const express = require("express");
const router = express.Router();
const artistsController = require("../controllers/artistsController");
const validation = require("../middleware/validation");
const { artistSchema } = require("../utils/validation");

router.route("/").get(artistsController.getArtists);
router
  .route("/")
  .post(validation(artistSchema), artistsController.createArtist);
router.route("/:id").patch(artistsController.updateArtist);
router.route("/:id").delete(artistsController.deleteArtist);

module.exports = router;
