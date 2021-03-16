const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth' ).OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

passport.use(new GoogleStrategy({
    clientID:    "725720623961-d15qgr5t9mo3br6b2r8hn30370d1o7on.apps.googleusercontent.com",
    clientSecret: "U1F77xC1KtBVUKDJ-t5bVtT7",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){console.log("Can't find user",err); return;}
        console.log(profile);
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