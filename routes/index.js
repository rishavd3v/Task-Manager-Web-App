var express = require('express');
var router = express.Router();

const { router: authRoutes, isLoggedIn } = require('./auth');
router.use(authRoutes);

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/dashboard',isLoggedIn,function(req, res, next) {
  res.render('task');
});

router.get('/loginPage',function(req, res, next) {
  res.render('login');
});

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.render('profile', {username: req.session.user.username});
});

module.exports = router;