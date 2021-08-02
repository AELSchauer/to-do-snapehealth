const express = require("express");
const router = express.Router();
const indexEndpoint = require('./index')

/* GET users listing. */
router.get("/", function (req, res, next) {
  return indexEndpoint(req, res, next);
});

module.exports = router;
