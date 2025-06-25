const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  title: String,
  url: String,
}, { _id: true });

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  username: { type: String, unique: true, sparse: true },
  bio: String,
  profileImage: String,
  links: [linkSchema]
});

module.exports = mongoose.model("User", userSchema);
