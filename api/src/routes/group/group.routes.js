const { Router } = require("express");
const eventRouter = require("./event/event.routes");
const groupControllers = require("./group.controllers");
const { authMiddleware } = require("../../middlewares/auth.middlewares");
const { groupMemberMiddleware, groupOwnerMiddleware } = require("../../middlewares/group.middlewares");

const groupRouter = Router();

groupRouter.post("/", authMiddleware(), groupControllers.createGroup);
groupRouter.get("/", groupControllers.queryGroup);
groupRouter.get("/:group_id", authMiddleware(), groupMemberMiddleware(), groupControllers.getGroup);
groupRouter.delete("/:group_id", authMiddleware(), groupOwnerMiddleware(), groupControllers.deleteGroup);
groupRouter.patch("/:group_id", authMiddleware(), groupOwnerMiddleware(), groupControllers.updateGroup);
groupRouter.post("/:group_id/join", authMiddleware(), groupControllers.joinGroup);
groupRouter.delete("/:group_id/leave", authMiddleware(), groupMemberMiddleware(), groupControllers.leaveGroup);

groupRouter.use("/:group_id/event", eventRouter);

module.exports = groupRouter;
