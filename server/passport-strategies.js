'use strict'

const passport = require('passport')
const { Strategy } = require('passport-local')
const { compare } = require('bcrypt')

// const User = require('../model/user')
const config = require('../knexfile').development
const knex = require('knex')(config)

passport.serializeUser(function(user, done) {
	console.log('email in serializer', user.id)
	return done(null, user.id)
})
passport.deserializeUser((id, done) =>  {
	console.log('deserializing********************', id)
	knex('user').where({id: id}).select().then( user => {
		[user] = user
		console.log('user', user)
		if (!user) return done(null, false)
		return done(null, user)
	})
})
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

passport.use(new Strategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done) {
		knex('user').where({email: email})
			.then(function(user, err) {
				user = user[0]
				console.log('user in passport strategies', user)
				if (err) return done(err)
				if(!user) {
					console.log('no user')
					return done(null, false, {message: 'Incorrest username.'})
				}
				compare(password, user.password, function(err, matches) {
					console.log('we are comparing')
					if (err) return done(err)
					if (!matches) {
						console.log('no matches')
						return done(null, false, {message: "Incorrect password"})
					} else {
						console.log('there is a match', user)
						return done(null, user)
					}
				})
			})
	}
));


  // function(email, password, done) {
  //   User.findOne({ user: user }, function(err, user) {
  //     if (err) return done(err)
  //     if (!user) {
  //       return done(null, false, { message: 'Incorrect username.' });
  //     }
  //     compare(pass, user.pass, function(err, matches) {
  //     	if (err) {
  //     		return done(err)
  //     	}
		// 		if (!matches) {
  //         return done(null, false, { message: 'Incorrect password'})
  //       } else {
  //         return done(null, user);
  //       }
  //     })
  //   });
  // }