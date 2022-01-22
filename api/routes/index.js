const { Router } = require("express");

const apiRouter = Router();
apiRouter.get("/", async function (req, res) {
  res.json({
    data: "Hi there! This is a placeholder endpoint to make sure everything is working.",
  });
});
module.exports = apiRouter;
