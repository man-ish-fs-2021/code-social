const Post = require("../models/post");
const Comment = require("../models/comments");
const Like = require("../models/like");

module.exports.create = async function (req, res) {
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            post = await post.populate("user","name").execPopulate();
            return res.status(200).json({

                data:{
                    post:post
                },message:"Post created"
            });
        }
        
        req.flash("success","Post is posted succesfully!");
    
        res.redirect('back');
    }catch(err){
        req.flash("error", "Error in creating the post");
        console.log(err);
    }
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            await Like.deleteMany({onModel:"Post", likeable:post._id});
            await Like.deleteMany({_id: {$in:post.comments}});
            post.remove();

            // deleting the comments relating to post
            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                
                return res.status(200).json({
                    data:{
                        post_id: req.params.id
                    },message:"Post Deleted"
                });
            }
            req.flash("success","Post is deleted!");
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