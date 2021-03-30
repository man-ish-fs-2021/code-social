const {
    readyState
} = require("../config/mongoose");
const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const resetPassword = require("../models/reset_password");
const Friendship = require("../models/friendship");



module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log("Error in finding the user - profile");
            return
        }
        let Friend = Friendship.findById({$and:[{from_user:req.user._id},{to_user:req.params.id}]});
        var isFriend;
        if(Friend){
          isFriend = true;
        }else{
          isFriend = false;
        }

        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user,
            isFriend:isFriend
        });

    });
}

module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if ("***Multer error", err) {
                    console.log(err);
                    return;
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    if(user.avatar){
                        fs.access(path.join(__dirname,"..",user.avatar),function(err){
                            if(err){console.log(err); return;}
                            fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                        });
                    }
                    user.avatar = User.avatarPath + "/" + req.file.filename;
                }
                user.save();
            res.redirect("back");
            });
            

        } catch {
            req.flash("error", "Error in creating the post");
            console.log(err);
        }
    } else {
        return res.status(401).send("Unauthorized");
    }
}
// render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/users/profile");
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/users/profile");
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function (req, res) {
    console.log(req.cookie);
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            console.log("error in signing up", err);
            return
        }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log("Error in creating", err);
                    return
                }

                return res.redirect("/users/sign-in");
            });
        } else {
            return res.redirect("back");
        }
    });
}


// sign in and create a session for the user
module.exports.createSession = function (req, res) {

    req.flash('success', 'Logged in succefully');

    return res.redirect("/");
}

module.exports.endSession = function (req, res) {
    req.logout();
    req.flash('success', 'logged out sucessfully');
    return res.redirect("/");
}


