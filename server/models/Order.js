const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    // SINGLE PRODUCT
    product: {
      productId: {
        type: mongoose.Schema.Types.ObjectId,

        ref: 'Product',
      },

      name: {
        type: String,
        required: true,
      },

      image: {
        type: String,
      },

      price: {
        type: Number,
        required: true,
      },
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,

      enum: [
        'Pending Payment',

        'Preparing',

        'On The Way',

        'Delivered',

        'Cancelled',
      ],

      default: 'Pending Payment',
    },

    paymentMethod: {
      type: String,

      default: 'PhonePe QR',
    },

    paymentScreenshot: {
      type: String,
    },

    isPaid: {
      type: Boolean,

      default: false,
    },

    paymentVerified: {
      type: Boolean,

      default: false,
    },

    paidAt: {
      type: Date,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Order', orderSchema);
