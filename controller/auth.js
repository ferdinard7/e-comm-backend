const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER USER

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password} = req.body;

    if(!username || !email || !password) {
        res.status(400).json("All fields are madatory!")
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400).json("User already exist!");

    }

     
    try {
        const newUser = new User({
            username,
            email,
            password: CryptoJS.AES.encrypt(
                password, 
                process.env.PASS_SEC
                ).toString(),
        })

     const saveUser = await newUser.save();
          res.status(200).json(saveUser);

    } catch(err) {
        console.log(err)
    }
})    


// LOGIN

const loginUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("Wrong credentials");
    }

    try {
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong credentials");
          }
    

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "3d"})

        const { password, ...others} = user._doc;

        res.status(200).json({...others, accessToken})
     } catch(err) {
        res.status(500).json(err)
     }

    
})




module.exports = {
    registerUser,
    loginUser
}