const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const { email } = req.query;
  client
    .query(`SELECT id, name, email FROM users WHERE email = '${email}';`)
    .then(({ rows: [record = {}] = [] }) => {
      if (record.email === email) {
        res.setHeader("Content-Type", "application/json");
        res.send(
          JSON.stringify({
            ...record,
            token: jwt.sign(record, process.env.SECRET_TOKEN),
          })
        );
      } else {
        res.status(404).end();
      }
    });
};
