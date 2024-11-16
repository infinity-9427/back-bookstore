// const Order = require("./order.model");

// const createAOrder = async (req, res) => {
//   try {
//     const newOrder =  await Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(200).json(savedOrder);
//   } catch (error) {
//     console.error("Error creating order", error);
//     res.status(500).json({ message: "Failed to create order" });
//   }
// };

// const getOrderByEmail = async (req, res) => {
//   try {
//     const {email} = req.params;
//     const orders = await Order.find({email}).sort({createdAt: -1});
//     if(!orders) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error fetching orders", error);
//     res.status(500).json({ message: "Failed to fetch order" });
//   }
// }

// module.exports = {
//   createAOrder,
//   getOrderByEmail
// };


const mongoose = require('mongoose');
const Order = require("./order.model");

const createAOrder = async (req, res) => {
  try {
    // Convert productIds to ObjectId instances correctly
    const productIds = req.body.productIds.map(id => new mongoose.Types.ObjectId(id)); // Ensure using `new`

    // Create a new order with the converted productIds
    const newOrder = new Order({
      ...req.body,
      productIds: productIds
    });

    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail
};
