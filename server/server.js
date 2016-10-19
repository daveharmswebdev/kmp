'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('../routes/index')

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:false}))

app.use(routes)

app.listen(PORT, () => {
	console.log('now listening on port', PORT)
})

