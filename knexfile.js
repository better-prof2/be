// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations"
    },
    useNullAsDefault: true
  },


};
