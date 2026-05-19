const express = require('express');
const router = express.Router();

const adminAuth = require('../middlewares/authMiddleware');
const { adminLogin } = require('../controllers/authController');

console.log("🔥 ADMIN ROUTES LOADED");

const {
  getOrders,
  updateOrderStatus,
} = require('../controllers/orderController');

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.post('/login', adminLogin);

// =====================
// ORDERS (ADMIN)
// =====================
router.get('/orders', adminAuth, getOrders);
router.put('/orders/:id/status', adminAuth, updateOrderStatus);


// =====================
// PRODUCTS (ADMIN)
// =====================
router.get('/products', adminAuth, getProducts);
router.post('/products', adminAuth, createProduct);
router.put('/products/:id', adminAuth, updateProduct);
router.delete('/products', adminAuth, deleteProduct);

module.exports = router;