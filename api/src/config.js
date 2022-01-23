require("dotenv").config();

const config = {
  PORT: 8080,
  MONGODB_URI: process.env.MONGODB_URI,
};

module.exports = config;
