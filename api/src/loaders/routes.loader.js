const apiRouter = require("../routes");

async function routesLoader(app) {
  app.use(apiRouter);
}

module.exports = routesLoader;
