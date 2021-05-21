const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const env = require("../../../config/environment");


module.exports.createSession = async function (req, res) {

    try{
        let user = await User.findOne({email: req.body.email});

    if(!user || user.password!=req.body.password){
        return res.json(422,{
            message: "Unable to find user"
        });
    }
    return res.status(200).json({
        data:{
            message:"Succesfully logged in",
            token: jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:100000}),
        }
    });
    }catch{
        console.log("Error in desroying post",err);
        return res.json(500,{
            message:"Internal error"
        });
    }
    
    
}