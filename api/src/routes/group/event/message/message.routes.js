const { Router } = require("express");
const messageControllers = require("./message.controllers");
const { authMiddleware } = require("../../../../middlewares/auth.middlewares");
const { groupMemberMiddleware } = require("../../../../middlewares/group.middlewares");
const { canEditMessage, canDeleteMessage } = require("../../../../middlewares/message.middlewares");
const { verifyEventFromGroup } = require("../../../../middlewares/event.middlewares");

// omer: mergeParams is to be able to have access to req.params.event_id and req.params.group_id
const messageRouter = Router({ mergeParams: true });

messageRouter.use(authMiddleware(), groupMemberMiddleware(), verifyEventFromGroup());

// Message Routes
messageRouter.get("/", messageControllers.getMessage);
messageRouter.post("/", messageControllers.postMessage);
messageRouter.patch("/:message_id", canEditMessage, messageControllers.editMessage);
messageRouter.delete("/:message_id", canDeleteMessage, messageControllers.deleteMessage);

module.exports = messageRouter;
