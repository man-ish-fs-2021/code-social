const Comment = require("../models/comments");
const Post = require("../models/post");


module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (err) {
            console.log("no post found");
            return
        }
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                if (err) {
                    console.log("Comment not created");
                    return
                }
                // here we are pushing the created comment into the post array containing comment ids
                // 
                post.comments.push(comment);
                post.save();
                res.redirect("/");
            })
        }
    });
}