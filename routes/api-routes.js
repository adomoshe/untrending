'use strict';
// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport.js');
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = app => {

    app.post('/api/categories', (req, res) => {
        console.log(req.body);
        if(req.session.passport) {
            console.log(req.user.dataValues);
            db.Categories.create({
                business: req.body.categories.business,
                entertainment: req.body.categories.business,
                health: req.body.categories.health,
                science: req.body.categories.science,
                sports: req.body.categories.sports,
                technology: req.body.categories.technology,
              }).then(function(dbTodo) {
                // We have access to the new todo as an argument inside of the callback function
                res.json(dbTodo);
              });
            });
        } else {
            console.log('Unauthorized access')
        }
        // console.log(res);
    })
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

   // Route for logging user out
   app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
