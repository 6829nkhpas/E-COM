import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16 mb-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Nexora</h1>
          <p className="text-xl">Discover Amazing Products</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">WOMEN'S WEAR</h2>
          <div className="w-16 h-1 bg-primary"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No products available</p>
          </div>
        )}
      </div>

      {/* Additional Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">MEN'S WEAR</h2>
          <div className="w-16 h-1 bg-primary"></div>
        </div>
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-500">More products coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
