
require('dotenv').config()
//adding my config files 

var createError = require('http-errors');
var express = require('express');
var path = require('path');
// const bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const passport = require('passport');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth_router');

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

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/MyDb", () => { console.log('connected to mongodb'); });

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


function print_user(req, res, next) {
  console.log(req.body);
  const { OAuth2Client } = require('google-auth-library');
  const client = new OAuth2Client("1050309843237-hjb6hmp0ku18p9oblkk5fshpvp7g0v87.apps.googleusercontent.com");
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.body.idtoken,
      audience: "1050309843237-hjb6hmp0ku18p9oblkk5fshpvp7g0v87.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(payload)
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify().catch(console.error);
  next();
}

app.use(print_user)

// set up the auth router
app.use('/auth', authRouter);



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
