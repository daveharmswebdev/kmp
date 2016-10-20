'use strict'
// Update with your config settings.

module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   },
  //   useNullAsDefault: true,
  //   pool: {
  //     afterCreate: (db, cb) => db.run('PRAGMA foreign_keys = ON', cb)
  //   }
  // }

  development: {
    client: 'postgresql',
    connection: {
      host: '45.55.225.72',
      port: 5432,
      database: 'myapp',
      user:     'postgres',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
