module.exports.profile= function(req,res){
    console.log("users route");
    return res.render('user_profile',{
        title:"users"
    });
    
}