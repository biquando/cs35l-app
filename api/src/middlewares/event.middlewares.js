const { Event } = require("../models/event.model");

module.exports.verifyEventFromGroup = function (options = {}) {
  return async function (req, res, next) {
    try {
      const event = await Event.findById(req.params.event_id);
      if (!event)
        throw new Error("Event not found! Make sure the event_id is valid.")
      if (event.group_id != req.params.group_id)
        throw new Error("This event does not belong to this group! Check the ids in your route.");
      req.payload.event = event;
      next();
    } catch (error) {
      res.status(400).json({
        error: error.message,
        details: JSON.stringify(error),
      });
    }
  }
};
