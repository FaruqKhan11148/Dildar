const express = require('express');
const router = express.Router();

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

// =====================
// ORDERS (ADMIN)
// =====================
router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);

// =====================
// PRODUCTS (ADMIN)
// =====================
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
