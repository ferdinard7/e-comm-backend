const asyncHandler = require("express-async-handler");
// const reactRouterDom = require("react-router-dom");
// const stripe = require("stripe")(process.env.STRIPE_KEY);

// const https = require('https');

// const payment = (req, res) => {

//   const params = JSON.stringify({
//     "email": "customer@email.com",
//     "amount": "20000"
//   })
  
//   const options = {
//     hostname: 'api.paystack.co',
//     port: 443,
//     path: '/transaction/initialize',
//     method: 'POST',
//     headers: {
//       Authorization: 'Bearer sk_test_d1bf78da4c5ad5d55db53dbe85b9a4f4f4debb13',
//       'Content-Type': 'application/json'
//     }
//   }
  
//   const reqPaystack = https.request(options, resPaystack => {
//     let data = ''
  
//     resPaystack.on('data', (chunk) => {
//       data += chunk
//     });
  
//     resPaystack.on('end', () => {
//       res.send(data);
//       console.log(JSON.parse(data))
//     })
//   }).on('error', error => {
//     console.error(error)
//   })
  
//   reqPaystack.write(params)
//   reqPaystack.end();
//       // res.status(200).json(data);
// }



// module.exports = {
//   payment,
// }

















// // paystackController.js LEGIT

// require('dotenv').config();
const axios = require('axios');

const secretKey = process.env.PAYSTACK_SECRET_KEY;


const payment = asyncHandler(async(req, res) => {

    try {
        // Get payment details from the request body
        const { amount, email, metadata, event, data } = req.body;
    
        // Make a request to Paystack API to initialize payment
        const response = await axios.post(
          'https://api.paystack.co/transaction/initialize',
          {
            amount,
            email,
            metadata,
            // currency: "NGN"
          },
          {
            headers: {
              Authorization: `Bearer ${secretKey}`,
              'Content-Type': 'application/json',
            },
          }
        );
    
        // Send the response data back to the frontend
        res.json(response.data);

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while initiating payment.' });
      }
})



 


module.exports = {
  payment,
}




