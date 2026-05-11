const express = require('express');

const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductsByShop,
  updateProduct,
  deleteProduct,
  getLatestProducts,
  getProductsByCategory,
  searchProducts,
} = require('../controllers/productController');

router.get('/', getProducts);

router.get('/shop/:shopId', getProductsByShop);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

router.get('/latest', getLatestProducts);

router.get('/category/:category', getProductsByCategory);

router.get('/search', searchProducts);

module.exports = router;
