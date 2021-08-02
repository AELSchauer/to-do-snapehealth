const express = require('express');
const tasksRouter = require('./routes/tasks/request-handler');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/tasks', tasksRouter);

module.exports = app;
