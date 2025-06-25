const User = require("../models/User");

exports.getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const { username, bio, profileImage, links } = user;
    res.json({ username, bio, profileImage, links });
  } catch {
    res.status(500).json({ error: "Failed to load profile" });
  }
};
