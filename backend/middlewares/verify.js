const jwt=require("jsonwebtoken");

async function verify(req,res,next){
  const token=await req.cookies['secret']; //getting the token from the cookie
  
  if(token) //checking if the token is received
  {
    try {
      const result=await jwt.verify(token,process.env.JWT_KEY); //verifying the token ,by using the secret key
      res.status(200).json({message:"User authorized"}); //if verified, then user is granted the access
      next(); //and can go to the next function
    } catch (error) {
      return res.status(500).json({message:"Internal server error",error:error});
    }
  }
    else{
      return res.status(401).json({message:"Invalid credentials"});
    }
  }

  module.exports=verify;