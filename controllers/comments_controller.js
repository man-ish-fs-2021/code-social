const Comment = require("../models/comments");
const Post = require("../models/post");


module.exports.create = async function (req, res) {
  try{
    let post = await Post.findById(req.body.post);
    if (post) {
     let comment= await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id
      });
      post.comments.push(comment);
      post.save();
          // here we are pushing the created comment into the post array containing comment ids
          if(req.xhr){
              comment = await comment.populate("user","name").execPopulate();
              return res.status(200).json({
                  data:{
                      comment:comment
                  }, message: "comment created"
              });
          }
          req.flash("success","Post is posted succesfully!");
          res.redirect("/"); 
  }
  }catch(err){
    console.log("Error in creating a comment");
    return;
}
}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            var postId = comment.post;
            comment.remove();
            // deleting the comments ids from the posts comments array. i.e we are updating the comments array in the post collection 
            let post = Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id : req.params.id
                    }
                });
            }
                req.flash("success","Post is posted succesfully!");
                return res.redirect("back"); 
        }
        else{
            return res.redirect("back");
        }
    }catch(err){
        console.log("Error in deleting the comment",err);
        return;
    }
 
}