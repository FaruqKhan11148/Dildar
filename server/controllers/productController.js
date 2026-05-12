const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('shop')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLatestProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(6);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductsByShop = async (req, res) => {
  try {
    const products = await Product.find({
      shop: req.params.shopId,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Product deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.q;

    const products = await Product.find({
      name: {
        $regex: keyword || '',
        $options: 'i',
      },
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductsByShop,
  updateProduct,
  deleteProduct,
  getLatestProducts,
  getProductsByCategory,
  searchProducts,
};
