const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  userId: {
    type: String,
    default: 'demo-user'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CartItem', cartItemSchema);
