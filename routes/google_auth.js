const router = require('express').Router();
const db = require('../models');
const passport = require('../config/passport.js');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
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
});

module.exports = router;
