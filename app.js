require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require("fs");
var indexRouter = require('./routes/index');
var playerRouter = require('./routes/player');
var bodyParser = require('body-parser')

var app = express();
const sharp = require('sharp')

app.use( bodyParser.json() );       // to support JSON-encoded bodies


const source_dir = path.join(__dirname, process.env.FOLDER);
const dest_dir = path.join(__dirname, process.env.FOLDER + 'thumbs/');
const resolution = parseInt(process.env.RES, 10)
fs.readdir(source_dir, (err, files) => {
  files.forEach(file => {
    sharp(source_dir + file)
      .resize(resolution)
      .toFile(dest_dir + "thumb_" + file)
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, process.env.FOLDER)));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.win32.dirname("C://wat//qualityd")));
app.use('/', indexRouter);
app.use('/player*', playerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
