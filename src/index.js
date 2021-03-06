const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config();

const adminController = require('./controllers/admin.controller');
const studentController = require('./controllers/student.controller');
const contestController = require('./controllers/contest.controller');
const authController = require('./controllers/auth.controller');

app.use(cors({ origin: `${process.env.FRONTEND_URL}`, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'secretcode',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    return res.status(200).send('Hello');
})
app.use('/admin', adminController);
app.use('/student', studentController);
app.use('/contest', contestController);
app.use('/auth', authController);

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})

app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND_URL}`);
    }
);

app.get('/getAdmin', (req, res) => {
    return res.send(req.user);
});

app.get('/auth/logout', (req, res) => {
    //console.log('Logout requested...');
    req.logout();
    return res.send('done');
})

module.exports = app;