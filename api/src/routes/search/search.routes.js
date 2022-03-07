const { Router } = require("express");
const { authMiddleware } = require("../../middlewares/auth.middlewares");
const searchControllers = require("./search.controllers");

const searchRouter = Router();

searchRouter.get("/", authMiddleware(), searchControllers.search);

module.exports = searchRouter;
