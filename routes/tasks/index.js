module.exports = function (req, res, next) {
  client
    .query(
      `SELECT
        tasks.*,
        users.name as user_name,
        CASE
          WHEN completed_at is not null THEN true
          ELSE false
        END as is_complete
      FROM
        tasks
        INNER JOIN users ON tasks.user_id = users.id
      WHERE
        user_id = '${req.user_id}';`
    )
    .then(({ rows = [] }) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(rows));
    });
};
