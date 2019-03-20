const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./html');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
