import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Truck, Shield, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/Products.js';

const Home = () => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight flex items-center justify-center gap-6">
            <span>Fait main avec amour 💜</span>
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez des créations uniques au crochet, faites avec passion pour
            rendre votre quotidien plus coloré et cozy !
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition"
          >
            Découvrir la collection
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Fait main',
                desc: 'Chaque pièce unique',
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Qualité premium',
                desc: 'Matériaux soigneusement sélectionnés',
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: 'Livraison rapide',
                desc: 'Partout en Côte d\'Ivoire',
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: 'Satisfait ou remboursé',
                desc: 'Garantie 30 jours',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition"
              >
                <div className="text-purple-600 flex justify-center mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nos Coups de Cœur ✨
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de créations favorites, choisies avec soin
              pour vous
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-block border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition"
            >
              Voir toute la collection
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Ce qu'ils disent de nous 💬
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah K.',
                text: 'Les peluches sont adorables et super bien faites ! Ma fille adore son petit lapin 😍',
                rating: 5,
              },
              {
                name: 'Thomas M.',
                text: 'Qualité incroyable, je recommande à 100%. Les couleurs sont magnifiques !',
                rating: 5,
              },
              {
                name: 'Léa D.',
                text: 'Des créations uniques et originales, parfait pour les cadeaux. Service client au top !',
                rating: 5,
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl hover:shadow-lg transition"
              >
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic leading-relaxed">
                  "{review.text}"
                </p>
                <p className="font-semibold text-purple-600">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Envie d'une création personnalisée ?
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Contactez-nous pour réaliser la pièce de vos rêves !
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition"
          >
            Nous contacter
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;