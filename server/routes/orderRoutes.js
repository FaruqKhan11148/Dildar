const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/userAuth');

console.log('Order routes loaded');
const {
  getOrders,
  createOrder,
  getSingleOrder,
  updateOrderStatus,
  getUserOrders,
  getOrderById,
} = require('../controllers/orderController');

// PUBLIC / ADMIN
router.get('/', getOrders);

// USER AUTH ROUTES
router.post('/', userAuth, createOrder);
router.get('/my', userAuth, getUserOrders);

// 🔥 IMPORTANT: put this BEFORE /:id
router.get('/me/:id', userAuth, getOrderById);

// fallback single order
router.get('/:id', getSingleOrder);

router.put('/:id/status', updateOrderStatus);

module.exports = router;
