const express = require("express");

async function expressLoader(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
}

module.exports = expressLoader;
