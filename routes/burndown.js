module.exports = function (req, res, next) {
  Promise.all([
    client.query(
      `SELECT
        TO_CHAR(created_at, 'MM/DD/YYYY HH24:MI:SS') AS created_at
      FROM
        tasks
      ORDER BY
        created_at ASC;`
    ),
    client.query(
      `SELECT
        TO_CHAR(completed_at, 'MM/DD/YYYY HH24:MI:SS') AS completed_at
      FROM
        tasks
      WHERE
        completed_at is not null
      ORDER BY
        completed_at ASC;`
    ),
  ]).then(([{ rows: createdResults }, { rows: completedResults }]) => {
    const changeCount = {};
    createdResults.map(({ created_at }) => {
      if (!changeCount[created_at]) {
        changeCount[created_at] = 1;
      } else {
        changeCount[created_at] += 1;
      }
    });

    completedResults.map(({ completed_at }) => {
      if (completed_at) {
        if (!changeCount[completed_at]) {
          changeCount[completed_at] = -1;
        } else {
          changeCount[completed_at] -= 1;
        }
      }
    });

    const burndown = [];
    Object.entries(changeCount).reduce((count, [date, change]) => {
      count += change;
      burndown.push({ date, count });
      return count;
    }, 0);

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(burndown));
  });
};
