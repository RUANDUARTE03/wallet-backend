module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "db-development",
      user:     "user",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/database/migrations"
    }
  }
};
