const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const authRouter = express.Router();

const verify = require("../middlewares/verify");

let success=false;

//User Registration
authRouter.post(
  "/signup",
  [
    //validating the details in the middleware
    body("email", "Email with a unique value required").isEmail(),
    body("password", "password must be of minimum length 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({
        errors: errors.array(),
      });
    } else if (Object.keys(req.body).length === 0) {
      console.log("failed");

      return res.status(404).json({
        message: "Incomplete details, all fields required!",
      });
    } else {
      try {
        //verifying if a user with a email already exists
        const user = await User.findOne({
          email: req.body.email,
        });

        if (user) {
          //if the user is found then we return
          return res.status(400).json({
            success,
            message: "A user with this email already exists",
          });
        }

        //else we create the user, if the email is not already taken by some other user
        //Hash the password entered by the user.
        bcrypt.genSalt(10, async function (err, salt) {
          bcrypt.hash(req.body.password, salt, async function (err, hash) {
            // Store hash in your password DB.
            const result = await User.create({
              name: req.body.name,
              email: req.body.email,
              password: hash,
            }); //creating the user in the database

            console.log("User registered successfully");
            success=true;
            return res.status(200).json({
              success,
              message: "registration successful",
              result: result,
            });
          });
        });
      } catch (error) {
        //if some error occurs then it will be handled here
        console.log("Error in registration", error);

        return res.status(400).json({
          success,
          message: "error occurred in registration",
          error: error.message,
        });
      }
    }
  }
);

let status = false;

//User Login
authRouter.post(
  "/login",
  [
    body("email", "Enter a valid email!").isEmail(), //verifying the details entered by the user
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req); //validation

    if (!errors.isEmpty()) {
      //checking if there are any errors

      console.log(errors.array());
      return res.status(400).json({
        errors: errors.array(),
      }); //return the response with the error
    } else {
      try {
        //checking whether the user who is trying to login, exists in the database
        const user = await User.findOne({
          email: req.body.email,
        });

        //if user is not present in the database with the inputted email, the we return with error response
        if (!user) {
          return res
            .status(400)
            .json({
              status,
              message: "Authentication failed, invalid login credentials!",
            });
        }

        //else if the user is present in the database with the inputted email, we check the password
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result !== false) {
          //if the password is matched
          //then we generate a json-web-token
          success = true;
          const authToken = jwt.sign(
            {
              userId: user._id,
            },
            process.env.JWT_KEY
          );

          //store that token inside a cookie
          res.cookie("secret", authToken, {
            //and then send the cookie with the response to the user
            httpOnly: true,
          }); //so whenever the user will make a request to authorized content, he will send a token
          //along with his request, which will be matched with the token given to the user at the
          //time of login, if matched the user is given the access else the user is denied access
          return res.status(200).json({
            authToken: authToken,
            success,
            message: "User successfully logged in",
          });
        } else {
          //if the passwod does not matches, the we return the response with an error
          return res.status(400).json({
            success,
            message: "User authentication failed, Invalid login credentials!",
          });
        }
      } catch (error) {
        console.log("Error in login", error);
        return res.status(400).json({
          message: "Error occurred in login",
          result: error,
        });
      }
    }
  }
);

//route to getUser
authRouter.get("/getUser", verify, getUser);

//Function to test the token authentication
async function getUser(req, res) {
  try {
    // console.log(req.userId);
    const user = await User.findById(req.userId).select("-password");
    // console.log(user);
    if (user !== null) {
      //if user was fetched successfully
      return res.status(200).json({
        message: "Use fetched successfully",
        user: user,
      });
    } else {
      return res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}

module.exports = authRouter;
