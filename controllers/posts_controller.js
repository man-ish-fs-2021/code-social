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

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            // deleting the comments relating to post
            await Comment.deleteMany({post: req.params.id});

            return res.redirect("back");
        
        }
        else{
         return res.redirect("back"); 
        }
    }
    catch(err){
        console.log("Error in desroying post",err);
        return;
    }
}