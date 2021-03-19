const User = require("../models/user");
const Token = require("../models/reset_password");
const crypto = require("crypto");
const queue = require("../config/kue");
const resetPasswordmailer = require("../mailers/reset_password_mailer");
const resetPasswordWorker = require("../workers/reset_password_worker");
// const { RSA_NO_PADDING } = require("constants");








module.exports.enter_email = function(req,res){
    return res.render("enter_email",{
        title : "change email"
    });
} 

module.exports.send_token = async function(req,res){
    let access_token = crypto.randomBytes(20).toString('hex');
    try{
        
        let user = await User.findOne({email: req.body.email});
        // console.log(user);
        if(req.user){
            return res.redirect("/");
        }
        if(user){
            let token = await Token.create({
                user: user._id,
                accessToken: access_token,
                isValid:true
            });
             token = await token.populate('user','name email').execPopulate();
             console.log(token);

            let job = queue.create('reset-email',token).save(function(err){
                if(err){
                    console.log("Error in saving the job",err);
                }
                // console.log("id of the job enqueued:",job.id);
                req.flash('success','A message has been sent to your email')
                return res.redirect('back');
             });
    
        }else{
            return res.status(401).redirect("back");
        }
        
    }catch(err){
        console.log("Error in creating a token",err);
       return;
    }
}

module.exports.change_password = async function(req,res){
    let access_token = req.query.access_token;
    try{
        if(req.user){
            return res.redirect("/");
        }
        let token = await Token.findOne({accessToken:access_token});
        if(token){
            return res.render('change_password',{
                title: "Change password- code social",
                token: token
            });
        }else{
            return res.redirect("users/sign-in");
        }
    }catch(err){
        console.log("Error in creating a token",err);
        return;
    }
}

module.exports.new_password = async function(req,res){
    let access_token = req.body.access_token;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    if (password != confirmPassword)
    {
        req.flash('error', 'Please enter same password in both the fields!');
        return res.redirect('back');
    }
    if (password == "")
    {
        req.flash('error', 'Please enter a non empty password in both the fields!');
        return res.redirect('back');
    }

    if(password===confirmPassword){
        try {
            let token = await Token.findOneAndUpdate({accessToken:access_token},{$set:{isValid:false}});
            let user = await User.findOneAndUpdate({_id:token.user._id},{$set:{password:confirmPassword}});
            req.flash('success','Use the new password');
            return res.redirect("/users/sign-in");
        } catch (err) {
            console.log("Error in creating a token",err);
            return;
        }
    }else{
        return res.redirect("/users/sign-in");
    }
    
}