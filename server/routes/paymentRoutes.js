const express = require('express');

const router = express.Router();

const adminAuth = require('../middlewares/authMiddleware');

const {
  createOrder,
  verifyPayment,
  processRefund,
} = require('../controllers/paymentController');

// CREATE RAZORPAY ORDER
router.post('/create-order', createOrder);

// VERIFY PAYMENT
router.post('/verify-payment', verifyPayment);

// REAL REFUND
router.put('/refund/:id', adminAuth, processRefund);

module.exports = router;