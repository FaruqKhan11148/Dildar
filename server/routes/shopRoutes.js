const express = require("express");

const router = express.Router();

const {
  getShops,
  createShop,
  getSingleShop,
} = require("../controllers/shopController");

router.get("/", getShops);

router.post("/", createShop);

router.get("/:id", getSingleShop);

module.exports = router;

