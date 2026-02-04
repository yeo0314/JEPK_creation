import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { sendContactEmail } from '../service/emailService';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Envoyer l'email via EmailJS
      await sendContactEmail(formData);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Erreur envoi message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">💬</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Une question ? Un projet personnalisé ? Nous sommes là pour vous aider !
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <Phone className="w-8 h-8" />,
                title: 'Téléphone',
                info: '+225 07 XX XX XX XX',
                subinfo: 'Lun - Sam : 9h - 18h',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: 'Email',
                info: 'contact@crochetcreations.com',
                subinfo: 'Réponse sous 24h',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: 'Adresse',
                info: 'Abidjan, Cocody',
                subinfo: 'Côte d\'Ivoire',
                color: 'from-pink-500 to-red-500',
              },
            ].map((contact, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center text-white mb-4 mx-auto`}>
                  {contact.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
                  {contact.title}
                </h3>
                <p className="text-purple-600 font-semibold text-center">
                  {contact.info}
                </p>
                <p className="text-sm text-gray-600 text-center mt-1">
                  {contact.subinfo}
                </p>
              </div>
            ))}
          </div>

          {/* Main Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Envoyez-nous un message
              </h2>
              <p className="text-gray-600 mb-8">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>

              {submitStatus === 'success' && (
                <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800">Message envoyé avec succès !</p>
                    <p className="text-green-600 text-sm">Nous vous répondrons dans les 24 heures.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <p className="text-red-800">Une erreur est survenue. Veuillez réessayer.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                    placeholder="Votre nom"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                      placeholder="+225 XX XX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                  >
                    <option value="">Choisissez un sujet</option>
                    <option value="commande">Question sur une commande</option>
                    <option value="personnalisation">Commande personnalisée</option>
                    <option value="produit">Question sur un produit</option>
                    <option value="collaboration">Collaboration / Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition resize-none"
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              {/* FAQ rapide */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Questions Fréquentes
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      q: 'Quel est le délai de livraison ?',
                      a: '3 à 7 jours ouvrés à Abidjan, 7 à 14 jours pour le reste de la Côte d\'Ivoire.',
                    },
                    {
                      q: 'Faites-vous des créations personnalisées ?',
                      a: 'Absolument ! Contactez-nous pour discuter de votre projet unique.',
                    },
                    {
                      q: 'Quels sont vos modes de paiement ?',
                      a: 'Wave, Orange Money, MTN Mobile Money et paiement à la livraison.',
                    },
                    {
                      q: 'Puis-je retourner un produit ?',
                      a: 'Oui, retours acceptés sous 7 jours si le produit est non utilisé.',
                    },
                  ].map((faq, idx) => (
                    <div key={idx} className="pb-4 border-b border-gray-200 last:border-0">
                      <p className="font-semibold text-gray-800 mb-2">
                        {faq.q}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-center mb-4">
                  <Clock className="w-8 h-8 mr-3" />
                  <h3 className="text-2xl font-bold">
                    Horaires d'ouverture
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-semibold">9h - 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="font-semibold">10h - 16h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="font-semibold">Fermé</span>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Suivez-nous
                </h3>
                <div className="space-y-4">
                  <a
                    href="#"
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg hover:shadow-md transition group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Instagram</p>
                      <p className="text-sm text-gray-600">@crochetcreations</p>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:shadow-md transition group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                      <Facebook className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Facebook</p>
                      <p className="text-sm text-gray-600">Crochet Créations CI</p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/225XXXXXXXX"
                    className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">WhatsApp</p>
                      <p className="text-sm text-gray-600">Chat direct</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;