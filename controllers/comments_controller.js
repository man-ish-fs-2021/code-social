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

module.exports.destroy = function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            var postId = comment.post;
            comment.remove();
            // deleting the comments ids from the posts comments array. i.e we are updating the comments array in the post collection 
            Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}},function(err){
                if(err){console.log("Error in pulling the comments"); return}
                return res.redirect("back");
            });
            
        }
        else{
            return res.redirect("back");
        }
    });
}