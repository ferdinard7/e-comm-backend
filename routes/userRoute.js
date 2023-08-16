const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/auth");
const { updateUser, deleteUser, getUser, getAllUsers, getUserStats } = require("../controller/userController");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");


router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/:id", verifyTokenAndAuthorization, updateUser);

router.delete("/:id", verifyTokenAndAuthorization, deleteUser)

router.get("/find/:id", verifyTokenAndAdmin, getUser);

router.get("/", verifyTokenAndAdmin, getAllUsers);

router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = router;

