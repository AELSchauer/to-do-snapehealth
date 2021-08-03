const express = require("express");
const router = express.Router();
const indexEndpoint = require('./index')
const showEndpoint = require('./show')

router.get("/", function (req, res, next) {
  return indexEndpoint(req, res, next);
});

router.get("/:id", function (req, res, next) {
  return showEndpoint(req, res, next);
});

module.exports = router;
