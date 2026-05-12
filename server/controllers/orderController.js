const Order = require("../models/Order");

/* =========================
   GET ALL ORDERS
========================= */
const getOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("shop")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* =========================
   CREATE ORDER
========================= */
const createOrder = async (req, res) => {
  try {

    const {
      customerName,
      phone,
      address,
      products,
      totalAmount,
      shop,
    } = req.body;

    // VALIDATION
    if (
      !customerName ||
      !phone ||
      !address ||
      !products ||
      products.length === 0
    ) {

      return res.status(400).json({
        message: "Please fill all fields",
      });

    }

    const order = await Order.create({
      customerName,
      phone,
      address,
      products,
      totalAmount,
      shop,
    });

    res.status(201).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* =========================
   GET SINGLE ORDER
========================= */
const getSingleOrder = async (req, res) => {
  try {

    const order = await Order.findById(
      req.params.id
    ).populate("shop");

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* =========================
   GET ORDERS BY SHOP
========================= */
const getOrdersByShop = async (req, res) => {
  try {

    const orders = await Order.find({
      shop: req.params.shopId,
    }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/* =========================
   UPDATE ORDER STATUS
========================= */
const updateOrderStatus = async (
  req,
  res
) => {
  try {

    const order =
      await Order.findByIdAndUpdate(
        req.params.id,

        {
          status: req.body.status,
        },

        {
          new: true,
          runValidators: true,
        }
      );

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getOrders,
  createOrder,
  getSingleOrder,
  getOrdersByShop,
  updateOrderStatus,
};