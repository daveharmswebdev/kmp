'use strict'

const bookshelf = require('../server/bookshelf')

module.exports = bookshelf.Model.extend({
  tableName: 'patient',
  assigned_rn: () => this.belongsTo(User),
})