import React, { useState } from 'react';
import { Heart, Flower, Instagram } from 'lucide-react';
import PhotoGallery from './components/PhotoGallery';

export const Credit = () => (
<div className="absolute top-4 right-6 z-50 animate-fadeIn">
    <span className="font-montserrat bg-gradient-to-r from-pink-200 via-pink-300 to-rose-200 text-transparent bg-clip-text text-lg font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] whitespace-nowrap">
    Created by Rafi
    </span>
</div>
);

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

  if (showGallery) {
    return <PhotoGallery onBack={() => setShowGallery(false)} />;
  }

return (
<div 
className="min-h-screen relative flex items-center justify-center overflow-hidden"
    style={{
        backgroundImage: 'url("/assets/images/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        transition: 'all 0.5s ease-in-out'
    }}
    >
    <Credit />
    <div 
        className="absolute inset-0 bg-gradient-to-br from-rose-500/30 via-pink-500/20 to-purple-500/30 backdrop-blur-[3px] animate-gradient"
        style={{
        animation: 'gradientShift 15s ease infinite'
        }}
    ></div>
    <div className="absolute inset-0 bg-black/20"></div>
      <FloatingElements />
    <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
    <div className="max-w-3xl w-full text-center">
        <h1 className="text-6xl font-playfair text-white mb-6 animate-pulse drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]">
        Welcome to Our Love Story
        </h1>
        <div className="text-7xl mb-8 animate-fadeIn hover:scale-105 transition-transform duration-300">
        <span className="font-great-vibes bg-gradient-to-r from-pink-200 via-pink-300 to-rose-200 text-transparent bg-clip-text tracking-wider drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)] hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] transition-all duration-300">
            Rafi <Heart className="w-20 h-20 inline-block fill-pink-200 stroke-pink-300 animate-pulse hover:scale-110 transition-transform duration-300 mx-3 drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)]" /> Asma
        </span>
        </div>
          
          <div className="space-y-6">
            <button
            onClick={() => setShowGallery(true)}
            className="font-montserrat bg-gradient-to-r from-pink-400/90 to-rose-400/90 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-white font-semibold text-xl mx-2 hover:from-pink-500/90 hover:to-rose-500/90 backdrop-blur-sm"
            >
              Explore Our Love Story
            </button>
          </div>

        <div className="mt-12 pt-8 border-t border-rose-200/30 w-full">
            <p className="font-montserrat text-pink-200 text-lg font-semibold mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">Connect with us on Instagram</p>
            <div className="flex justify-center space-x-8">
              <a
                href="https://instagram.com/rafi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-pink-200 hover:text-pink-100 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
              >
                <Instagram className="w-5 h-5" />
                <span>@Rafi</span>
              </a>
              <a
                href="https://instagram.com/****"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-pink-200 hover:text-pink-100 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
              >
                <Instagram className="w-5 h-5" />
                <span>@Asma</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;