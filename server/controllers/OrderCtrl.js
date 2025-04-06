// const instance = require ("../config/razorpay")
const Order = require("../models/Order")
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require('uuid');
const Product = require("../models/productModel")
const { instance } = require("../config/razorpay")
const crypto = require("crypto")



const User = require("../models/userModel")




const capturePayment = async (req, res) => {
  const { products ,coupon} = req.body

  console.log(products)
console.log("enter payment")

  if (products.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0;

 
    for (const item of products) {
      console.log(item)
      const product_id = item._id;
      let product;

      try {
        product = await Product.findById(product_id);

        if (!product) {
          return res.status(200).json({ success: false, message: "Could not find the Product" });
        }

        total_amount += product.price * item.quantity;
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
      }
   
  }

  console.log("total ammont - ", total_amount)


 
  const options = {
    amount: total_amount * 100,
    currency: "INR",
    // receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })

    console.log(paymentResponse)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}


const paymentVerification = async (req, res) => {
  console.log("enter verify")
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const product = req.body?.products
    const address = req.body?.address
    const payable = req.body?.payable
  
    console.log(product)
  const userId = req.user.id

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
      if (expectedSignature === razorpay_signature) {
        try {
          // Call the createOrder function
          await createOrder(product, userId, address, razorpay_order_id, razorpay_payment_id, payable, res);
      
          // Send the response after the order is successfully created
          return res.status(200).json({ success: true, message: "Payment Verified" });
        } catch (error) {
          // Handle any errors that occur during order creation
          console.error("Error creating order:", error);
          return res.status(500).json({ success: false, message: "Error creating order" });
        }
      }
      
  
    return res.status(200).json({ success: false, message: "Payment Failed" })
};






const createOrder = asyncHandler(async (products, userId, address, razorpay_order_id, razorpay_payment_id,payable, res) => {
  const userDetails = await User.findById(userId);
console.log(products)
  const {
    billingCity,
    billingPincode,
    billingState,
    billingCountry,
    billingAddress,
    billingPhone,
    street,
    city,
    state,
    postalCode
  } = address;


  const email = userDetails.email;

  try {
         const orderId = uuidv4();

    const order = await Order.create({
      order_id: orderId, // Provide order_id
      shipment_id: 123, // Example shipment_id
      user: userId,
      shippingInfo: {
              name: userDetails.name, // assuming user has a name field
              address: street,
              city: city,
              state: state,
              pincode: postalCode,
            },
      paymentInfo: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      },
      orderItems: products.map(item => ({
        product: item._id,
        quantity: item.quantity,
      })),
      
      totalPrice: payable, // Update with actual total price
    });



    for (const item of products) {
      const product = await Product.findById(item._id);
      if (!product) {
        throw new Error(`Product with ID ${item._id} not found`);
      }
    
      product.sold += item.quantity;
      product.quantity -= item.quantity;
    
      if (product.quantity < 0) {
        throw new Error(`Not enough stock for product with ID ${item._id}`);
      }
    
      await product.save();
    }
    




   

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

  // Send Payment Success Email







  const getAllOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const role = req.user.role;
  
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: `User is not found`,
        });
      }
  
      let query = {};
      if (role !== "admin") {
        query.user = userId;
      }
  
      const orders = await Order.find(query)
        .populate("user")
        .populate({
          path: "orderItems.product",
          model: "Product",
        })
        .sort({ createdAt: -1 }) // Sort latest first
        .exec();
  
      console.log("Populated Orders:", orders);
  
      return res.status(200).json({
        orders,
        success: true,
        message: `Fetch Orders Successfully`,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: `Error during fetch order`,
      });
    }
  };
  



module.exports = {
    capturePayment,
  paymentVerification,
  createOrder,
  getAllOrder
};
