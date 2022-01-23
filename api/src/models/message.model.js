const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    event_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports.messageSchema = messageSchema;
module.exports.Message = Message;
