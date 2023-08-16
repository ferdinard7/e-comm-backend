const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Cart = require("../models/cartModel");
const CryptoJS = require("crypto-js")


// CREATE/POST/UPLOAD A CART

const createCart =  asyncHandler( async (req, res) => {
  const newCart = new Cart(req.body);
  
  try {
     const savedCart = await newCart.save();
     res.status(200).json(savedCart)
  }catch(err) {
    res.status(err).json(err);
  }
})


// UPDATE CART

const updateCart = asyncHandler(async (req, res) => {

   try {
     const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
       $set: req.body
     }, {new : true});

     res.status(200).json(updatedCart)
   } catch(err) {

    res.status(500).json(err);
   }
})


// DELETE 

const deleteCart = asyncHandler(async (req, res) => {
   try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("cart has been deleted!");


   } catch (err) {
     res.status(500).json(err)
   }
  
})


// GET USER CART

const getUserCart = asyncHandler(async (req, res) => {
  try {
     const cart = await Cart.findOne({userId: req.params.id});

     res.status(200).json(cart);

  } catch (err) {
    res.status(500).json(err)
  }
 
})

 //  GET ALL CART
   const getAllCart = asyncHandler(async (req, res) => {
        try {
            const carts = await Cart.find();
                res.status(200).json(carts)
        } catch (err) {
     res.status(500).json(err);            
        }
    })



module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getUserCart,
    getAllCart,
}