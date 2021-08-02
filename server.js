const express = require('express');
const tasksRouter = require('./routes/tasks/request-handler');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/tasks', tasksRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
