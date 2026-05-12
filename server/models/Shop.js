const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    whatsappNumber: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default:
        "https://via.placeholder.com/300",
    },

    latitude: {
      type: Number,
    },

    longitude: {
      type: Number,
    },

    deliveryRadius: {
      type: Number,
      default: 3,
    },

    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Shop",
  shopSchema
);