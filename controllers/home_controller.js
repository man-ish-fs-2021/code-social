const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
       //       we populate the post with user, and we populate the post with comments and it's corresponding user
       try{
              // We have converted the code to aync/awwait.
              // Here, we can assign the post to a variable with await to make it much cleaner code.
              let posts = await Post.find({}).sort("-createdAt").populate("user").populate({
                     path: "comments",
                     populate: {
                            path: "user"
                     },
                     populate : {
                            path : "likes"
                     }
              }).populate('likes');
       
              let users = await User.find({});
       
              return res.render("home", {
                     title: "CODE-social",
                     posts: posts,
                     all_users: users
              });
       }catch(err){
              console.log("Error",err);
              return;
       }


};

// module.exports.actionName = function(req,res){}