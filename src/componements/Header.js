import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = ({ onCartClick }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { getCartCount } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.jpg" alt="JEPK_Créations" aria-label="JEPK_Créations logo" className="w-20 h-20 rounded-full object-cover ring-4 ring-pink-400 ring-opacity-90 shadow-2xl bg-white p-1 transform transition-transform hover:scale-105" />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Boutique
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-purple-100 rounded-full transition"
            >
              <ShoppingCart className="w-6 h-6 text-purple-600" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2"
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMobileMenu(false)}
              className="block text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenu(false)}
              className="block text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Boutique
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenu(false)}
              className="block text-gray-700 hover:text-purple-600 transition font-medium"
            >
              À propos
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenu(false)}
              className="block text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;