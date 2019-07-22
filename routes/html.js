const router = require('express').Router();
const path = require('path');
const isAuthenticated = require('../config/middleware/isAuthenticated');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

router.get('/signup', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.get('/profile', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/profile.html'));
});

module.exports = router;
