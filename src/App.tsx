import React, { useState } from 'react';
import { Heart, Flower, Instagram } from 'lucide-react';
import PhotoGallery from './components/PhotoGallery';

function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `scale(${0.5 + Math.random() * 0.5})`,
          }}
        >
          {Math.random() > 0.5 ? (
            <Heart className="text-pink-400 w-6 h-6" />
          ) : (
            <Flower className="text-red-400 w-6 h-6" />
          )}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [showGallery, setShowGallery] = useState(false);
  const [bgColor, setBgColor] = useState('bg-rose-100');
  const colors = ['bg-rose-100', 'bg-purple-100', 'bg-pink-100', 'bg-red-100'];

  const changeColor = () => {
    const currentIndex = colors.indexOf(bgColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    setBgColor(colors[nextIndex]);
  };

  if (showGallery) {
    return <PhotoGallery onBack={() => setShowGallery(false)} />;
  }

  return (
    <div 
      className={`min-h-screen ${bgColor} transition-colors duration-500 relative`}
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-sm"></div>
      <FloatingElements />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-rose-600 mb-8 animate-pulse drop-shadow-lg">
            Welcome to Our Love Story
            <span className="ml-2">Rafi ❤️ ****</span>
          </h1>
          
          <div className="space-y-6">
            <button
              onClick={changeColor}
              className="bg-white/80 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-rose-600 font-semibold text-lg mx-2 hover:bg-white backdrop-blur-sm"
            >
              Change Theme Color
            </button>
            
            <button
              onClick={() => setShowGallery(true)}
              className="bg-rose-600/90 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-white font-semibold text-lg mx-2 hover:bg-rose-700 backdrop-blur-sm"
            >
              Explore Our Love Story
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-rose-200/30">
            <p className="text-rose-600 font-semibold mb-4">Connect with us on Instagram</p>
            <div className="flex justify-center space-x-8">
              <a
                href="https://instagram.com/rafi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>@rafi</span>
              </a>
              <a
                href="https://instagram.com/****"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>@****</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;