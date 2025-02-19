import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, ChevronLeft, ChevronRight, Instagram, Volume2, VolumeX } from 'lucide-react';

// Sample photos with more diverse romantic moments
const photos = [
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
  "https://images.unsplash.com/photo-1535615615570-3b839f4359be?w=800",
  "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800",
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
  "https://images.unsplash.com/photo-1537261131936-3cdff36a1ac9?w=800",
];

function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(10)].map((_, i) => (
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
          <Heart className="text-pink-400/50 w-8 h-8" />
        </div>
      ))}
    </div>
  );
}

interface PhotoGalleryProps {
  onBack: () => void;
}

function PhotoGallery({ onBack }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);

  const toggleMute = () => {
    const audio = document.getElementById('background-music') as HTMLAudioElement;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(!isMuted);
    }
  };

  const getPhotoPosition = (index: number) => {
    const position = (index - currentIndex + photos.length) % photos.length;
    const totalVisible = 5;
    const centerIndex = Math.floor(totalVisible / 2);
    
    if (position > centerIndex + 1 && position < photos.length - centerIndex) {
      return { x: 150, scale: 0, opacity: 0 };
    }

    let x = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 0;

    if (position === centerIndex) {
      x = 0;
      scale = 1;
      opacity = 1;
      zIndex = 10;
    } else if (position < centerIndex) {
      x = -120 * (centerIndex - position);
      scale = 0.8 - (centerIndex - position) * 0.1;
      opacity = 0.6;
      zIndex = 5 - Math.abs(centerIndex - position);
    } else {
      x = 120 * (position - centerIndex);
      scale = 0.8 - (position - centerIndex) * 0.1;
      opacity = 0.6;
      zIndex = 5 - Math.abs(centerIndex - position);
    }

    return { x, scale, opacity, zIndex };
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1492552181161-62217fc3076d?w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <FloatingHearts />
      
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-50 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-50 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>

      <audio
        id="background-music"
        autoPlay
        loop
        className="hidden"
      >
        <source src="https://www.chosic.com/wp-content/uploads/2023/07/romantic-piano.mp3" type="audio/mpeg" />
      </audio>

      <div className="absolute top-1/2 left-4 z-20">
        <button
          onClick={prevSlide}
          className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 z-20">
        <button
          onClick={nextSlide}
          className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 text-rose-400">Our Journey Together</h2>
        <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="gallery-slider relative w-full max-w-6xl flex items-center justify-center">
            {photos.map((photo, index) => {
              const { x, scale, opacity, zIndex } = getPhotoPosition(index);
              
              return (
                <div
                  key={index}
                  className="absolute transition-all duration-1000 ease-out cursor-pointer"
                  style={{
                    transform: `translateX(${x}px) scale(${scale})`,
                    opacity,
                    zIndex,
                  }}
                  onClick={() => {
                    if (index !== currentIndex) {
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <div className="relative group">
                    <img
                      src={photo}
                      alt={`Memory ${index + 1}`}
                      className="w-96 h-64 object-cover rounded-lg shadow-lg transition-all duration-1000"
                      style={{
                        filter: index === currentIndex ? 'none' : 'brightness(0.7)',
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <Heart className="w-12 h-12 text-rose-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-rose-200/30">
          <p className="text-rose-400 font-semibold mb-4">Connect with us on Instagram</p>
          <div className="flex justify-center space-x-8">
            <a
              href="https://instagram.com/rafi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-rose-400 hover:text-rose-300 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>@rafi</span>
            </a>
            <a
              href="https://instagram.com/****"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-rose-400 hover:text-rose-300 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>@****</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoGallery;