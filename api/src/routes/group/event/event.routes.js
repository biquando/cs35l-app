const { Router } = require("express");
const eventControllers = require("./event.controllers");
const messageRouter = require("./message/message.routes");

// omer: Merge params set to true to be able to access req.params.group_id
const eventRouter = Router({ mergeParams: true });

// Event Routes

// Message Routes
eventRouter.use("/:event_id/message", messageRouter);

module.exports = eventRouter;
