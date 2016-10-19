'use strict'

const { Router } = require('express')
const router = Router()

const User = require('../model/user')
const Patient = require('../model/patient')

const { hash } = require('bcrypt')

const login = require('./login')

router.use(login)

router.get('/', (req, res) => {
	res.send('you have logged in like a winner')
})

router.get('/api/users', (req, res) => {
	new User().fetchAll()
		.then( users => {
			res.send(users)
		})
		.catch(console.error)
})

router.get('/api/users/:id', (req, res) => {
	new User({id: req.params.id})
		.fetch()
		.then( user => res.send(user))
		.catch(console.error)
})

router.post('/api/users', ({body}, res) => {
	hash(body.password, 10, (err, hash) => {
		if (err) {
			console.log('err', err)
		} else {
			new User({ email: body.email, password: hash})
				.save()
				.then( user => res.send(user))
				.catch(console.error)
		}
	})
})

router.get('/api/patients', (req, res) => {
	new Patient().fetchAll()
		.then( patients => res.send(patients))
		.catch(console.error)
})

router.post('/api/patients', (req, res) => {
	new Patient(req.body)
		.save()
		.then( patient => res.send(patient))
		.catch(console.error)
})

module.exports = router