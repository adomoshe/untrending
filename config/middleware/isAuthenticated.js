'use strict';
// This is middleware for restricting routes a user is not allowed to visit if not logged in
<<<<<<< HEAD
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    console.log('in isAuthenticated', req.session.passport.user);
    next();
  } else {
    console.log('in isAuthenticated redirecting');
    res.redirect('/');
  }
};

module.exports = isAuthenticated;
=======
module.exports = (req, res, next) => {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }
  // If the user isn't logged in, redirect them to the login page
  return res.redirect('/');
};
>>>>>>> f6615666a2936e18e40b91622d75d03662460473
