const express = require("express");
const configureApp = require("./loaders");
const config = require("./config");

async function main() {
  const app = express();
  await configureApp(app);
  await app.listen(config.PORT, () =>
    console.log(`Server up and running on port ${config.PORT}`)
  );
}

main();
