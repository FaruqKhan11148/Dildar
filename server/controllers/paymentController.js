const crypto = require('crypto');

const razorpay = require('../config/razorpay');

const Order = require('../models/Order');

// ============================
// CREATE RAZORPAY ORDER
// ============================
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Razorpay uses paisa
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Failed to create Razorpay order',
    });
  }
};

// ============================
// VERIFY PAYMENT
// ============================
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      customerName,
      phone,
      address,

      product,
      quantity,
      totalAmount,
    } = req.body;

    // ============================
    // CREATE SIGNATURE
    // ============================
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    // ============================
    // GENERATE EXPECTED SIGNATURE
    // ============================
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    // ============================
    // VERIFY SIGNATURE
    // ============================
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }

    // ============================
    // SAVE ORDER
    // ============================
    const newOrder = await Order.create({
      customerName,
      phone,
      address,

      product,

      quantity,

      totalAmount,

      paymentMethod: 'Razorpay UPI',

      paymentStatus: 'Paid',

      razorpay_order_id,

      razorpay_payment_id,

      status: 'Pending',
    });

    // SOCKET EVENT
    const io = req.app.get('io');

    io.emit('newOrder', newOrder);

    // RESPONSE
    res.status(200).json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
};
