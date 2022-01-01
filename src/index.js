const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
//const passport = require('./config/passport');

const adminController = require('./controllers/admin.controller');
const studentController = require('./controllers/student.controller');
const contestController = require('./controllers/contest.controller');

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
    session({
        secret: 'secretcode',
        resave: true,
        saveUninitialized: false
    })
);

//app.use(passport.initialize());
//app.use(passport.session());

app.use('/admin', adminController);
app.use('/student', studentController);
app.use('/contest', contestController);

// passport.serializeUser(function(user, done) {
//     done(null, user);
// }) 

// passport.deserializeUser(function(user, done) {
//     done(null, user);
// })

module.exports = app;