const queue = require("../config/kue");
const commentMailer = require("../mailers/comment_mailer");


queue.process('email',function(job,done){
    // console.log("Data from the delayed job",job.data);
    commentMailer.newComment(job.data);
    done();
});