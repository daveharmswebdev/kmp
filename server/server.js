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
	new User({ email: body.email, password: body.password})
		.save()
		.then( user => res.send(user))
		.catch(console.error)
})

app.get('/api/patients', (req, res) => {
	new Patient().fetchAll()
		.then( patients => res.send(patients))
		.catch(console.error)
})

app.post('/api/patients', (req, res) => {
	new Patient(req.body)
		.save()
		.then( patient => res.send(patient))
		.catch(console.error)
})

app.listen(PORT, () => {
	console.log('now listening on port', PORT)
})

