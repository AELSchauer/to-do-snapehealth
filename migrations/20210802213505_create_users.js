exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.bigIncrements("id");
      table.string("name").notNullable();
      table.string("email").notNullable();

      table.unique("email");
      table.index("email", "index_users_on_email");

      table.timestamps();
    })
    // Hide this file since it has sensitive data
    //.then(() => knex.seed.run({ specific: "000-seed-users.js" }));
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
