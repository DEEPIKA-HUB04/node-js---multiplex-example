var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var multiplexRouter = require('./routes/multiplex')
var showRouter = require('./routes/shows')
var flimRouter = require('./routes/flims')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/multiplex',multiplexRouter)
app.use('/shows',showRouter)
app.use('/flims',flimRouter)

module.exports = app;
