const { Group } = require("../../models/group.model");
const { Event } = require("../../models/event.model");
const { Message } = require("../../models/message.model");
const { User } = require("../../models/user.model");

module.exports.search = async function (req, res) {
  try {
    const queryString = req.query.query;
    const { user_id } = req.payload;
    const regexOptions = "i";

    const user = await User.findById(user_id);
    const groupIds = user.group_ids;
    const userGroups = await Group.find({
      user_ids: {
        $in: user_id,
      },
    });
    let eventIds = [];
    for (const g of userGroups) {
      groupEvents = await Event.find({
        group_id: {
          $in: [g._id.toString()],
        },
      });
      eventIds = eventIds.concat(groupEvents.map((e) => e._id.toString()));
    }

    const groupSearch = {
      $or: [
        { name: { $regex: new RegExp(queryString), $options: regexOptions } },
        {
          description: {
            $regex: new RegExp(queryString),
            $options: regexOptions,
          },
        },
      ],
    };
    const eventSearch = {
      $or: [
        { name: { $regex: new RegExp(queryString), $options: regexOptions } },
        {
          description: {
            $regex: new RegExp(queryString),
            $options: regexOptions,
          },
        },
      ],
      group_id: {
        $in: groupIds,
      },
    };
    const messageSearch = {
      text: { $regex: new RegExp(queryString), $options: regexOptions },
      event_id: {
        $in: eventIds,
      },
    };

    const [groups, events, messages] = await Promise.all([
      Group.find(groupSearch),
      Event.find(eventSearch),
      Message.find(messageSearch),
    ]);

    let messageGroupMap = {};
    let groupNameMap = {};
    let eventNameMap = {};
    for (const m of messages) {
      const mEvent = await Event.findById(m.event_id);
      messageGroupMap[m._id] = mEvent.group_id;
      eventNameMap[m._id] = mEvent.name;
    }
    for (let e of events) {
      const eGroup = await Group.findById(e.group_id);
      groupNameMap[e._id] = eGroup.name;
    }

    res.json({
      data: {
        groups,
        events,
        messages,
        messageGroupMap,
        groupNameMap,
        eventNameMap,
      },
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
};
