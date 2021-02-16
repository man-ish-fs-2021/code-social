module.exports.home = function(req,res){
       console.log("Routing is working");
       return res.render("home",{
              title : "Home"
       });
};

// module.exports.actionName = function(req,res){}