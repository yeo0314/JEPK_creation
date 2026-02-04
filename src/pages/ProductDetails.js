import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, ChevronLeft, Check, Package, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/Products.js';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === parseInt(id));
  
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants ? product.variants[0] : null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😔</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition"
          >
            Retour à la boutique
          </button>
        </div>
      </div>
    );
  }

  const getImages = () => {
    if (selectedVariant && selectedVariant.images) {
      return selectedVariant.images;
    }
    if (product.images) {
      return product.images;
    }
    return [];
  };

  const images = getImages();
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
  const currentPrice = product.price + (selectedVariant?.priceAdjustment || 0);

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedColor: selectedVariant?.color || 'Standard',
      selectedColorHex: selectedVariant?.colorHex,
      price: currentPrice,
      stock: currentStock,
      selectedImage: images[selectedImageIndex] || product.emoji,
      quantity: quantity,
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    
    // Animation de confirmation
    alert(`${quantity} ${product.name} ajouté(s) au panier !`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center text-purple-600 hover:text-purple-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour à la boutique
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Galerie d'images */}
          <div>
            {/* Image principale */}
            <div className="bg-white rounded-2xl p-4 mb-4 shadow-xl">
              <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-xl overflow-hidden relative">
                {images.length > 0 && images[selectedImageIndex] ? (
                  <img
                    src={images[selectedImageIndex]}
                    alt={`${product.name} - ${selectedVariant?.color || ''}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="absolute inset-0 flex items-center justify-center text-9xl"
                  style={{ 
                    display: images.length > 0 && images[selectedImageIndex] ? 'none' : 'flex' 
                  }}
                >
                  {product.emoji}
                </div>
              </div>
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition ${
                      selectedImageIndex === idx
                        ? 'border-purple-500 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Vue ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations produit */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              {/* Titre et prix */}
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold text-purple-600">
                  {currentPrice.toLocaleString()}
                </span>
                <span className="text-xl text-gray-500 ml-2">FCFA</span>
              </div>

              {/* Stock */}
              <div className="mb-6">
                {currentStock > 0 ? (
                  <div className="flex items-center text-green-600">
                    <Check className="w-5 h-5 mr-2" />
                    <span className="font-medium">
                      En stock ({currentStock} disponible{currentStock > 1 ? 's' : ''})
                    </span>
                  </div>
                ) : (
                  <div className="text-red-600 font-medium">
                    Rupture de stock
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6 pb-6 border-b">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Sélecteur de couleurs */}
              {product.variants && product.variants.length > 1 && (
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Couleur: <span className="text-purple-600">{selectedVariant.color}</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedVariant(variant);
                          setSelectedImageIndex(0);
                        }}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg border-2 transition ${
                          selectedVariant.color === variant.color
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                        <div className="text-left">
                          <p className="font-medium text-gray-800">{variant.color}</p>
                          <p className="text-xs text-gray-500">
                            {variant.stock > 0 ? `${variant.stock} en stock` : 'Épuisé'}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantité */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Quantité</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-xl transition"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-800 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                    disabled={quantity >= currentStock}
                    className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={currentStock === 0}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  Ajouter au panier
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition">
                    <Heart className="w-5 h-5" />
                    <span>Favoris</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition">
                    <Share2 className="w-5 h-5" />
                    <span>Partager</span>
                  </button>
                </div>
              </div>

              {/* Avantages */}
              <div className="space-y-3 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Package className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">Fait main avec amour</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">Livraison 3-7 jours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">Retour sous 7 jours</span>
                </div>
              </div>
            </div>

            {/* Détails supplémentaires */}
            <div className="bg-white rounded-2xl p-8 shadow-xl mt-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Détails du produit
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Catégorie</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Matériau</span>
                  <span>Coton 100%</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Fait main</span>
                  <span>Oui, en Côte d'Ivoire</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Entretien</span>
                  <span>Lavage à la main</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Vous aimerez aussi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition text-left"
                >
                  <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg mb-3 overflow-hidden">
                    {p.images && p.images[0] ? (
                      <img 
                        src={p.images[0]} 
                        alt={p.name}
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">
                        {p.emoji}
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">{p.name}</h4>
                  <p className="text-purple-600 font-bold">{p.price.toLocaleString()} FCFA</p>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;