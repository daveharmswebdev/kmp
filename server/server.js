'use strict'

const express = require('express')
const app = express()
const config = require('../knexfile').development
const knex = require('knex')(config)
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:false}))

app.get('/api/users', (req, res) => {
	knex('User')
		.select()
		.then( data => res.send(data))
})

app.post('/api/users', (req, res) => {
	knex('User')
		.insert(req.body)
		.then( data => {
			console.log('data', data)
			res.send(data)
		})
		.catch(console.error)
})

app.get('/api/patients', (req, res) => {
	knex('Patient')
		.select()
		.then( data => res.send(data))
})

app.post('/api/patients', (req, res) => {
	knex('Patient')
		.insert(req.body)
		.then( data => res.send(data))
		.catch(console.error)
})

app.listen(PORT, () => {
	console.log('now listening on port', PORT)
})

