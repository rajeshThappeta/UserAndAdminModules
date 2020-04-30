const jwt=require("jsonwebtoken");
require("dotenv").config();

var checkAndValidateToken=(req,res,next)=>{
    console.log("req headers :",req.headers.authorization);
    let signedTokenWithBearer=req.headers.authorization;
    //check token existance
    if(signedTokenWithBearer==undefined)
    {
        res.send({message:"Unauthorized access"})
    }
    else{
        //remove first 7 chars 
       let signedToken= signedTokenWithBearer.slice(7,signedTokenWithBearer.length);
        //check validity of token
        jwt.verify(signedToken,process.env.jwtsecret,(err,decodedToken)=>{
            if(err)
            {
                res.send({message:"session has expired"});
            }
            else{
                next();
            }
        })


    }
}


module.exports=checkAndValidateToken;