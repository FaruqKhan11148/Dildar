const asyncHandler = require('../utils/asyncHandler');

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.json(products);
});
