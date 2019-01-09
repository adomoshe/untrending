'use strict';
// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport.js');
// const passport = require('../config/passport');

module.exports = app => {
  // Using the passport.authenticate middleware with our Google strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
//   app.post('/api/login', passport.authenticate('google'), (req, res) => {
//     // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
//     // So we're sending the user back the route to the members page because the redirect will happen on the front end
//     // They won't get this or even be able to access this page if they aren't authed
//     res.json('/users');
//   });

//   // Route for logging user out
//   app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
//   });

//   // Route for getting some data about our user to be used client side
  app.get('/api/homepage', (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      res.json({
        displayName: req.user.displayName || req.displayName,
        id: req.user.id || req.id,
        givenName: req.user.givenName || req.givenName,
        familyName: req.user.familyName || req.familyName,
        emails: req.user.emails || req.emails,
        photos: req.user.photos || req.photos
      });
    }
  });

  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /auth/google/callback

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/plus.login']
    })
  );

//   GET /auth/google/callback
//     Use passport.authenticate() as route middleware to authenticate the
//     request.  If authentication fails, the user will be redirected back to the
//     login page.  Otherwise, the primary route function function will be called,
//     which, in this example, will redirect the user to the home page.
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/homepage');
      console.log(res.displayName);
      console.log(req.user.displayName || req.displayName);
      console.log(req.user.id || req.id);
      console.log(req.user.familyName || req.familyName);
      console.log(eq.user.emails || req.emails);
      console.log(req.user.photos || req.photos);
    }
  );
};
