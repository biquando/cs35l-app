const { Router } = require("express");
const userControllers = require("./user.controllers");

const userRouter = Router();

userRouter.get("/:user_id", userControllers.getUser);

module.exports = userRouter;
