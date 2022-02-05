const { Router } = require("express");
const { authMiddleware } = require("../../../middlewares/auth.middlewares");
const { verifyEventFromGroup } = require("../../../middlewares/event.middlewares");
const eventControllers = require("./event.controllers");
const messageRouter = require("./message/message.routes");

// omer: Merge params set to true to be able to access req.params.group_id
const eventRouter = Router({ mergeParams: true });

eventRouter.use(authMiddleware());

// Event Routes

eventRouter.post("/", eventControllers.createEvent);
eventRouter.get("/", eventControllers.getEvents);
eventRouter.get("/:event_id", verifyEventFromGroup(), eventControllers.getEvent);
eventRouter.patch("/:event_id", verifyEventFromGroup(), eventControllers.updateEvent);
eventRouter.delete("/:event_id", verifyEventFromGroup(), eventControllers.deleteEvent);

// Message Routes
eventRouter.use("/:event_id/message", verifyEventFromGroup(), messageRouter);

module.exports = eventRouter;
