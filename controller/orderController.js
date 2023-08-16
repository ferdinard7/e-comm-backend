const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Order = require("../models/orderModel");
const CryptoJS = require("crypto-js")


// CREATE/POST/UPLOAD A ORDER

const createOrder =  asyncHandler( async (req, res) => {
  const newOrder = new Order(req.body);
  
  try {
     const savedOrder = await newOrder.save();
     res.status(200).json(savedOrder)
  }catch(err) {
    res.status(err).json(err);
  }
})


// UPDATE ORDER

const updateOrder = asyncHandler(async (req, res) => {

   try {
     const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
       $set: req.body
     }, {new : true});

     res.status(200).json(updatedOrder);
   } catch(err) {

    res.status(500).json(err);
   }
})


// DELETE 

const deleteOrder = asyncHandler(async (req, res) => {
   try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted!");


   } catch (err) {
     res.status(500).json(err)
   }
  
})


// GET USER ORDER

const getUserOrder = asyncHandler(async (req, res) => {
  try {
     const orders = await Order.find({userId: req.params.id});

     res.status(200).json(orders);

  } catch (err) {
    res.status(500).json(err);
  }
 
})

 //  GET ALL ORDERS
    const getAllOrder = asyncHandler(async (req, res) => {
        try {
            const orders = await Order.find();
                res.status(200).json(orders)
        } catch (err) {
     res.status(500).json(err);            
        }
    })


    // GET MONTHLY INCOME

    const getIncome = asyncHandler(async(req, res) => {
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

      try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

            res.status(200).json(income);
            
        } catch (err) {
            res.status(500).json(err)
        }
    })


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getAllOrder,
    getIncome,
}