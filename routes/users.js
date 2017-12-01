var express = require('express');
var router = express.Router();
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
var User = require('../schemas/userSchema');
var lineLoginUtil = require('../utils/lineLoginUtil');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* 使用者登入 */
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

/* 使用者註冊 */
router.post('/register', function (req, res) {
  console.log(req.body);
  User.register(new User({ username: req.body.username }), req.body.password, function (err) {
    if (err)
      res.json(err);
    else
      res.send('Register success !');
  });
});

/* 使用者登出 */
router.post('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.json({ status: true })
});

/* Line login 的 authorization callback url */
router.get('/validate', (req, res) => {
  if (req.query.error)
    res.send(req.query.error_description);

  /* 用 LINE 傳回來的 code 來取得 access_token，進而再利用 access_token 取得使用者資訊 */
  lineLoginUtil.getAccessToken(req.query.code, (err, data) => {
    lineLoginUtil.getUserProfiles(data.access_token, (error, data) => {
      req.session.userProfiles = data;    // 將拿到的使用者資訊存入 session

      res.redirect('../bind');    // 導頁至使用者綁定頁面
    });
  });
});

module.exports = router;