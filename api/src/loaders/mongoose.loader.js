const mongoose = require("mongoose");
const config = require("../config");

async function mongooseLoader() {
  await mongoose.connect(config.MONGODB_URI, {});
}

module.exports = mongooseLoader;
