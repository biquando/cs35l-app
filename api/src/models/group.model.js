const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  user_ids: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
});

const Group = mongoose.model("Group", groupSchema);

module.exports.groupSchema = groupSchema;
module.exports.Group = Group;
