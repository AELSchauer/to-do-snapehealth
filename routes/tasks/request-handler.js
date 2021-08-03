const express = require("express");
const router = express.Router();

const indexEndpoint = require("./index");
const createEndpoint = require("./create");
const showEndpoint = require("./show");
const updateEndpoint = require("./update");
const destroyEndpoint = require("./destroy");

router.get("/", function (req, res, next) {
  return indexEndpoint(req, res, next);
});

router.post("/", function (req, res, next) {
  return createEndpoint(req, res, next);
});

router.get("/:id", function (req, res, next) {
  return showEndpoint(req, res, next);
});

router.put("/:id", function (req, res, next) {
  return updateEndpoint(req, res, next);
});

router.delete("/:id", function (req, res, next) {
  return destroyEndpoint(req, res, next);
});

module.exports = router;
