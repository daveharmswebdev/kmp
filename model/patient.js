'use strict'

const bookshelf = require('../server/bookshelf')

const User = require('./user')

module.exports = bookshelf.Model.extend({
  tableName: 'patient',
  assigned_rn: () => this.belongsTo(User),
})