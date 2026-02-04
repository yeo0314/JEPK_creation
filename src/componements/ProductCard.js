import React, { useState } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  // État pour la variante sélectionnée
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[0] : null
  );
  
  // État pour l'image actuelle dans la galerie
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Obtenir les images à afficher
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
  const hasMultipleImages = images.length > 1;

  // Navigation dans la galerie
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Obtenir le stock et le prix en fonction de la variante
  const getCurrentStock = () => {
    return selectedVariant ? selectedVariant.stock : product.stock;
  };

  const getCurrentPrice = () => {
    const basePrice = product.price;
    const adjustment = selectedVariant?.priceAdjustment || 0;
    return basePrice + adjustment;
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedColor: selectedVariant?.color || product.color,
      selectedColorHex: selectedVariant?.colorHex,
      price: getCurrentPrice(),
      stock: getCurrentStock(),
      selectedImage: images[currentImageIndex] || product.emoji,
    };
    
    addToCart(productToAdd);
    
    // Animation de feedback
    const button = document.getElementById(`btn-${product.id}`);
    if (button) {
      button.classList.add('scale-90');
      setTimeout(() => button.classList.remove('scale-90'), 200);
    }
  };

  const currentStock = getCurrentStock();
  const currentPrice = getCurrentPrice();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 group">
      {/* Image Section with Gallery */}
      <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200 relative overflow-hidden group">
        {/* Image principale ou emoji */}
        {images.length > 0 && images[currentImageIndex] ? (
          <img 
            src={images[currentImageIndex]}
            alt={`${product.name} - ${selectedVariant?.color || ''}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        {/* Emoji de secours */}
        <div 
          className="absolute inset-0 flex items-center justify-center text-7xl"
          style={{ 
            display: images.length > 0 && images[currentImageIndex] ? 'none' : 'flex' 
          }}
        >
          {product.emoji}
        </div>

        {/* Navigation de la galerie */}
        {hasMultipleImages && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>

            {/* Indicateurs de position */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition ${
                    idx === currentImageIndex
                      ? 'bg-white w-4'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges de stock */}
        {currentStock < 5 && currentStock > 0 && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Plus que {currentStock}!
          </span>
        )}
        {currentStock === 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            Épuisé
          </span>
        )}
      </div>

      {/* Info Section */}
      <div className="p-5">
        <h4 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
          {product.name}
        </h4>
        
        {/* Sélecteur de couleurs */}
        {product.variants && product.variants.length > 1 && (
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-2">
              Couleur: <span className="font-semibold">{selectedVariant.color}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setCurrentImageIndex(0); // Reset à la première image
                  }}
                  className={`relative group/color transition ${
                    selectedVariant.color === variant.color
                      ? 'ring-2 ring-purple-500 ring-offset-2'
                      : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
                  }`}
                  title={variant.color}
                >
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: variant.colorHex }}
                  />
                  {selectedVariant.color === variant.color && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full border border-gray-300" />
                    </div>
                  )}
                  
                  {/* Tooltip au survol */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition whitespace-nowrap pointer-events-none">
                    {variant.color}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description courte */}
        <p className="text-sm text-gray-500 mb-3 line-clamp-2 h-10">
          {product.description}
        </p>

        {/* Prix et CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-purple-600">
              {currentPrice.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 ml-1">FCFA</span>
          </div>
          <button
            id={`btn-${product.id}`}
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className={`p-2 rounded-full transition transform ${
              currentStock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg hover:scale-110'
            } text-white`}
            title={currentStock === 0 ? 'Produit épuisé' : 'Ajouter au panier'}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;