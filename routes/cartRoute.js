const express = require("express");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const { createCart, updateCart, deleteCart, getUserCart, getAllCart } = require("../controller/cartController");
const router = express.Router();


router.get("/", verifyToken, createCart);

router.put("/:id", verifyTokenAndAuthorization, updateCart);

router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);

router.get("/", verifyTokenAndAdmin, getAllCart);

module.exports = router;