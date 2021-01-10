
require('dotenv').config()
//adding my config files 
var _ = require('lodash');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const passport = require('passport');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth_router');
const usersRouter = require('./routes/usersRouter');


var cors = require('cors')

const passportSetup = require('./passport-setup'); // import and run my passport setup 
const cookieSession = require('cookie-session'); // don't know how does this one works .. but is used with the password lib


var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use(cors()) // use this before route handlers

console.log(process.env.MONGODB_URI)
// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, () => { console.log('connected to mongodb'); });

// cookieSession config set it to one day 
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
  keys: ['randomstringhere']
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.send('You must login!');
  }
}






// app.use('/auth', authRouter);
app.use('/auth', usersRouter);




if (process.env.NODE_ENV === "production") {
  console.log("in")
  app.use(express.static(path.join(__dirname, './frontend/build')));
  app.get('*', (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("fullUrl")
    console.log({ fullUrl })
    res.sendFile('./frontend/build/index.html', { root: __dirname });
    // res.sendFile(path.resolve(__dirname, 'front_end', 'build', 'index.html'))
  }
  )
}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.send(err);
  // res.render('error');
});

module.exports = app;
