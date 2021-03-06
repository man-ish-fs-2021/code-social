const Post = require("../models/post");

module.exports.home = function (req, res) {
       Post.find({}).populate("user").exec(function (err, posts) {
              if (err) {
                     console.log("Error in displaying p[ost Homse controller");
                     return
              }
              return res.render("home",{
              title : "Code-social",
              posts: posts
       });

       });
};

// module.exports.actionName = function(req,res){}