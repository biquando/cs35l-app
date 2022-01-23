const expressLoader = require("./express.loader");
const mongooseLoader = require("./mongoose.loader");
const routesLoader = require("./routes.loader");

async function configureApp(app) {
  await expressLoader(app);
  await routesLoader(app);
  await mongooseLoader();
}

module.exports = configureApp;
