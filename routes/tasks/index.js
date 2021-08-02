module.exports = function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify([
      { name: "Test 1", owner: "Ashley" },
      { name: "Test 2", owner: "Ashley" },
    ])
  );
};
