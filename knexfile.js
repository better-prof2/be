// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: "./data/better_prof.db3"
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations"
    },
    useNullAsDefault: true
  },


};
