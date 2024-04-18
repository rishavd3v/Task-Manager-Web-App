var express = require('express');
var router = express.Router();
const taskModel = require("./data");

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
  res.render('profile', {username: req.session.user.username, email:req.session.user.email});
});

router.get('/tasks', (req, res) => {
  let newTask = new taskModel({
    userId: req.session.user._id,
    title: req.query.title,
    description: req.query.description,
    date: req.query.date
  });
  newTask.save()
    .then(task => res.json(task))
    .catch(err => res.status(500).json({ error: err.message }));
});


module.exports = router;