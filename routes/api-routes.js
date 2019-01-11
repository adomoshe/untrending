'use strict';
// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport.js');
const isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = app => {
  app.post('/api/categories', (req, res) => {
    console.log(req.body);
    if (req.session.passport) {
      console.log(req.user.dataValues);
      db.Categories.findOrCreate({
        where: {
          UserId: req.user.dataValues.id
        },
        defaults: {
          business: req.body.categories.business,
          entertainment: req.body.categories.business,
          health: req.body.categories.health,
          science: req.body.categories.science,
          sports: req.body.categories.sports,
          technology: req.body.categories.technology,
          UserId: req.user.dataValues.id
        }
      }).then(categories => {
        console.log(categories);
        if (categories[1] === 'true') {
          console.log('Created');
          res.json('Created');
        } else {
          console.log('Found');
        }
      });
    } else {
      console.log('Unauthorized access');
    }
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user', (req, res) => {
    console.log('in app.get api/user');
    if (req.session.passport && req.user) {
      console.log(req.session.passport);
      db.Categories.findOne({ where: { UserId: req.user.dataValues.id } }).then(
        categories => {
          res.json({
            User: req.user.dataValues,
            Categories: categories
          });
        }
      );
    } else {
      console.log('User is not logged in');
      res.json(null);
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
      db.User.findOne({ where: { googleId: req.session.passport.user } }).then(
        user => {
          db.Categories.findOne({ where: { UserId: user.dataValues.id } }).then(
            categories => {
              if (categories) {
                res.redirect('/');
              } else {
                console.log('auth routing', categories);
                res.redirect('/signup');
              }
            }
          );
        }
      );
    }
  );

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
