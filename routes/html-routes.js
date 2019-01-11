'use strict';
// Requiring path to so we can use relative routes to our HTML files
const path = require('path');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = app => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/homepage.html'));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
  });
};

// console.log(req.body);
// console.log(req.session);

// console.log(req.session.passport.user);
// console.log(req.user.dataValues);
