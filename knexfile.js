module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "todo-snapehealth_development",
      host: "localhost",
      password: null,
      port: 5432,
      user: "ashleyschauer",
    },
  },
  staging: {
    client: "pg",
    connection: {
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
      user: process.env.PGUSER,
      ssl: { rejectUnauthorized: false },
    },
  },
};
