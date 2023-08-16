const express = require("express");
const { payment } = require("../controller/paystackController");
const router = express.Router();


router.post("/payment", payment);


module.exports = router;