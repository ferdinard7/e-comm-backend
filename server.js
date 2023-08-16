const dotenv = require("dotenv").config();
const express = require("express");
const connectDb = require("./config/dbConnection");
const cors = require("cors");


const app = express();
 
const port = process.env.PORT || 3000;

connectDb();
app.use(cors());   
app.use(express.json());
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/auth", require("./routes/userRoute"));
app.use("/api/products", require("./routes/productRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
app.use("/api/carts", require("./routes/cartRoute"));
app.use("/api/checkout", require("./routes/paystackRoute"));
// app.use("/", require("./routes/paystackRoute"));



app.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
  })
