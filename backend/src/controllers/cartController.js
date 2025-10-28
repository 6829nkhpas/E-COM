const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// Get cart
exports.getCart = async (req, res, next) => {
  try {
    const userId = req.query.userId || 'demo-user';
    const cartItems = await CartItem.find({ userId });
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    res.json({
      items: cartItems,
      total: parseFloat(total.toFixed(2))
    });
  } catch (err) {
    next(err);
  }
};

// Add to cart
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.body.userId || 'demo-user';
    
    if (!productId || !qty || qty < 1) {
      return res.status(400).json({ error: true, message: 'Invalid request body' });
    }
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: true, message: 'Product not found' });
    }
    
    // Check if item already in cart
    const existingItem = await CartItem.findOne({ productId, userId });
    
    if (existingItem) {
      existingItem.qty += qty;
      await existingItem.save();
    } else {
      await CartItem.create({
        productId,
        name: product.name,
        price: product.price,
        qty,
        userId
      });
    }
    
    // Return updated cart
    const cartItems = await CartItem.find({ userId });
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    res.json({
      items: cartItems,
      total: parseFloat(total.toFixed(2))
    });
  } catch (err) {
    next(err);
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    const userId = req.body.userId || 'demo-user';
    
    if (!qty || qty < 1) {
      return res.status(400).json({ error: true, message: 'Quantity must be at least 1' });
    }
    
    const cartItem = await CartItem.findById(id);
    if (!cartItem) {
      return res.status(404).json({ error: true, message: 'Cart item not found' });
    }
    
    cartItem.qty = qty;
    await cartItem.save();
    
    // Return updated cart
    const cartItems = await CartItem.find({ userId });
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    res.json({
      items: cartItems,
      total: parseFloat(total.toFixed(2))
    });
  } catch (err) {
    next(err);
  }
};

// Remove from cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId || 'demo-user';
    
    const cartItem = await CartItem.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({ error: true, message: 'Cart item not found' });
    }
    
    // Return updated cart
    const cartItems = await CartItem.find({ userId });
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    res.json({
      items: cartItems,
      total: parseFloat(total.toFixed(2))
    });
  } catch (err) {
    next(err);
  }
};
