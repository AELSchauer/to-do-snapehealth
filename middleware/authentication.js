const jwt = require("jsonwebtoken");
const regex = /^Bearer (?<token>[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*)$/;

const authenticationWithError = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const { groups: { token } = {} } = regex.exec(authHeader) || {};

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN, (err, { id }) => {
    if (err) return res.sendStatus(403);

    req.user_id = id;

    next();
  });
};

module.exports = { authenticationWithError };
