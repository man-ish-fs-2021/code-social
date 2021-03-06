const Post = require("../models/post");

module.exports.home = function (req, res) {
//       we populate the post with user, and we populate the post with comments and it's corresponding user
       Post.find({}).populate("user").populate({
              path:"comments",
              populate:{
                     path: "user"
              }
       }).exec(function(err,posts){
              if(err){console.log("error post homecontroller"); return}
              return res.render("home",{
                     title: "CODE-social",
                     posts:posts
              });
       });

       
};

// module.exports.actionName = function(req,res){}