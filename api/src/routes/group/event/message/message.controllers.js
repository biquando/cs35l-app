const { Event } = require("../../../../models/event.model");
const { Message } = require("../../../../models/message.model");

module.exports.getMessage = async function (req, res) {
  try {
    const { event_id } = req.params;
    const messages = await Message.find({ event_id })
                                  .sort({ createdAt: "descending" });
    res.json({ data: messages });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
}

module.exports.postMessage = async function (req, res) {
  try {
    const { event } = req.payload;
    const { text } = req.body;

    if (!text || text == "")
      throw new Error("The request body must have a non-empty 'text' property.");

    const newMessage = await Message.create({
      event_id: req.params.event_id,
      user_id: req.payload.user_id,
      text,
    })

    res.json({
      data: newMessage,
    })

  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
}

module.exports.editMessage = async function (req, res) {
  try {
    throw new Error("WIP");
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
}

module.exports.deleteMessage = async function (req, res) {
  try {
    throw new Error("WIP");
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
}
