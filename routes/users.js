var express = require('express');
var router = express.Router();
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
var User = require('../schemas/userSchema');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post('/login', function (req, res) {
  User.authenticate()(req.body.username, req.body.password, function (err, user, options) {
    if (err)
      return next(err);

    if (!user)
      res.json({ status: false, message: options.message });
    else
      req.login(user, function (err) {
        res.json({ status: true, user: user });
      });
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

router.post('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.json({ status: true })
});

module.exports = router;