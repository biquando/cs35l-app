const { Event } = require("../../../models/event.model");
const { Group } = require("../../../models/group.model");

module.exports.createEvent = async function (req, res) {
  try {
    const groupId = req.params.group_id;
    const eventObj = {
      ...req.body,
      group_id: groupId,
      // omer: json can only hold primitive representations of dates (numbers, strings)
      date: new Date(req.body.date),
    };
    const event = await Event.create(eventObj);
    res.json({
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.getEvent = async function (req, res) {
  try {
    const eventId = req.params.event_id;
    const event = await Event.findById(eventId);
    res.json({
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.getEvents = async function (req, res) {
  try {
    const queryString = decodeURIComponent(req.query.query || "{}");
    const groupId = req.params.group_id;
    const queryObj = JSON.parse(queryString);
    const events = await Event.find({ ...queryObj, group_id: groupId });
    res.json({
      data: events,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};

module.exports.updateEvent = async function (req, res) {
  try {
    const groupId = req.params.group_id;
    const eventId = req.params.event_id;
    const updates = req.body;
    const senderId = req.payload.user_id;
    // omer: instead of fetching by id, validating user id, then updating
    const group = await Group.findById(groupId);

    if (group.owner_id.toString() !== senderId) {
      return res.status(403).json({
        error: "You aren't authorized to update this event",
      });
    }

    // new: true will have it return the event after the change
    const event = await Event.findByIdAndUpdate(eventId, updates, {
      new: true,
    });

    res.status(201).json({
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: error.toString(),
    });
  }
};

module.exports.deleteEvent = async function (req, res) {
  try {
    const groupId = req.params.group_id;
    const eventId = req.params.event_id;
    const senderId = req.payload.user_id;
    // omer: instead of fetching by id, validating user id, then updating
    const group = await Group.findById(groupId);

    if (group.owner_id.toString() !== senderId) {
      return res.status(403).json({
        error: "You aren't authorized to delete this event",
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    res.status(201).json({
      data: deletedEvent,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};
