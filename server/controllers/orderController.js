const Order = require('../models/Order');

// GET ALL ORDERS
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      product,
      quantity,
      totalAmount,
      paymentScreenshot,
      paymentMethod,
    } = req.body;

    // VALIDATION
    if (!customerName || !phone || !address || !product || !quantity) {
      return res.status(400).json({
        message: 'Please fill all fields',
      });
    }

    const order = await Order.create({
      customerName,
      phone,
      address,
      product,
      quantity,
      totalAmount,
      paymentScreenshot,
      paymentMethod,
      status: 'Pending Payment',
      paymentVerified: false,
      isPaid: false,
    });
    
    const io = req.app.get('io');
    io.emit('newOrder', order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE ORDER
const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;

    if (status === 'Preparing') {
      order.paymentVerified = true;
      order.isPaid = true;
      order.paidAt = new Date();
    }

    if (status === 'Cancelled') {
      order.cancelledAt = new Date();
    }

    if (status === 'Delivered') {
      order.deliveredAt = new Date();
    }

    const updatedOrder = await order.save();

    // 🔥 SOCKET EMIT
    const io = req.app.get('io');

    io.emit('orderUpdated', updatedOrder);

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  createOrder,
  getSingleOrder,
  updateOrderStatus,
};
