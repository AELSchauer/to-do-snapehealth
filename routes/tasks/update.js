module.exports = function (req, res, next) {
  const {
    body: { title, is_complete, user_id },
    params: { id },
  } = req;

  const set = [`updated_at = '${new Date().toISOString()}'`];
  title && set.push(`title = '${title}'`);
  user_id && set.push(`user_id = '${user_id}'`);
  is_complete &&
    set.push(`completed_at = '${new Date().toISOString()}'`);
  !is_complete && set.push(`completed_at = null`);

  client
    .query(
      `UPDATE
        tasks
      SET
        ${set.join(",")}
      WHERE
        id = ${id}
      RETURNING *,
        CASE
          WHEN completed_at is not null THEN true
          ELSE false
        END as is_complete;`
    )
    .then(({ rows: [record] = [] } = {}) => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(record));
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
};
