const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

// setting up a strategy and authenticating
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function (email, password, done) {
        User.findOne({
            email: email
        }, function (err, user) {
            if (err) {
                console.log("Error in ----------> passport");
                return done(err);
            }
            if (!user || user.password != password) {
                console.log("User not found ---------> passport");
                return done(null, false);
            }
            return done(null, user);
        });
    }));

// Serialized cookie value

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
// deserialising the cookie value
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in --------> passport");
            return done(err);
        }

        return done(null, user);
    });
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect("/users/sign-in");
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports= passport;