const express = require("express");
const router = express.Router();
const { getPublicProfile } = require("../controllers/publicController");

router.get("/:username", getPublicProfile);

module.exports = router;
