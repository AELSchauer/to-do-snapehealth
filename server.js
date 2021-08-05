require("dotenv").config();
const { Client } = require("pg");
const express = require("express");
const swaggerUi = require("swagger-ui-express");

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

const swaggerDocument = require("./swagger.json");
const burndownEndpoint = require("./routes/burndown");
const loginEndpoint = require("./routes/login");
const tasksRouter = require("./routes/tasks/request-handler");
const completionTotalsEndpoint = require("./routes/completion-totals");
const { authenticationWithError } = require("./middleware/authentication");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", loginEndpoint);
app.use("/tasks", authenticationWithError, tasksRouter);
app.use("/burndown", burndownEndpoint);
app.use("/completion-totals", completionTotalsEndpoint);

app.use(
  "/",
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
