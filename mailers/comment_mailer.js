const nodemailer = require("../config/nodemailer");


exports.newComment = function(comment){
    let htmlTemplate = nodemailer.renderTemplate({comment:comment},"/comments/new_comment.ejs")
    nodemailer.transporter.sendMail({
        from: "nodetest587@gmail.com",
        to: comment.user.email,
        subject: "Testing the nodemailer",
        text:"Hello world?",
        html: htmlTemplate
    },function(err,info){
        if(err){console.log("Error in semding mail",err); return;}
        // console.log(info);
        return;
    });

}