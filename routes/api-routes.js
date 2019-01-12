'use strict';
// Requiring our models and passport as we've configured it
const db = require('../models');
const passport = require('../config/passport.js');

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

  app.put('/api/profile', (req, res) => {
    if (req.session.passport && req.user) {
      console.log(req.body);
      db.Categories.update(
        {
          business: req.body.business,
          entertainment: req.body.business,
          health: req.body.health,
          science: req.body.science,
          sports: req.body.sports,
          technology: req.body.technology
        },
        {
          where: {
            UserId: req.user.dataValues.id
          }
        }
      ).then(categories => {
        console.log(categories);
        res.json('Updated');
      });
    } else {
      console.log('User is not logged in');
      res.json(null);
    }
  });

  app.delete('/api/delete-account', (req, res) => {
    db.Categories.destroy({
      where: {
        UserId: req.user.dataValues.id
      }
    }).then(deletedCategories => {
      db.User.destroy({
        where: {
          id: req.user.dataValues.id
        }
      }).then(deletedUser => {
        if (deletedUser === 1 && deletedCategories === 1) {
          res.json(`Deleted User`);
        }
      });
    });
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user', (req, res) => {
    if (req.session.passport && req.user) {
      db.Categories.findOne({ where: { UserId: req.user.dataValues.id } }).then(
        categories => {
          res.json({
            user: req.user.dataValues,
            categories: categories
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

  app.get('*', (req, res) => {
    res.redirect('/');
  });
};
