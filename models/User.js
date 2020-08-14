const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  id: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
