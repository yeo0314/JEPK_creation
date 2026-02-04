import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { initEmailService } from './service/emailService';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ThemeCustomizer from './components/ThemeCustomizer';
import Home from './pages/Home';
import Products from './pages/products';
import ProductDetail from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [showCart, setShowCart] = useState(false);

  // Initialiser EmailJS au démarrage
  useEffect(() => {
    initEmailService();
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header onCartClick={() => setShowCart(true)} />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>

          <Footer />
          <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
          <ThemeCustomizer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;