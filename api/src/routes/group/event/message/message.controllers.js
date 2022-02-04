const { Message } = require("../../../../models/message.model");
const { User } = require("../../../../models/user.model");

module.exports.getMessage = async function (req, res) {
  try {
    const { event_id } = req.params;
    const messages = await Message.find({ event_id })
                                  .sort({ createdAt: "ascending" });
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
    const { text } = req.body;
    if (!text || text == "")
      throw new Error("The request body must have a non-empty 'text' property.");

    const user = await User.findById(req.payload.user_id);

    const newMessage = await Message.create({
      event_id: req.params.event_id,
      user_id: req.payload.user_id,
      username: user.username,      
      text,
    });

    res.json({
      data: newMessage,
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
}

module.exports.editMessage = async function (req, res) {
  try {
    const newText = req.body.new_text;
    if (!newText || newText == "")
      throw new Error("The request body must have a non-empty 'new_text' property.");

    const modifiedMessage = await Message.findByIdAndUpdate(req.params.message_id, {
      text: newText,
    }, { new: true });
    res.json({
      data: modifiedMessage,
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
}

module.exports.deleteMessage = async function (req, res) {
  try {
    const oldMessage = await Message.findByIdAndDelete(req.params.message_id);
    res.json({
      data: oldMessage,
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
      details: JSON.stringify(error),
    });
  }
}
