const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session')

const app = express();

// define global vars
global.__path = require('./app/path');
global.__conf = require(`${__path.config}/conf`);
global.__helper = require(`${__path.helper}/helper`);

// auth
require(`${__path.libs}/passport-setup`);

// database
//require(`${__path.libs}/database`);

// view engine setup
app.set('views', __path.views);
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', `${__path.views_index}/main`);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
    name: 'google-login',
    keys: ['key1', 'key2'],
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

// routes
const isLogged = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/google')
    }
}

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['https://www.googleapis.com/auth/plus.login',
                , 'https://www.googleapis.com/auth/plus.profile.emails.read']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/google/failure'
    }));

app.get('/auth/google/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.get('/auth/google/failure', (req, res) => {
    res.send('login failed');
})

app.use(__conf.prefix.index, require(`${__path.routes}/index/navigator`));

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
    res.render('error');
});

module.exports = app;
