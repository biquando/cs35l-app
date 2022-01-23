require("dotenv").config();

const config = {
  PORT: 8080,
  MONGODB_URI:
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_LOCAL_URI
      : process.env.MONGODB_ATLAS_URI,
  SALT_ROUNDS: +process.env.SALT_ROUNDS,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

module.exports = config;
