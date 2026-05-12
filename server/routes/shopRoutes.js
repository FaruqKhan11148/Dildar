const express = require("express");

const router = express.Router();

const {
  getShops,
  createShop,
  getSingleShop,
} = require("../controllers/shopController");

/* =========================
   GET ALL SHOPS
========================= */
router.get("/", getShops);

/* =========================
   CREATE SHOP
========================= */
router.post("/", createShop);

/* =========================
   GET SINGLE SHOP
========================= */
router.get("/:id", getSingleShop);

module.exports = router;