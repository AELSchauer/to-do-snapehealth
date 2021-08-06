module.exports = function (req, res, next) {
  const { id } = req.params;
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
        user_id = '${req.user_id}' AND tasks.id = '${id}';`
    )
    .then(({ rows: [{ id, ...record }] = [] } = {}) => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify({ id: parseInt(id), ...record }));
    });
};
