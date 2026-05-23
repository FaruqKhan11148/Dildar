const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerName: String,

    phone: String,

    address: String,

    location: {
      lat: Number,
      lng: Number,
    },

    product: {
      productId: String,
      name: String,
      image: String,
      price: Number,
    },

    quantity: Number,
    totalAmount: Number,

    paymentMethod: String,
    paymentStatus: String,

    paymentVerified: Boolean,
    isPaid: Boolean,

    razorpay_order_id: String,
    razorpay_payment_id: String,

    status: {
      type: String,
      default: 'Pending Payment',
    },

    paidAt: Date,
    cancelledAt: Date,
    deliveredAt: Date,

    // =========================
    // REFUND
    // =========================
    refundStatus: {
      type: String,
      default: 'Not Refunded',
    },

    refundAmount: {
      type: Number,
      default: 0,
    },

    refundMethod: {
      type: String,
      default: '',
    },

    isRefunded: {
      type: Boolean,
      default: false,
    },

    refundId: {
      type: String,
      default: '',
    },

    refundProcessedAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);