
const Post = require("../../../models/post");
const Comment = require("../../../models/comments");


module.exports.index = async function (req, res) {

    let posts = await Post.find({}).sort("-createdAt").populate("user").populate({
        path: "comments",
        populate: {
            path: "user"
        }
    });

    
    return res.json(200, {
        data: {
            message: "Api of v1",
            posts: posts
        }
    })
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            // deleting the comments relating to post
            await Comment.deleteMany({post: req.params.id});
            
            // req.flash("success","Post is deleted!");
            return res.json(200,{
                message:"Post and associated comments deleted"
            });
        
        }
        else{
         return res.json(401,{
             message:"You are not authorised to delete this post"
         });
        }
    }
    catch(err){
        console.log("Error in desroying post",err);
        return res.json(500,{
            message:"Internal error"
        });
    }
}