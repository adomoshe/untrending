'use strict';

require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const db = require('../models');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
      console.log(profile)
      db.User.findOrCreate({
        where: {
          username: profile.displayName
        },
        defaults: {
          username: profile.displayName
        }
      }).then(function(user, err){
        // console.log(user);
        // console.log(err)
        return done(err, user)
      })
    }
  )
);

module.exports = passport;
