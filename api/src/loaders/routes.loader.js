const apiRouter = require("../routes");

async function routesLoader(app) {
  app.use("/api", apiRouter);
}

module.exports = routesLoader;
