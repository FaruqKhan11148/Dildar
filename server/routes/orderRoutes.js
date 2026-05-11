const express = require('express');

const router = express.Router();

const {
  getOrders,
  createOrder,
  getOrdersByShop,
  updateOrderStatus
} = require('../controllers/orderController');

router.get('/', getOrders);

router.post('/', createOrder);

router.get('/shop/:shopId', getOrdersByShop);

router.put("/:id/status", updateOrderStatus);

module.exports = router;
