import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart } from '../services/api';

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (id, newQty) => {
    if (newQty < 1) return;
    try {
      const updatedCart = await updateCartItem(id, newQty);
      setCart(updatedCart);
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      const updatedCart = await removeFromCart(id);
      setCart(updatedCart);
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        {cart.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link to="/" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-green-600 font-bold text-xl mb-2">
                        ₹ {item.price.toFixed(2)}
                      </p>
                      <p className="text-gray-600">
                        Subtotal: ₹ {(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.qty - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold">{item.qty}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.qty + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-500 hover:text-red-700 text-2xl"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({cart.items.length}):</span>
                    <span className="font-semibold">₹ {cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">₹ {cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-primary mb-3"
                >
                  Proceed to Checkout
                </button>
                
                <Link to="/" className="block text-center text-primary hover:text-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
