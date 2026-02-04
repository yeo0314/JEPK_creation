import React from 'react';
import { Heart, Award, Users, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <img src="/logo.jpg" alt="Crochet Créations" className="w-24 h-24 mx-auto mb-6 rounded-full object-cover shadow-lg" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Notre Histoire
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Bienvenue chez Crochet Créations, où chaque pièce raconte une histoire 
            tissée avec passion, créativité et amour du fait-main.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl p-12 h-96 flex items-center justify-center">
                <img src="/logo.jpg" alt="Crochet Créations logo" className="w-48 h-48 object-cover rounded-full shadow-2xl" />
              </div>
              {/* Vous pouvez remplacer par une vraie image :
              <img 
                src="/images/about/artisan.jpg" 
                alt="Notre atelier"
                className="rounded-3xl shadow-2xl w-full h-96 object-cover"
              />
              */}
            </div>

            {/* Text */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Tout a commencé avec une passion...
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Notre aventure a débuté dans un petit atelier, avec simplement 
                  un crochet, quelques pelotes de laine colorées et un rêve : 
                  créer des pièces uniques qui apportent de la joie et de la 
                  chaleur dans votre quotidien.
                </p>
                <p>
                  Chaque création est le fruit d'heures de travail minutieux, 
                  d'attention aux détails et d'un amour sincère pour l'artisanat. 
                  Nous croyons que les objets faits main ont une âme, une énergie 
                  particulière que les produits de masse ne peuvent offrir.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers de partager notre passion avec 
                  vous et de contribuer à un monde plus authentique, où chaque 
                  objet a son histoire et sa personnalité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Nos Valeurs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="w-12 h-12" />,
                title: 'Fait avec Amour',
                description: 'Chaque pièce est créée avec passion et attention aux moindres détails.',
                color: 'from-pink-500 to-red-500',
              },
              {
                icon: <Award className="w-12 h-12" />,
                title: 'Qualité Premium',
                description: 'Nous utilisons uniquement des matériaux de haute qualité, soigneusement sélectionnés.',
                color: 'from-purple-500 to-indigo-500',
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: 'Communauté',
                description: 'Nous croyons en la force du collectif et soutenons les artisans locaux.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: <Sparkles className="w-12 h-12" />,
                title: 'Créativité',
                description: 'L\'innovation et l\'originalité sont au cœur de chacune de nos créations.',
                color: 'from-yellow-500 to-orange-500',
              },
            ].map((value, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl hover:shadow-xl transition transform hover:scale-105"
              >
                <div className={`text-white bg-gradient-to-r ${value.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Notre Processus de Création
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Inspiration',
                description: 'Nous puisons notre inspiration dans la nature, les tendances et vos souhaits pour créer des designs uniques.',
                emoji: '💡',
              },
              {
                step: '02',
                title: 'Création',
                description: 'Chaque pièce est crochetée à la main avec patience et précision, point par point.',
                emoji: '🧶',
              },
              {
                step: '03',
                title: 'Finition',
                description: 'Les dernières touches sont apportées avec soin pour garantir une qualité irréprochable.',
                emoji: '✨',
              },
            ].map((process, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition h-full">
                  <div className="text-6xl mb-4">{process.emoji}</div>
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
                    {process.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {process.description}
                  </p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-4xl text-purple-300">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Notre Équipe
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Des artisans passionnés dédiés à créer des pièces uniques pour vous
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'kouyo princia',
                role: 'Fondatrice & Artisan Principal',
                description: 'Passionnée de crochet depuis 10 ans',
                emoji: '👩‍🎨',
              },
              {
                name: 'kouyo Emmanuella',
                role: 'Designer Créative',
                description: 'Créatrice de nos modèles exclusifs',
                emoji: '🎨',
              },
              {
                name: 'Kouyo jennifer',
                role: 'Artisan Crochet',
                description: 'Experte en techniques traditionnelles',
                emoji: '🧶',
              },
            ].map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-6xl">
                  {member.emoji}
                  {/* Vous pouvez remplacer par une vraie photo :
                  <img 
                    src={`/images/team/${member.name}.jpg`}
                    alt={member.name}
                    className="rounded-full w-full h-full object-cover"
                  />
                  */}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Rejoignez Notre Aventure !
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Découvrez nos créations uniques et faites partie de notre communauté 
            de passionnés du fait-main.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition"
            >
              Voir la Collection
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition"
            >
              Nous Contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;