'use strict';

<<<<<<< HEAD
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../models');

passport.serializeUser((user, done) => {
  done(null, user[0].dataValues.googleId);
});

passport.deserializeUser((id, done) => {
  db.User.findOne({ where: { googleId: id } }).then(user => {
    done(null, user);
  });
});
=======
require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const User = require('../models/user.js');
>>>>>>> f6615666a2936e18e40b91622d75d03662460473

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
<<<<<<< HEAD
let callbackURL = ''
if (process.env.TERM_PROGRAM === 'vscode') {
callbackURL = 'http://localhost:5000/auth/google/callback';
} else {
callbackURL = 'https://untrending.herokuapp.com/auth/google/callback'
}
=======
>>>>>>> f6615666a2936e18e40b91622d75d03662460473
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
<<<<<<< HEAD
      callbackURL: callbackURL,
      passReqToCallback: true
    },
    (request, accessToken, refreshToken, profile, done) => {
      console.log(profile);
      db.User.findOrCreate({
        where: {
          googleId: profile.id,
          username: profile.displayName,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName
        },
        defaults: {
          googleId: profile.id,
          username: profile.displayName,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName
        }
      })
        .then((user, err) => {
          console.log('then user', user);
          return done(null, user);
        })
        .catch(err => {
          console.log(err);
        });
=======
      callbackURL: 'http://localhost:5000/auth/google/callback',
      passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
>>>>>>> f6615666a2936e18e40b91622d75d03662460473
    }
  )
);

module.exports = passport;
