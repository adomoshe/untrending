const router = require('express').Router();
const db = require('../models');
const passport = require('../config/passport');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google'),
  async (req, res) => {
    const user = await db.User.findOne({
      where: { googleId: req.session.passport.user }
    });
    const categories = await db.Categories.findOne({
      where: { UserId: user.dataValues.id }
    });
    if (categories) {
      res.redirect('/');
    } else {
      res.redirect('/signup');
    }
  }
);

module.exports = router;
