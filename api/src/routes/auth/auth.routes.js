const { Router } = require("express");
const authControllers = require("./auth.controllers");

const authRouter = Router();

authRouter.post("/sign-up", authControllers.signUp);
authRouter.post("/login", authControllers.login);

module.exports = authRouter;
