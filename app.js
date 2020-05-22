const appRoot = require('app-root-path');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require(appRoot + '/lib/logger.js');
const accessLogger = logger.getLogger('access');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger.connectLogger(accessLogger, {
  level: 'auto',
  // nolog: [],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add 'require' function in ejs template code.
// add url
app.use(function (req, res, next) {
  var _render = res.render;
  res.render = async function (view, options, fn) {
    // extend config and continue with original render
    options = options || {};
    options.require = require;
    options.originalUrl = req.originalUrl;
    _render.call(this, view, options, fn);
  }
  next();
});

app.use('/', indexRouter);

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
