module.exports = function (req, res, next) {
  client
    .query(
      `SELECT
        CASE
          WHEN completed_at is not null THEN true
          ELSE false
        END as is_complete,
        COUNT(id)
      FROM
        tasks
      WHERE
        archived_at is null
      GROUP BY
        is_complete;`
    )
    .then(({ rows = [] }) => {
      res.setHeader("Content-Type", "application/json");
      res.send(
        JSON.stringify({
          complete: parseInt(rows.find(({ is_complete }) => !!is_complete).count),
          incomplete: parseInt(rows.find(({ is_complete }) => !is_complete).count),
        })
      );
    });
};
