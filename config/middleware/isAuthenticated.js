'use strict';
// This is middleware for restricting routes a user is not allowed to visit if not logged in

const isAuthenticated = (req, res, next) => {
  if (req.user) {
    console.log('Authenticated', req.session.passport.user);
    next();
  } else {
    console.log('Not Authenticated... Redirecting');
    res.redirect('/');
  }
};

module.exports = isAuthenticated;
