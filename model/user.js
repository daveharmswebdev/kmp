'use strict'

const bookshelf = require('../server/bookshelf')

module.exports = bookshelf.Model.extend({
  tableName: 'user',
  patients: () => this.hasMany(Patient)
})
