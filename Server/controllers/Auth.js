const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
// const localStorage = require("localStorage")
 

// Signup
exports.signup = async(req,res) => {
    try{
        const {
            firstName,
            lastName="",
            email,
            password,
            confirmPassword
        } = req.body;

        if(!firstName || !email || !password || !confirmPassword){
            return res.status(403).json({
                success: false,
                message:"All Fields are Required !!!"
            })
        }
        
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message:"Password and Confirm-Password do not match"
            })
        }

        // Finding if user already exist or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already Exists',
            })
        }

        // secure password
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
        });

        res.status(200).json({
            success:true,
            user,
            message:"User Registered Successfully"
        });
    }

    catch(error){
        console.error(error);
        console.log(error);
        res.status(500).json({
            success:false,
            message:"User can't be registered, please try again later"
        })
    }
}


// Login
exports.login = async (req, res) => {
    try {
      // Get email and password from request body
      const { email, password } = req.body
  
      // Check if email or password is missing
      if (!email || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
  
      // Find user with provided email
      const user = await User.findOne({ email })
  
      // If user not found with provided email
      if (!user) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `User is not Registered with Us Please SignUp to Continue`,
        })
      }
  
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user._id},
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        )
  
        // Save token to user document in database
        user.token = token
        user.password = undefined
        // Set cookie for token and return success response
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }
        // localStorage.setItem('token', user.token);
        // localStorage.setItem('user', user);
        // const setLocalStorage = (key, value) =>{
        //   window.localStorage.setItem(key, JSON.stringify(value));
        // }
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: `User Login Success`,
        })
      } else {
        return res.status(401).json({
          success: false,
          message: `Password is incorrect`,
        })
      }
    } catch (error) {
      console.error(error)
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }