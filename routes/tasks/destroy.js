module.exports = function (req, res, next) {
  const { id } = req.params;
  client
    .query(`DELETE FROM tasks WHERE id = ${id};`)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(400).send(JSON.stringify({ error: err.message }));
    });
};
