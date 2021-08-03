module.exports = function (req, res, next) {
  client
    .query(
      `SELECT is_complete, COUNT(is_complete) FROM tasks GROUP BY is_complete ORDER BY COUNT(is_complete) DESC;`
    )
    .then(({ rows = [] }) => {
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          complete: rows.find(({ is_complete }) => !!is_complete).count,
          incomplete: rows.find(({ is_complete }) => !is_complete).count,
        })
      );
    });
};
