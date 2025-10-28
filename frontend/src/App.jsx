import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 Nexora. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
