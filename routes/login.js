'use strict'

const { Router } = require('express')
const router = Router()
const passport = require('passport')

router.get('/login', (req,res) => {
	res.send('you are trying to log in')
})

router.post('/login', passport.authenticate('local', { successRedirect: '/',
																											 failureRedirect: '/login'}))

module.exports = router