const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');


app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
    session({
        secret: 'secretcode',
        resave: true,
        saveUninitialized: true
    })
);

module.exports = app;