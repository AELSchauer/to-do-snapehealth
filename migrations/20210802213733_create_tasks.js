exports.up = function (knex) {
  return knex.schema
    .createTable("tasks", function (table) {
      table.bigIncrements("id");
      table.string("title").notNullable();

      table.unique("title");
      table.index("title", "index_tasks_on_title");

      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id");
      table.index("user_id", "index_tasks_on_user_id");

      table.timestamps();
      table.timestamp("completed_at");
      table.timestamp("archived_at");
    })
    .then(() => knex.seed.run({ specific: "001-seed-tasks.js" }));
};

exports.down = function (knex) {
  return knex.schema.dropTable("tasks");
};
