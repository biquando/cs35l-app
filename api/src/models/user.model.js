const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  group_ids: {
    type: [String],
    required: true,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports.userSchema = userSchema;
module.exports.User = User;
