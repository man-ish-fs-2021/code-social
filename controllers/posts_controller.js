const Post = require("../models/post");
const Comment = require("../models/comments");
module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){console.log("Error in creating Post"); return}

        res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(post.user == req.user.id){
            post.remove();
            // deleting the comments relating to post
            Comment.deleteMany({post: req.params.id},function(err){
                if(err){console.log("Delete comment failed"); return}
                return res.redirect("back");
            });
        }
        else{
            return res.redirect("back"); 
        }
    })
}