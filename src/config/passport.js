const passport = require('passport');
const mongoose = require('mongoose');
const uuid = require('uuid');
require('dotenv').config();

const Admin = require('../models/admin.model');

var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",  
    passReqToCallback: true,
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const admin = {
        name: {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName
        },
        emailId:profile.email,
        password: 'dummy'
    }

    try {
        let admn = await Admin.findOne({emailId: admin.emailId});
        if(admn) {
            return done(null, admn);
        } else {
            admn = await Admin.create(admin);
            return done(null, admn);
        }
    } catch(err) {
        console.log(err);
    }

  }
));

module.exports  = passport;