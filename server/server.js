'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const User = require('../model/user')
const Patient = require('../model/patient')


const { hash } = require('bcrypt')

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:false}))


app.get('/api/users', (req, res) => {
	new User().fetchAll()
		.then( users => {
			res.send(users)
		})
		.catch(console.error)
})

app.get('/api/users/:id', (req, res) => {
	new User({id: req.params.id})
		.fetch()
		.then( user => res.send(user))
		.catch(console.error)
})

app.post('/api/users', ({body}, res) => {
	if (body.password === body.confirmation) {
		knex('User')
			.select()
			.where('email', body.email)
			.then(user => {
				if (user.length) {
					res.send(user)
				} else {
					hash(body.password, 15, (err, hash) => {
						if (err) {
							console.log(err)
						} else {
							const user = {
								email: body.email,
								password: hash
							}
							knex('User')
								.insert(user)
								.then( data => {
									console.log('data', data)
									res.send(data)
								})
								.catch(console.error)
						}
					})
				}
			}) 
	} else {
		res.send('password and confirmation did not match, you did not register')
	}






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

