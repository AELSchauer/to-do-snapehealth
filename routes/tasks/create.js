module.exports = function (req, res, next) {
  const {
    body: { title, is_complete = false },
    user_id,
  } = req;

  const columns = [
    "title",
    "user_id",
    "created_at",
    is_complete && "completed_at",
  ]
    .filter((col) => !!col)
    .join(", ");

  const values = [
    title,
    user_id,
    new Date().toISOString(),
    is_complete && new Date().toISOString(),
  ]
    .filter((val) => !!val)
    .map((val) => `'${val}'`)
    .join(", ");

  client
    .query(
      `INSERT INTO
        tasks (${columns})
      VALUES
        (${values})
      RETURNING *,
        CASE
          WHEN completed_at is not null THEN true
          ELSE false
        END as is_complete;`
    )
    .then(({ rows: [{ id, ...record }] = [] } = {}) => {
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify({ id: parseInt(id), ...record }));
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
};
