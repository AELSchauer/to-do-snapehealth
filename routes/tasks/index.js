module.exports = function (req, res, next) {
  client
    .query(
      `SELECT tasks.*, users.name FROM tasks INNER JOIN users ON tasks.user_id = users.id WHERE user_id = '${req.user_id}';`
    )
    .then(({ rows = [] }) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    });
};
