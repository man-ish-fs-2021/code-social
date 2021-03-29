const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comments");



module.exports.toggleLike = async function(req,res){
    try{
        let likeable;
    let deleted = false;
    //  link : like/toggle_like/?id=xyz&type=Post/Comment
    if(req.query.type == 'Post'){
        likeable = await Post.findById(req.query.id).populate('likes');
    }
    else{
        likeable = await Comment.findById(req.query.id).populate('likes');
    }
    let existingLike = await Like.findOne({
        user: req.user._id,
        onModel : req.query.type,
        likeable: req.query.id
    });
    
    if(existingLike){
        likeable.likes.pull(existingLike._id);
        likeable.save();
        existingLike.remove();
        
        deleted = true;
    }else{
        let newLike = await Like.create({
            user: req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        });
        
        likeable.likes.push(newLike._id);
        likeable.save();
        deleted = false;
    }
    return res.status(200).json({
        message: "Request successful",
        data : {
            deleted:deleted
        }
    });

    }catch(err){
        req.flash("error", "Error in creating the post");
            console.log(err);
    }
}

