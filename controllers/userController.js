const User = require("../models/User");

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.updateProfile = async (req, res) => {
  const { username, bio, profileImage } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.username = username;
    user.bio = bio;
    user.profileImage = profileImage;
    await user.save();
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

exports.addLink = async (req, res) => {
  const { title, url } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.links.push({ title, url });
    await user.save();
    res.json(user.links);
  } catch {
    res.status(500).json({ error: "Failed to add link" });
  }
};

exports.updateLink = async (req, res) => {
  const { title, url } = req.body;
  try {
    const user = await User.findById(req.user.id);
    const link = user.links.id(req.params.id);
    if (!link) return res.status(404).json({ error: "Link not found" });

    link.title = title;
    link.url = url;
    await user.save();
    res.json(user.links);
  } catch {
    res.status(500).json({ error: "Failed to update link" });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.links = user.links.filter(link => link._id.toString() !== req.params.id);
    await user.save();
    res.json(user.links);
  } catch {
    res.status(500).json({ error: "Failed to delete link" });
  }
};


exports.resetProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username: '', bio: '', profileImage: '', links: [] },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to reset profile" });
  }
};