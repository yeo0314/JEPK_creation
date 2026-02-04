import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.js';
import { initEmailService } from './service/emailService.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Cart from './components/Cart.js';
import ThemeCustomizer from './components/ThemeCustomizer.js';
import Home from './pages/Home.js';
import Products from './pages/products.js';
import ProductDetail from './pages/ProductDetails.js';
import Checkout from './pages/Checkout.js';
import About from './pages/About.js';
import Contact from './pages/contact.js';
import AdminLogin from './pages/AdminLogin.js';
import AdminDashboard from './pages/AdminDashboard.js';
import ProtectedRoute from './components/ProtectedRoute.js';

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