const isAuthenticated = (req, res, next) => {
  if (req.user) {
    console.log('Authenticated', req.session.passport.user);
    next();
    return;
  }
  console.log('Not Authenticated... Redirecting');
  res.redirect('/');
};

module.exports = isAuthenticated;
