var express = require('express');
var router = express.Router();
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
var User = require('../schemas/userSchema');

passport.use(User.createStrategy());

/* GET users listing. */
router.post('/login', function (req, res) {
  User.authenticate()(req.body.username, req.body.password, function (err, user, options) {
    if (err)
      return next(err);

    if (!user)
      res.status(401).send(options.message);
    else
      res.send('Login success: \'' + user.username + '\'');
  });
});

router.post('/register', function (req, res) {
  console.log(req.body);
  User.register(new User({ username: req.body.username }), req.body.password, function (err) {
    if (err)
      res.json(err);
    else
      res.send('Register success !');
  });
});

module.exports = router;