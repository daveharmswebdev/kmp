'use strict'

exports.up = (knex, Promise) => {

	return Promise.all([

			knex.schema.createTable('User', table => {
				table.increments('id')
				table.string('email').unique()
				table.string('password')
				table.string('firstName')
				table.string('lastName')
				table.string('middleInitial')
				table.integer('security_level')
			}),

			knex.schema.createTable('Patient', table => {
				table.increments('id')
				table.string('firstName')
				table.string('lastName')
				table.string('middleInitial')
				table.integer('assigned_rn')
					.references('id')
					.inTable('user')
			})

		])

}

exports.down = (knex, Promise) => {

	return Promise.all([
			knex.schema.dropTable('User'),
			knex.schema.dropTable('Patient')
		])

}
