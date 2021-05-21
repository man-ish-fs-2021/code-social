const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require("./environment");

passport.use(new GoogleStrategy({
    clientID:    env.google_clientID,
    clientSecret: env.google_clientSecret,
    callbackURL: env.google_callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){console.log("Can't find user",err); return;}
        // console.log(profile);
        if(user){
            // if found set the user as req.user
            return done(null,user);
        }else{
            // if not found, create and set the user as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log("Can't find user",err); return;}
                return done(null,user);
            });
        }
    });
  }
));

module.exports = passport;