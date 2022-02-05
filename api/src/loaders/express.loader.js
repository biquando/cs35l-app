const express = require("express");
const cors = require("cors");

async function expressLoader(app) {
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
}

module.exports = expressLoader;
