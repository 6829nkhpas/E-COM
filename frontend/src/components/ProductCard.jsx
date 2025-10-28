import { addToCart } from '../services/api';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product._id, 1);
      window.dispatchEvent(new Event('cartUpdated'));
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          AVAILABLE
        </span>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-green-600 font-bold text-xl mb-3">
          ₹ {product.price.toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
