const express = require("express");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const { createOrder, updateOrder, deleteOrder, getUserOrder, getAllOrder, getIncome } = require("../controller/orderController");
const router = express.Router();


router.post("/", verifyToken, createOrder )

router.put("/:id", verifyTokenAndAdmin, updateOrder);

router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrder);

router.get("/", verifyTokenAndAdmin, getAllOrder);

router.get("/income", verifyTokenAndAdmin, getIncome);

module.exports = router;