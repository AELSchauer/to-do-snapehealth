require("dotenv").config();
const { Client } = require("pg");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

global.client = new Client(
  Object.assign(
    {
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
    },
    process.env.NODE_ENV !== "development" && {
      ssl: { rejectUnauthorized: false },
    }
  )
);

client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

const burndownEndpoint = require("./routes/burndown");
const loginEndpoint = require("./routes/login");
const tasksRouter = require("./routes/tasks/request-handler");
const totalsEndpoint = require("./routes/totals");
const { authenticationWithError } = require("./middleware/authentication");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", loginEndpoint);
app.use("/tasks", authenticationWithError, tasksRouter);
// app.use("/burndown", burndownEndpoint);
app.use("/totals", totalsEndpoint);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
