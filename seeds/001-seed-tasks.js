const moment = require("moment");
const { loremIpsum } = require("lorem-ipsum");

exports.seed = async function (knex) {
  const tasks = [];
  for (let user_id = 1; user_id < 5; user_id++) {
    for (let i = 0; i < 5; i++) {
      tasks.push({
        title: loremIpsum({
          count: 5,
          format: "plain",
          units: "words",
        }),
        user_id,
        created_at: moment()
          .subtract(Math.floor(Math.random() * 30), "days")
          .subtract(Math.floor(Math.random() * 1440), "minutes")
          .format(),
      });
    }
    for (let i = 0; i < 10; i++) {
      const created_at = moment()
        .subtract(Math.floor(Math.random() * 30), "days")
        .subtract(Math.floor(Math.random() * 1440), "minutes");
      const completed_at = moment(created_at)
        .add(Math.floor(Math.random() * 7), "days")
        .add(Math.floor(Math.random() * 1440), "minutes");
      
      tasks.push({
        title: loremIpsum({
          count: 5,
          format: "plain",
          units: "words",
        }),
        user_id,
        created_at: created_at.format(),
        completed_at: completed_at.format(),
      });
    }
  }

  await knex("tasks").delete();
  await knex("tasks").insert(tasks);
  return;
};
