const express = require("express");

const router = express.Router();

const {
  getOrders,
  createOrder,
  getOrdersByShop,
  updateOrderStatus,
  getSingleOrder,
} = require("../controllers/orderController");

/* GET ALL */
router.get("/", getOrders);

/* CREATE */
router.post("/", createOrder);

/* GET BY SHOP */
router.get("/shop/:shopId", getOrdersByShop);

/* GET SINGLE */
router.get("/:id", getSingleOrder);

/* UPDATE STATUS */
router.put("/:id/status", updateOrderStatus);

module.exports = router;