const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const env = require("./environment");

const User = require("../models/user");

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret

}

passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id, function (err, user) {
        if(err){console.log("Error in finding jwt"); return;}

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
}));

module.exports = passport;