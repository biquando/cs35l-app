const { Router } = require("express");
const authRouter = require("./auth/auth.routes");
const groupRouter = require("./group/group.routes");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/group", groupRouter);
apiRouter.all("/*", async function (req, res) {
  res.json({
    data: "Hi there! Right domain, but wrong path. Make sure the path is what you're looking for.",
  });
});

module.exports = apiRouter;
