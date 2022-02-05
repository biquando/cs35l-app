const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  group_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  start_date: {
    type: Date,
    required: false,
  },
  end_date: {
    type: Date,
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports.eventSchema = eventSchema;
module.exports.Event = Event;
