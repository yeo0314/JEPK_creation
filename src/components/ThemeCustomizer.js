import React, { useState, useEffect } from 'react';
import { Palette, Save, RotateCcw } from 'lucide-react';

const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState({
    primaryColor: '#ec4899',
    secondaryColor: '#9333ea',
    accentColor: '#3b82f6',
    backgroundColor: '#fdf4ff',
    textColor: '#1f2937',
  });

  // Charger le thème sauvegardé
  useEffect(() => {
    const savedTheme = localStorage.getItem('crochet-theme');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  // Appliquer le thème
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', theme.primaryColor);
    document.documentElement.style.setProperty('--color-secondary', theme.secondaryColor);
    document.documentElement.style.setProperty('--color-accent', theme.accentColor);
    document.documentElement.style.setProperty('--color-bg', theme.backgroundColor);
    document.documentElement.style.setProperty('--color-text', theme.textColor);
  }, [theme]);

  const handleColorChange = (key, value) => {
    setTheme(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveTheme = () => {
    localStorage.setItem('crochet-theme', JSON.stringify(theme));
    alert('Thème sauvegardé avec succès ! 🎨');
  };

  const resetTheme = () => {
    const defaultTheme = {
      primaryColor: '#ec4899',
      secondaryColor: '#9333ea',
      accentColor: '#3b82f6',
      backgroundColor: '#fdf4ff',
      textColor: '#1f2937',
    };
    setTheme(defaultTheme);
    localStorage.removeItem('crochet-theme');
    alert('Thème réinitialisé ! ✨');
  };

  const presets = [
    {
      name: 'Rose & Violet (défaut)',
      colors: {
        primaryColor: '#ec4899',
        secondaryColor: '#9333ea',
        accentColor: '#3b82f6',
        backgroundColor: '#fdf4ff',
        textColor: '#1f2937',
      },
    },
    {
      name: 'Menthe Fraîche',
      colors: {
        primaryColor: '#10b981',
        secondaryColor: '#06b6d4',
        accentColor: '#8b5cf6',
        backgroundColor: '#ecfdf5',
        textColor: '#1f2937',
      },
    },
    {
      name: 'Coucher de Soleil',
      colors: {
        primaryColor: '#f59e0b',
        secondaryColor: '#ef4444',
        accentColor: '#ec4899',
        backgroundColor: '#fff7ed',
        textColor: '#1f2937',
      },
    },
    {
      name: 'Océan Profond',
      colors: {
        primaryColor: '#0ea5e9',
        secondaryColor: '#6366f1',
        accentColor: '#8b5cf6',
        backgroundColor: '#f0f9ff',
        textColor: '#1f2937',
      },
    },
  ];

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition z-40"
        title="Personnaliser le thème"
      >
        <Palette className="w-6 h-6" />
      </button>

      {/* Panel de personnalisation */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h3 className="text-2xl font-bold text-gray-800">
                  🎨 Personnalisation
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Presets */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-800 mb-4">Thèmes prédéfinis</h4>
                <div className="grid grid-cols-2 gap-3">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTheme(preset.colors)}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-purple-500 transition text-left"
                    >
                      <div className="flex space-x-1 mb-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.colors.primaryColor }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.colors.secondaryColor }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: preset.colors.accentColor }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-800">{preset.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom colors */}
              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-gray-800">Couleurs personnalisées</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur principale
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                    />
                    <input
                      type="text"
                      value={theme.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur secondaire
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                    />
                    <input
                      type="text"
                      value={theme.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur d'accent
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                    />
                    <input
                      type="text"
                      value={theme.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur de fond
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.backgroundColor}
                      onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                    />
                    <input
                      type="text"
                      value={theme.backgroundColor}
                      onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                      className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-800 mb-4">Aperçu</h4>
                <div
                  className="p-6 rounded-lg border-2"
                  style={{
                    background: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor})`,
                  }}
                >
                  <p className="text-white font-bold text-xl mb-2">Crochet Créations</p>
                  <p className="text-white opacity-90">Votre boutique personnalisée</p>
                  <button
                    className="mt-4 px-6 py-2 bg-white rounded-full font-semibold"
                    style={{ color: theme.primaryColor }}
                  >
                    Exemple de bouton
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={saveTheme}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Sauvegarder le thème
                </button>
                <button
                  onClick={resetTheme}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ThemeCustomizer;