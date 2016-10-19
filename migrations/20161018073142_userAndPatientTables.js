'use strict'

exports.up = (knex, Promise) => {

	return knex.schema
		.createTable('user', table => {
			table.increments('id')
			table.string('email').unique()
			table.string('password')
			table.string('firstName')
			table.string('lastName')
			table.string('middleInitial')
			table.integer('security_level')
		})
		.createTable('patient', table => {
			table.increments('id')
			table.string('firstName')
			table.string('lastName')
			table.string('middleInitial')
			table.integer('assigned_rn')
				.references('user.id')
		})
}

exports.down = (knex, Promise) => {
	return knex
		.schema
		.dropTable('patient')
		.dropTable('user')
}
