const Post = require("../models/post");
const User = require("../models/user");
const Friendship = require("../models/friendship");

module.exports.home = async function (req, res) {
       //       we populate the post with user, and we populate the post with comments and it's corresponding user
       try {
              // We have converted the code to aync/awwait.
              // Here, we can assign the post to a variable with await to make it much cleaner code.
              let posts = await Post.find({}).sort("-createdAt").populate("user").populate({
                     path: "comments",
                     populate: {
                            path: "user"
                     },
                     populate: {
                            path: "likes"
                     }
              }).populate('likes');
              let friends = new Array();
              let users = await User.find({}).populate("friends");
              if(req.user){
                     let all_friendships = await Friendship.find({$or:[{from_user:req.user._id},{to_user: req.user._id}] }).populate("from_user").populate("to_user");
                     // console.log(all_friendships);
                     for(let friend of all_friendships){
                            if(friend.from_user._id.toString() == req.user._id.toString()){
                                   friends.push({
                                          friend_name: friend.to_user.name,
                                          friend_id: friend.to_user._id
                                   });
                            }
                            else if(friend.to_user._id.toString() == req.user._id.toString()){
                                   friends.push({
                                          friend_name: friend.from_user.name,
                                          friend_id: friend.from_user._id
                                   });
                            }
                     }

              }
              console.log(friends);

              return res.render("home", {
                     title: "CODE-social",
                     posts: posts,
                     all_users: users,
                     user_friends : friends
              });
       } catch (err) {
              console.log("Error", err);
              return;
       }


};

// module.exports.actionName = function(req,res){}