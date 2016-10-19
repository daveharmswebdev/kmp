'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const routes = require('../routes/index')

const PORT = process.env.PORT || 3000

const app = express()

// middlewares
app.use(session({
	store: new RedisStore({
		url: process.env.REDIS_URL || 'redis://localhost:6379'
	}),
	secret: 'daveisnumberone'
}))

require('./passport-strategies')
app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.urlencoded({extended:false}))

app.use(routes)

app.listen(PORT, () => {
	console.log('now listening on port', PORT)
})

