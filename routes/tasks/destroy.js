module.exports = function (req, res, next) {
  const { id } = req.params;
  client
    .query(
      `UPDATE
        tasks
      SET
        archived_at = '${new Date().toISOString()}'
      WHERE
        user_id = '${req.user_id}'
        AND id = ${id};`
    )
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(400).send(JSON.stringify({ error: err.message }));
    });
};
