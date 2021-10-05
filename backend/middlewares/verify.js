const jwt = require("jsonwebtoken");

async function verify(req, res, next) {
  const token = await req.headers["auth-token"]; //getting the token from the cookie
  // console.log(token);
  if (token) //checking if the token is received
  {
    try {
      const result = jwt.verify(token, process.env.JWT_KEY); //verifying the token ,by using the secret key and returns the payload if verified
      // console.log(result);
      req.userId = result.userId; //setting the "userId in request header" got from the "payload"
      // res.status(200).json({
      //   message: "User authorized"
      // }); //if verified, then user is granted the access
      next(); //and can go to the next function
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error
      });
    }
  }
   else { //if the token is invalid then we return the error status to the user
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }
}

module.exports = verify;