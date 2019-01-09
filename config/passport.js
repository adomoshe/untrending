'use strict';

const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: "396539955261-n1tkjcso5isshfmrg2jovcn9pqkvei26.apps.googleusercontent.com",
      clientSecret: "kUQM0DedqU5FwRNQ_zRPQ9xq",
      callbackURL: 'http://localhost:5000/homepage' || 'http://www.example.com/auth/google/callback',
      passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  )
);

module.exports = passport;
