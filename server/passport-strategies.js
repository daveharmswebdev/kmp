'use strict'

const passport = require('passport')
const { Strategy } = require('passport-local')
const { compare } = require('bcrypt')

const User = require('../model/user')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>  {
	new User({id: id}).fetch().then(done)
})

passport.use(new Strategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function(email, password, done) {
		new User({email: email}).fetch()
			.then(function(err, user) {
				if (err) return done(err)
				if(!user) {
					return done(null, false, {message: 'Incorrest username.'})
				}
				compare(password, user.password, function(err, matches) {
					if (err) return done(err)
					if (!matches) {
						return done(null, false, {message: "Incorrect password"})
					} else {
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