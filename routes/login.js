const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const { email } = req.query;
  if (!email) res.status(400).send({ error: "Login credentials missing or invalid" });

  client
    .query(`SELECT id, name, email FROM users WHERE email = '${email}';`)
    .then(({ rows: [{id, ...record} = {}] = [] }) => {
      if (record.email === email) {
        res.setHeader("Content-Type", "application/json");
        res.send(
          JSON.stringify({
            id: parseInt(id),
            ...record,
            token: jwt.sign(record, process.env.SECRET_TOKEN),
          })
        );
      } else {
        res.status(404).end();
      }
    });
};
