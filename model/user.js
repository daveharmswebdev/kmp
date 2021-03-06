'use strict'

const bookshelf = require('../server/bookshelf')

const Patient = require('./patient')

module.exports = bookshelf.Model.extend({
  tableName: 'user',
  patients: () => this.hasMany(Patient)
})
