var express = require('express');
var router = express.Router();
var authentication = require('../modules/authenticationModule');

/* GET home page. */
router.get('/', authentication, function (req, res, next) {
  res.render('LINE_Console', { title: 'LINE_Console' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'LINE_Console' });
});

router.get('/bind', function (req, res, next) {
  res.render('bind', { title: '' });
});

module.exports = router;
