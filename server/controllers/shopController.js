const Shop = require('../models/Shop');

const getShops = async (req, res) => {
  try {
    const shops = await Shop.find();

    res.json(shops);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createShop = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);

    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getSingleShop = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({
        message: 'Shop not found',
      });
    }

    res.json(shop);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getShops,
  createShop,
  getSingleShop,
};
