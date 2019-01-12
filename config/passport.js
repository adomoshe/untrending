'use strict';

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

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

let callbackURL = ''
if (process.env.TERM_PROGRAM === 'vscode') {
callbackURL = 'http://localhost:5000/auth/google/callback';
} else {
callbackURL = 'https://untrending.herokuapp.com/auth/google/callback'
}


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
    }
  )
);

module.exports = passport;
