const expressLoader = require("./express.loader");
const routesLoader = require("./routes.loader");

async function configureApp(app) {
  await expressLoader(app);
  await routesLoader(app);
}

module.exports = configureApp;
