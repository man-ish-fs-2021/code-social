const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "nodetest587",
        pass : "q1w2e3r4t5y^"
    },
    tls: {
        rejectUnauthorized: false
    }
});

let renderTemplate = function(data,relativePath){
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativePath),
        data,
        function(err,template){
            if(err){console.log("Error in ejs render nodemailer",err); return;}

            mailHtml=template;
        }
    )
    return mailHtml;
}

module.exports = {
    transporter:transporter,
    renderTemplate: renderTemplate
}