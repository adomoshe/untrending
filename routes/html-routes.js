'use strict';
// Requiring path to so we can use relative routes to our HTML files
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = app => {
  app.get('/', (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log(req.user)
      res.redirect('/users');
      console.log(
        'In html app.get "/" if statement redirecting to /users because user already has an account'
      );
    }
    res.sendFile(path.join(__dirname, '../public/login.html'));
    console.log('In html app.get "/" didn\'t go in if statement');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/homepage', (req, res) => {
      console.log('In html app.get /homepage');
    res.sendFile(path.join(__dirname, '../public/homepage.html'));
  });
};
