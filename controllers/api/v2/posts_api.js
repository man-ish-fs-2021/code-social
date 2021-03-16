module.exports.index = function(req,res){
    return res.json(200,{
        data:{
            message:"API for v2",
            posts:[]
        }
    })
}