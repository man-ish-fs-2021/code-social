const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = function (req, res) {
//       we populate the post with user, and we populate the post with comments and it's corresponding user
       Post.find({}).populate("user").populate({
              path:"comments",
              populate:{
                     path: "user"
              }
       }).exec(function(err,posts){
              if(err){console.log("error post homecontroller"); return}
              User.find({},function(err,users){
                     if(err){console.log("Cannot find user- home controller"); return}
                     return res.render("home",{
                            title: "CODE-social",
                            posts:posts,
                            all_users:users
                     });
              })
       });

       
};

// module.exports.actionName = function(req,res){}