const Receipt = require('../models/Receipt');
const CartItem = require('../models/CartItem');

exports.checkout = async (req, res, next) => {
  try {
    const { cartItems, name, email } = req.body;
    const userId = req.body.userId || 'demo-user';
    
    if (!name || !email || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ 
        error: true, 
        message: 'Name, email, and cart items are required' 
      });
    }
    
    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // Create receipt
    const receipt = await Receipt.create({
      items: cartItems,
      total: parseFloat(total.toFixed(2)),
      name,
      email,
      timestamp: new Date()
    });
    
    // Clear cart after checkout
    await CartItem.deleteMany({ userId });
    
    res.json({
      receiptId: receipt._id,
      total: receipt.total,
      timestamp: receipt.timestamp,
      items: receipt.items,
      name: receipt.name,
      email: receipt.email
    });
  } catch (err) {
    next(err);
  }
};
