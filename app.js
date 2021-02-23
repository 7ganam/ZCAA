
require('dotenv').config()
var _ = require('lodash');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');



const mongoose = require('mongoose');
const usersRouter = require('./routes/usersRouter');
const newsRouter = require('./routes/news_router');


var cors = require('cors')

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()) // use this before route handlers


// connect to mongodb--------------------------------------------------------
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, () => { console.log('connected to mongodb'); });




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
app.use('/api/news', newsRouter);




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
  // res.message(err.message || "oh no, something went wrong");
  console.log(err)
  res.send(err);
  // res.render('error');
});

module.exports = app;
