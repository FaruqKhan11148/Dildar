const express = require('express');

const router = express.Router();

const {
  getProducts,

  createProduct,

  updateProduct,

  deleteProduct,

  getLatestProducts,

  getProductsByCategory,

  searchProducts,
} = require('../controllers/productController');

/* GET ALL PRODUCTS */
router.get('/', getProducts);

/* SEARCH PRODUCTS */
router.get('/search', searchProducts);

/* LATEST PRODUCTS */
router.get('/latest', getLatestProducts);

/* PRODUCTS BY CATEGORY */
router.get('/category/:category', getProductsByCategory);

/* CREATE PRODUCT */
router.post('/', createProduct);

/* UPDATE PRODUCT */
router.put('/:id', updateProduct);

/* DELETE PRODUCT */
router.delete('/:id', deleteProduct);

module.exports = router;
