const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const verifyToken = (req, res, next) => {
  let token;
    let authHeader = req.headers.Authorization || req.headers.authorization; 
    if (authHeader && authHeader.startsWith("Bearer")) {
       token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  };
  
  
  
  const verifyTokenAndAuthorization = asyncHandler(async(req, res, next) => {

    verifyToken(req, res, () => {
      
      if (req.user.id === req.params.id || req.user.isAdmin){
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  });
  

  const verifyTokenAndAdmin = asyncHandler(async(req, res, next) => {

    verifyToken(req, res, () => {
      
      if (req.user.isAdmin){
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  });

  
  module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  };


