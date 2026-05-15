const express = require('express');

const router = express.Router();

const {
  getOrders,

  createOrder,

  updateOrderStatus,

  getSingleOrder,
} = require('../controllers/orderController');

/* GET ALL ORDERS */
router.get('/', getOrders);

/* CREATE ORDER */
router.post('/', createOrder);

/* GET SINGLE ORDER */
router.get('/:id', getSingleOrder);

/* UPDATE STATUS */
router.put('/:id/status', updateOrderStatus);

module.exports = router;
