const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');


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
        saveUninitialized: true
    })
);

app.use('/admin', adminController);
app.use('/student', studentController);
app.use('/contest', contestController);

module.exports = app;