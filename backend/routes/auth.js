const express = require("express");
const User = require("../models/User");
const {
  body,
  validationResult
} = require("express-validator");
const bcrypt = require("bcryptjs");

const authRouter = express.Router();

//User Registration
authRouter.post(
  "/register",
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
        message: "incomplete details, all fields required!",
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
            message: "A user with this email already exists",
          });
        }

        //else we create the user, if the email is not already taken by some other user
        //Hash the password entered by the user.
        bcrypt.genSalt(10, async function (err, salt) {
          await bcrypt.hash(
            req.body.password,
            salt,
            async function (err, hash) {
              // Store hash in your password DB.
              const result = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash,
              }); //creating the user in the database

              console.log(result);

              return res.status(200).json({
                message: "registration successful",
                result: result,
              });
            }
          );
        });
      } catch (error) {
        //if some error occurs then it will be handled here
        console.log("Error in registration", error);

        return res.status(400).json({
          message: "error occurred in registration",
          error: error.message,
        });
      }
    }
  }
);

//User Login
authRouter.post(
  "/login",
  [body("email", "Enter a valid email!").isEmail()],
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
          return res.status(400).json({
            message: "Authentication failed, invalid email!",
          });
        }

        //else if the user is present in the database with the inputted email, we check the password
        const result=await bcrypt.compare(req.body.password,user.password);
        if(result){
          return res.status(200).json({
            message: "User successfully logged in",
            result: user,
          });
        } else {
          //if the passwod does not matches, the we return the response with an error
          return res.status(400).json({
            message: "User authentication failed, Invalid Password!",
          });
        }
      } catch (error) {
        console.log("Error in login", error);
        return res.status(400).json({
          message: "Error occured in login",
          result: error,
        });
      }
    }
  }
);

module.exports = authRouter;