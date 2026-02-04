import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, ShoppingBag, Loader, AlertCircle } from 'lucide-react';
import { initiatePayment } from '../service/paymentService';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    commune: '',
    paymentMethod: 'orange-money',
    paymentPhone: '', // Numéro pour le paiement mobile
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const shippingCost = 1000;
  const total = getCartTotal() + shippingCost;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Réinitialiser l'erreur quand l'utilisateur modifie un champ
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');

    try {
      // Générer un ID de commande unique
      const orderId = `CMD-${Date.now()}`;

      // Préparer les données de paiement
      const orderData = {
        orderId,
        amount: total,
        phone: formData.paymentPhone || formData.phone,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        deliveryAddress: `${formData.address}, ${formData.commune}, ${formData.city}`,
        cart: cart,
      };

      console.log('Traitement de la commande:', orderData);

      // Initier le paiement selon la méthode choisie
      const paymentResult = await initiatePayment(
        formData.paymentMethod,
        orderData
      );

      if (paymentResult.success) {
        // Importer les services nécessaires
        const { createOrder } = await import('../service/ordersService');
        const { sendOrderConfirmation, sendAdminNotification } = await import('../service/emailService');

        // Sauvegarder la commande dans Firebase
        const savedOrder = await createOrder({
          ...orderData,
          transactionId: paymentResult.transactionId,
          provider: paymentResult.provider,
          paymentMethod: formData.paymentMethod,
          status: 'pending',
        });

        // Envoyer les emails de confirmation
        try {
          await Promise.all([
            sendOrderConfirmation({
              ...orderData,
              transactionId: paymentResult.transactionId,
              paymentMethod: paymentResult.provider,
            }),
            sendAdminNotification(orderData),
          ]);
        } catch (emailError) {
          console.error('Erreur envoi emails:', emailError);
          // Ne pas bloquer la commande si les emails échouent
        }

        // Sauvegarder les détails de la commande
        setOrderDetails({
          orderId,
          transactionId: paymentResult.transactionId,
          provider: paymentResult.provider,
          amount: total,
          customerName: orderData.customerName,
        });

        // Commande réussie
        setOrderComplete(true);
        clearCart();

        // Si c'est Wave et qu'il y a une URL de paiement, rediriger
        if (paymentResult.paymentUrl && paymentResult.paymentUrl !== '#') {
          window.location.href = paymentResult.paymentUrl;
        }
      } else {
        throw new Error('Échec du paiement');
      }
    } catch (err) {
      console.error('Erreur lors du paiement:', err);
      setError(err.message || 'Une erreur est survenue lors du paiement');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 mb-8">
            Ajoutez des produits à votre panier pour continuer
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition"
          >
            Voir nos produits
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Commande confirmée ! 🎉
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Merci pour votre achat ! Vous recevrez un SMS de confirmation sous
            peu.
          </p>
          
          {orderDetails && (
            <div className="bg-white rounded-2xl p-8 mb-8 inline-block text-left shadow-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Numéro de commande</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {orderDetails.orderId}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600">Transaction ID</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {orderDetails.transactionId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Méthode de paiement</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {orderDetails.provider}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Montant</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {orderDetails.amount.toLocaleString()} FCFA
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition"
            >
              Retour à l'accueil
            </button>
            <button
              onClick={() => navigate('/products')}
              className="block w-full border-2 border-purple-300 text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition"
            >
              Continuer mes achats
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          Finaliser ma commande
        </h1>

        {/* Error Message */}
        {error && (
          <div className="max-w-3xl mx-auto mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">Erreur de paiement</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Informations personnelles
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom *"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nom *"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone *"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Adresse de livraison
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Adresse complète *"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="commune"
                      placeholder="Commune *"
                      required
                      value={formData.commune}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="Ville *"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Mode de paiement
                </h2>
                <div className="space-y-3 mb-6">
                  {[
                    { id: 'orange-money', name: 'Orange Money', icon: '📱', desc: 'Paiement via Orange Money' },
                    { id: 'mtn-money', name: 'MTN Mobile Money', icon: '💳', desc: 'Paiement via MTN MoMo' },
                    { id: 'wave', name: 'Wave', icon: '🌊', desc: 'Paiement via Wave' },
                    { id: 'cash', name: 'Paiement à la livraison', icon: '💵', desc: 'Payez en espèces' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition ${
                        formData.paymentMethod === method.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="mr-3 mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{method.icon}</span>
                          <div>
                            <span className="font-medium block">{method.name}</span>
                            <span className="text-sm text-gray-600">{method.desc}</span>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Phone number for mobile payment */}
                {['orange-money', 'mtn-money', 'wave'].includes(formData.paymentMethod) && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de téléphone pour le paiement *
                    </label>
                    <input
                      type="tel"
                      name="paymentPhone"
                      placeholder="Ex: 0707070707"
                      required
                      value={formData.paymentPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      {formData.paymentMethod === 'orange-money' && '📱 Numéros Orange: 07, 08, 09'}
                      {formData.paymentMethod === 'mtn-money' && '📱 Numéros MTN: 05, 06'}
                      {formData.paymentMethod === 'wave' && '🌊 Tous les numéros acceptés'}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  'Confirmer et payer'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ShoppingBag className="mr-2" />
                Récapitulatif
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Qté: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-purple-600 text-sm">
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Sous-total</span>
                  <span className="font-semibold">
                    {getCartTotal().toLocaleString()} FCFA
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Livraison</span>
                  <span className="font-semibold">
                    {shippingCost.toLocaleString()} FCFA
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-purple-600 pt-3 border-t">
                  <span>Total</span>
                  <span>{total.toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800 text-center font-medium">
                  🔒 Paiement 100% sécurisé
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;