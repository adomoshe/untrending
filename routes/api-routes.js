'use strict';
// Requiring our models and passport as we've configured it
const passport = require('../config/passport.js');
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = app => {
  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user', (req, res) => {
    console.log('in app.get api/user');
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      res.json({
        User: req.user.dataValues
      });
    }
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/signup');
    }
  );
};
