const Comment = require("../models/comments");
const Post = require("../models/post");
const commentMailer = require("../mailers/comment_mailer");
const commentEmailWorker = require("../workers/comment_email_worker");
const queue = require("../config/kue");
const Like = require("../models/like");


module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            comment = await comment.populate("user", "name email").execPopulate();
            //   commentMailer.newComment(comment);
            let job = queue.create('email', comment).save(function (err) {
                if (err) {
                    console.log("Error in saving the job", err);
                }
                console.log("id of the job enqueued:", job.id);
            });
            // here we are pushing the created comment into the post array containing comment ids
            if (req.xhr) {

                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "comment created"
                });
            }
            req.flash("success", "Comment published!");
            res.redirect("/");
        }
    } catch (err) {
        console.log("Error in creating a comment");
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            var postId = comment.post;
            await Like.deleteMany({
                likeable: comment,
                onModel: "Comment"
            });
            comment.remove();
            // deleting the comments ids from the posts comments array. i.e we are updating the comments array in the post collection 
            await Post.findByIdAndUpdate(postId, {
                $pull: {
                    comments: req.params.id
                }
            });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted"
                });
            }
            req.flash("success", "Comment deleted!");
            return res.redirect("back");
        } else {
            return res.redirect("back");
        }
    } catch (err) {
        console.log("Error in deleting the comment", err);
        return;
    }

}