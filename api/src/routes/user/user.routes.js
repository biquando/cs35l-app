const { Router } = require("express");
const userControllers = require("./user.controllers");
const { authMiddleware } = require("../../middlewares/auth.middlewares");
const { userMiddleware } = require("../../middlewares/user.middlewares");

const userRouter = Router();

userRouter.get("/:user_id", userControllers.getUser);
userRouter.patch(
  "/:user_id",
  authMiddleware(),
  userMiddleware(),
  userControllers.updateUser
);

module.exports = userRouter;
