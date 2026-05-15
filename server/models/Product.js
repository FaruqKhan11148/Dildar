const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    image: {
      type: String,

      default:
        'https://assets.tendercuts.in/product/C/H/594e4559-f6b7-417d-9aac-d0643b5711d3.jpg',
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      trim: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    unit: {
      type: String,

      default: 'kg',
    },

    isAvailable: {
      type: Boolean,

      default: true,
    },
  },

  {
    timestamps: true,
  },
);


module.exports = mongoose.model('Product', productSchema);
