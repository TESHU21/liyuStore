import paystack from "../config/paystack.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// Utility: Price calculation
function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = +(itemsPrice * 0.15).toFixed(2);
  const totalPrice = +(itemsPrice + shippingPrice + taxPrice).toFixed(2);

  return {
    itemsPrice: +itemsPrice.toFixed(2),
    shippingPrice: +shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

// 1. Create Order
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ error: "No order items" });
    }

    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x.product) },
    });

    const dbOrderItems = orderItems.map((item) => {
      const match = itemsFromDB.find((p) => p._id.toString() === item.product);
      if (!match) throw new Error(`Product not found: ${item.product}`);
      return {
        ...item,
        product: item.product,
        price: match.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrices(dbOrderItems);

    const order = new Order({
      user: req.user._id,
      orderItems: dbOrderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Initialize Paystack Transaction
const payOrder = async (req, res) => {
  try {
    const { callback_url, order } = req.body;

    if (!callback_url || !order) {
      return res.status(400).json({ error: "callback_url and order ID are required" });
    }

    const foundOrder = await Order.findById(order).populate("user", "email");

    if (!foundOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (foundOrder.paidAt) {
      return res.status(400).json({ error: "Order has already been paid for" });
    }

    const transaction = await paystack.initializeTransaction({
      amount: (foundOrder.totalPrice * 100).toString(),
      currency:  "ZAR",
      email: foundOrder.user.email,
      callback_url,
    });

    foundOrder.paystackReference = transaction.data.reference;
    const updatedOrder = await foundOrder.save();

    res.status(200).json({ transaction, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Verify Payment with Paystack
const verifyPayment = async (req, res) => {
  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({ error: "Payment reference is required" });
  }

  try {
    const verificationResponse = await paystack.verifyTransaction(reference);
    console.log("verificationResponse:", verificationResponse);

    const data = verificationResponse.data; // your paystack.js returns full response, so data is here

    const updatedOrder = await markOrderAsPaid(data);

    res.status(200).json({
      status: "success",
      message: "Payment verified and order marked as paid",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Verification failed:", error);
    res.status(500).json({ error: error.message || "Verification failed" });
  }
};



// 4. Mark Order Paid
const markOrderAsPaid = async ({ amount, status, paidAt, reference, id }) => {
  if (!amount || !status || !reference) throw new Error("Incomplete payment data");

  const order = await Order.findOne({ paystackReference: reference });
  if (!order) throw new Error("Order not found");

  if (order.paidAt) return order;

  const amountInDecimal = amount / 100;
  if (status !== "success" || !paidAt || amountInDecimal !== order.totalPrice) {
    throw new Error("Payment verification failed");
  }

  order.isPaid = true;
  order.paidAt = new Date(paidAt);
  order.paystackTransactionId = id;

  return await order.save();
};


// 5. Mark Delivered
const markOrderAsDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ error: "Order not found" });

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Get Order by ID
const findOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "username email");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7. Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "id username");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 8. Get User Orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 9. Count Total Orders
const countTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 10. Calculate Total Sales
const calculateTotalSales = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({ totalSales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 11. Sales by Date
const calcualteTotalSalesByDate = async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$paidAt" } },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.json(salesByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export controllers
export {
  createOrder,
  payOrder,
  verifyPayment,
  markOrderAsPaid,
  markOrderAsDelivered,
  findOrderById,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
};
