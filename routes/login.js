const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const { email } = req.query;
  if (!email)
    res.status(400).send({ error: "Login credentials missing or invalid" });

  client
    .query(`SELECT id, name, email FROM users WHERE email = '${email}';`)
    .then(({ rows: [{ id, ...record } = {}] = [] }) => {
      if (record.email === email) {
        const user = {
          id: parseInt(id),
          ...record,
        };
        res.setHeader("Content-Type", "application/json");
        res.send(
          JSON.stringify({
            ...user,
            token: jwt.sign(user, process.env.SECRET_TOKEN),
          })
        );
      } else {
        res.status(404).end();
      }
    });
};
