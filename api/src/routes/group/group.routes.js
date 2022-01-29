const { Router } = require("express");
const eventRouter = require("./event/event.routes");
const groupControllers = require("./group.controllers");

const groupRouter = Router();

groupRouter.post("/", groupControllers.createGroup);
groupRouter.get("/", groupControllers.queryGroup);
groupRouter.get("/:group_id", groupControllers.getGroup);
groupRouter.delete("/:group_id", groupControllers.deleteGroup);

groupRouter.use("/:group_id/event", eventRouter);

module.exports = groupRouter;
