const { Message } = require("../models/message.model");

module.exports.canEditMessage = function (options = {}) {
  return async function (req, res, next) {
    try {
      // Make sure to get the user_id from the token first (authMiddleware)
      const { user_id } = req.payload;
      const message = await Message.findById(req.params.message_id);
      if (message.user_id != user_id) {
        res.status(403).json({
          error: "This message can only be edited by the user who posted it.",
          details: JSON.stringify({
            message_id: req.params.message_id,
            user_id
          }),
        });
        return;
      }
      next();
    } catch (error) {
      res.status(400).json({
        error: error.message,
        details: JSON.stringify(error),
      });
    }
  }
};

module.exports.canDeleteMessage = function (options = {}) {
  return async function (req, res, next) {
    try {
      // Make sure to get the user_id from the token first (authMiddleware)
      const { user_id, group } = req.payload;
      const message = await Message.findById(req.params.message_id);
      if (message.user_id != user_id && group.owner_id != user_id) {
        res.status(403).json({
          error: "This message can only be deleted by the user who posted it or the group owner.",
          details: JSON.stringify({
            message_id: req.params.message_id,
            user_id
          }),
        });
        return;
      }
      next();
    } catch (error) {
      res.status(400).json({
        error: error.message,
        details: JSON.stringify(error),
      });
    }
  }
};
