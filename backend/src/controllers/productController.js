const Product = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Get single product
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ error: true, message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};
