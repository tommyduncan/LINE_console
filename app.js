var express = require('express');
var session = require('express-session')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var member = require('./routes/member');
var messages = require('./routes/messages');
var upload = require('./routes/upload');

var app = express();

var passport = require('passport');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'LINE_Console',
  name: 'EXPRESS_SESSIONID',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mongoose connection
mongoose.connect('mongodb://tommyduncan:tommy801021@localhost:27017/LINE_Console', function (error) {
  // if error is truthy, the initial connection failed.
})

app.use('/', index);
app.use('/users', users);
app.use('/member', member);
app.use('/messages', messages);
app.use('/upload', upload);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
