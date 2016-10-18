'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('User').insert({id: 1, email: 'a@a.com', password: '123', firstName: 'Dave', lastName: 'Harms', security_level: 4}),
        knex('User').insert({id: 2, email: 'b@b.com', password: '123', firstName: 'Bill', lastName: 'Williams', middleInitial: 'T', security_level: 3}),
        knex('User').insert({id: 3, email: 'c@c.com', password: '123', firstName: 'Lisa', lastName: 'George', middleInitial: 'A', security_level: 1})
      ]);
    });
};
