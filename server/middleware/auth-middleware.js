const jwt = require('jsonwebtoken')
const User = require("../models/user-model")
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message : "Unauthorized HTTP, Tokens are not provided"})
    }
    // console.log(token)
    const jwtToken = token.replace("Bearer", "").trim();
    // console.log(jwtToken)
    try{    
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)
        // console.log("helloJoker", isVerified);
        const userData = await User.findOne({email : isVerified.email}).select({password : 0})
        // console.log(userData);
        req.user = userData; 
        req.token = jwtToken;
        req.userId = userData._id;
        next();
    }catch(error){
        return res.status(400).json({message : "Unauthorized. Invalid Token"});
    }
}
module.exports = authMiddleware;