module.exports = function (req, res, next) {
  const { id } = req.params;
  client
    .query(
      `SELECT tasks.*, users.name FROM tasks INNER JOIN users ON tasks.user_id = users.id WHERE user_id = '${req.user_id}' AND tasks.id = '${id}';`
    )
    .then(({ rows: [record = {}] = [] }) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(record));
    });
};
