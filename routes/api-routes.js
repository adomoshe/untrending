'use strict';
// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport.js');
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = app => {
  // Using the passport.authenticate middleware with our Google strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
    app.post('/api/login', passport.authenticate('google'), (req, res) => {
      // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
      // So we're sending the user back the route to the members page because the redirect will happen on the front end
      // They won't get this or even be able to access this page if they aren't authed
      res.json('/users');
    });

  //   // Route for logging user out
    app.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
    });

  //   // Route for getting some data about our user to be used client side
//   app.get('/api/homepage', (req, res) => {
//     console.log('in app.get api/homepage');
//     // if (!req.user) {
//     //   // The user is not logged in, send back an empty object
//     //   res.json({});
//     // } else {
//     res.json({
//       displayName: res.user.displayName || res.displayName,
//       id: res.user.id || res.id,
//       givenName: res.user.givenName || res.givenName,
//       familyName: res.user.familyName || res.familyName,
//       emails: res.user.emails || res.emails,
//       photos: res.user.photos || res.photos
//     });
//     console.log(res);
//     // }
//   });

  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      console.log('in app.get api /auth/google/homepage redirect to /homepage');
    //   req.session.user = req.user;
      
    //   console.log(res.displayName);
    //   console.log(res.user.displayName || res.displayName);
    //   console.log(res.user.id || res.id);
    //   console.log(res.user.familyName || res.familyName);
    //   console.log(res.user.emails || res.emails);
    //   console.log(res.user.photos || res.photos);
      res.redirect('/homepage');
    }
  );
};
