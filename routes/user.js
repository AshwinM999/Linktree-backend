const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getProfile,
  updateProfile,
  addLink,
  updateLink,
  deleteLink,
  resetProfile,
} = require("../controllers/userController");

router.get("/me", auth, getProfile);
router.put("/me", auth, updateProfile);
router.post("/me/links", auth, addLink);
router.put("/me/links/:id", auth, updateLink);
router.delete("/me/links/:id", auth, deleteLink);
router.put("/me/reset", auth, resetProfile);

module.exports = router;
