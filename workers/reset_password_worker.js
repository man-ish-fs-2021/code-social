const queue = require("../config/kue");
const resetPasswordmailer = require("../mailers/reset_password_mailer");


queue.process('reset-email',function(job,done){
    // console.log("Data from the delayed job",job.data);
    resetPasswordmailer.resetPasswordEmail(job.data);
    done();
});