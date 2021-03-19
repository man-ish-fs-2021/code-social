const nodemailer = require("../config/nodemailer");

exports.resetPasswordEmail = function(token){
    let htmlTemplate = nodemailer.renderTemplate({token:token},"/resetPassword/reset_password.ejs");
    nodemailer.transporter.sendMail({
        from: "nodetest587@gmail.com",
        to: token.user.email,
        subject: "Testing the nodemailer", 
        text:"Hello world?",
        html: htmlTemplate
    },function(err,info){
        if(err){console.log("Error in semding mail",err); return;}
        // console.log(info);
        return;
    });

}