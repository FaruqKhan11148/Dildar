const crypto = require('crypto');

const razorpay = require('../config/razorpay');

const Order = require('../models/Order');

// CREATE RAZORPAY ORDER
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

// VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
  try {
    console.log('\n==============================');
    console.log('🔥 VERIFY PAYMENT HIT');
    console.log('BODY:', req.body);

    const crypto = require('crypto');
    const Order = require('../models/Order');

    const { getDistance } = require('../utils/geoUtils');
    const shopLocation = require('../config/shopLocation');

    if (!req.body) {
      console.log('❌ No request body');
      return res.status(400).json({
        success: false,
        message: 'Request body missing',
      });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerName,
      phone,
      location,
      product,
      quantity,
      totalAmount,
    } = req.body;

    // =========================
    // SIGNATURE CHECK
    // =========================
    console.log('🔐 STEP 1: Signature check');

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    console.log('🧮 Expected:', expectedSignature);
    console.log('📩 Received:', razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
      console.log('❌ SIGNATURE MISMATCH');
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }

    console.log('✅ Signature verified');

    // =========================
    // VALIDATION
    // =========================
    console.log('📦 STEP 2: Validation');

    const missing = [];

    if (!customerName) missing.push('customerName');
    if (!phone) missing.push('phone');
    if (!location) missing.push('location');
    if (!product?.productId) missing.push('product.productId');
    if (!product?.name) missing.push('product.name');
    if (!product?.price) missing.push('product.price');
    if (!quantity) missing.push('quantity');
    if (!totalAmount) missing.push('totalAmount');

    if (missing.length > 0) {
      console.log('❌ Missing fields:', missing);

      return res.status(400).json({
        success: false,
        message: 'Missing required order fields',
        missingFields: missing,
      });
    }

    console.log('✅ All fields present');

    // =========================
    // DISTANCE CHECK
    // =========================
    console.log('📍 STEP 3: Distance check');

    const distance = getDistance(
      shopLocation.lat,
      shopLocation.lng,
      location.lat,
      location.lng,
    );

    console.log('📏 Distance from shop:', distance);

    if (distance > 2) {
      console.log('❌ OUT OF RANGE');
      return res.status(400).json({
        success: false,
        message: 'Delivery only within 2KM radius',
      });
    }

    console.log('✅ Within delivery range');

    // =========================
    // CREATE ORDER
    // =========================
    console.log('💾 STEP 4: Creating order');

    const userId = req.user.id;
    const newOrder = await Order.create({
      userId,
      customerName,
      phone,
      location,

      product: {
        productId: product.productId,
        name: product.name,
        image: product.image,
        price: product.price,
      },

      quantity,
      totalAmount,

      paymentMethod: 'Razorpay UPI',
      paymentStatus: 'Paid',
      isPaid: true,

      razorpay_order_id,
      razorpay_payment_id,

      // status: 'Pending Payment',
      status: 'Preparing',
      paidAt: new Date(),
    });

    console.log('🎉 ORDER CREATED:', newOrder._id);

    // =========================
    // SOCKET
    // =========================
    const io = req.app.get('io');

    if (io) {
      console.log('📡 Emitting socket event');
      io.emit('newOrder', newOrder);
    } else {
      console.log('⚠️ Socket not found');
    }

    console.log('==============================\n');

    return res.status(200).json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.log('\n🔥 CRASH ERROR:', error.message);
    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message,
    });
  }
};

// REAL RAZORPAY REFUND
exports.processRefund = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    // already refunded
    if (order.isRefunded) {
      return res.status(400).json({
        message: 'Already refunded',
      });
    }

    // payment id missing
    if (!order.razorpay_payment_id) {
      return res.status(400).json({
        message: 'No Razorpay payment found',
      });
    }

    // =========================
    // RAZORPAY REFUND
    // =========================
    const refund = await razorpay.payments.refund(order.razorpay_payment_id, {
      amount: order.totalAmount * 100,
    });

    // =========================
    // SAVE IN DB
    // =========================
    order.isRefunded = true;

    order.refundStatus = 'Refunded';

    order.refundAmount = order.totalAmount;

    order.refundMethod = 'Razorpay';

    order.refundId = refund.id;

    order.refundProcessedAt = new Date();

    const updatedOrder = await order.save();

    // SOCKET
    const io = req.app.get('io');

    io.emit('orderUpdated', updatedOrder);

    res.json({
      success: true,
      message: 'Refund processed successfully',
      refund,
      order: updatedOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
