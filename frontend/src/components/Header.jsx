import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCart } from '../services/api';

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const cart = await getCart();
      const count = cart.items.reduce((sum, item) => sum + item.qty, 0);
      setCartCount(count);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // Listen for custom cart update events
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-primary w-8 h-8 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">nexora</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-md hover:bg-secondary transition-colors">
                🔍
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="relative">
              <span className="text-2xl">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <button className="relative">
              <span className="text-2xl">❤️</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            <Link to="/cart" className="relative">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="text-2xl">
              👤
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 border-t pt-4">
          <ul className="flex flex-wrap items-center justify-center space-x-8 text-sm font-medium">
            <li><Link to="/" className="hover:text-primary transition-colors">MEN</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">WOMEN</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">ACCESSORIES</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">BEAUTY & SKINCARE</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">FOOTWEAR</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">HOME ESSENTIALS</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">BLOGS</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
