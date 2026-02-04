import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto z-50 transform transition-transform duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h3 className="text-2xl font-bold text-gray-800">Mon Panier</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Empty State */}
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg mb-4">Votre panier est vide</p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="text-4xl flex-shrink-0">{item.image}</div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 mb-1 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.color}
                      </p>
                      <p className="text-purple-600 font-bold">
                        {item.price.toLocaleString()} FCFA
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2 bg-white rounded-full shadow-sm">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
                        >
                          -
                        </button>
                        <span className="font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total and Checkout */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">
                    Sous-total:
                  </span>
                  <span className="text-2xl font-bold text-purple-600">
                    {getCartTotal().toLocaleString()} FCFA
                  </span>
                </div>

                <p className="text-sm text-gray-500 text-center">
                  Livraison calculée à l'étape suivante
                </p>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition"
                >
                  Procéder au paiement
                </button>

                <button
                  onClick={onClose}
                  className="w-full border-2 border-purple-300 text-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-50 transition"
                >
                  Continuer mes achats
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;