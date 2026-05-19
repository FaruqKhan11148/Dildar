const express = require('express');

const router = express.Router();

const {
  createOrder,
  verifyPayment,
} = require('../controllers/paymentController');

// CREATE RAZORPAY ORDER
router.post('/create-order', createOrder);

// VERIFY PAYMENT
router.post('/verify-payment', verifyPayment);

module.exports = router;
