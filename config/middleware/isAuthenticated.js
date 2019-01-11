'use strict';
// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function isAuthenticated(req, res, next) {
  if (req.user !== undefined) {
    console.log('in isAuthenticated', req.session.passport.user)
    next();
  } else {
    console.log('in isAuthenticated redirecting')
    res.redirect('/');
  }
};
