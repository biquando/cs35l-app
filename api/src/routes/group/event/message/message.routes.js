const { Router } = require("express");
const messageControllers = require("./message.controllers");

// omer: mergeParams is to be able to have access to req.params.event_id and req.params.group_id
const messageRouter = Router({ mergeParams: true });

// Message Routes

module.exports = messageRouter;
