const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const CryptoJS = require("crypto-js")

// UPDATE A USER

const updateUser = asyncHandler(async (req, res) => {
    // const { password } = req.body;
  

   if(req.body.password) {
    // const hashedPassword = await bcrypt.hash(password, 10);
      
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password, 
      process.env.PASS_SEC
      ).toString();
   }

   try {
     const updatedUser = await User.findByIdAndUpdate(req.params.id, {
       $set: req.body
     }, {new : true});

     res.status(200).json(updatedUser)
   } catch(err) {

    res.status(500).json(err);
   }
})


// DELETE 

const deleteUser = asyncHandler(async (req, res) => {
   try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted!")
       

   } catch (err) {
     res.status(500).json(err)
   }
  
})


// GET USER

const getUser = asyncHandler(async (req, res) => {
  try {
     const user = await User.findById(req.params.id);
     const { password, ...others} = user._doc;


     res.status(200).json(others);

        

  } catch (err) {
    res.status(500).json(err)
  }
 
})

//  GET ALL  USERS

const getAllUsers = asyncHandler(async (req, res) => {
  const query = req.query.new;

  try {
     const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();


     res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err)
  }
 
})

// GET USER STATS

const getUserStats = asyncHandler(async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: {$gte: lastYear} } },
      {
        $project: {
          month: { $month : "$createdAt"},
        },
      },
      {
        $group : {
          _id: "$month",
          total: {$sum : 1},
        }
      }
    ]);

    res.status(200).json(data);

  }catch(err) {
    res.status(500).json(err);
  }
})

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers,
    getUserStats,
}