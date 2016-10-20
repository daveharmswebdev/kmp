'use strict'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patient').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('patient').insert({id: 1, firstName: 'Larry', lastName: 'Brown', middleInitial: 'A', assigned_rn: 1}),
        knex('patient').insert({id: 2, firstName: 'Zach', lastName: 'Heightler', assigned_rn: 2}),
        knex('patient').insert({id: 3, firstName: 'Vera', lastName: 'Wang', middleInitial: 'K', assigned_rn: 2})
      ]);
    });
};
