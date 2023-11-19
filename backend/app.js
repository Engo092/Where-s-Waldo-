const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

require('dotenv').config();

const indexRouter = require('./routes/index');

const app = express();

app.use(cors({
  origin : 'http://localhost:5173',
  credentials: true,
}));

// set-up MongoDB connection
const mongoose = require('mongoose');
const MongoDB = process.env.MONGO_URL;
mongoose.connect(MongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: "Some session Secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 1 day
  }
}));

app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const output = {
      error: {
        name: err.name,
        message: err.message,
        text: err.toString()
      }
  };
  const statusCode = err.status || 500;
  res.status(statusCode).json(output);
});


module.exports = app;