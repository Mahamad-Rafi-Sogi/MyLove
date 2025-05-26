import React, { useState, useEffect } from 'react';
import { Credit } from '../App';
import { ArrowLeft, Heart, ChevronLeft, ChevronRight, Instagram, Volume2, VolumeX } from 'lucide-react';

// Sample photos with more diverse romantic moments
const photos = [
  "https://media.istockphoto.com/id/157676310/photo/romantic-couple-at-sunset.jpg?s=612x612&w=0&k=20&c=HZR9rncAeh-17GeRNUQnzaH8vU0AZsVqnIkBt4MqHuQ=",
  "assets/images/couple1.jpg",
  "assets/images/couple2.jpg",
  "assets/images/couple3.jpg",
  "assets/images/couple4.jpg",
  "assets/images/couple5.jpg",

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
const [volume, setVolume] = useState(0.5);
const audioRef = React.useRef<HTMLAudioElement>(null);

useEffect(() => {
    if (audioRef.current) {
    audioRef.current.volume = 0.5;
    
    audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
    });
    
    audioRef.current.addEventListener('loadeddata', () => {
        console.log('Audio loaded successfully');
    });
    
    // Try to play on component mount
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
        console.log('Autoplay prevented:', error);
        });
    }
    }
}, []);

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
    if (audioRef.current) {
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(!isMuted);
    if (!audioRef.current.muted) {
        audioRef.current.volume = volume;
    }
    }
};

const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
    audioRef.current.volume = newVolume;
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
    <div className="absolute top-4 right-6 z-50">
    <Credit />
    </div>

    <button
        onClick={onBack}
        className="absolute top-4 left-4 z-50 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-white" />
      </button>

    <button
    onClick={toggleMute}
    className="absolute top-20 right-6 z-50 bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
    >
    {isMuted ? (
        <VolumeX className="w-6 h-6 text-white" />
    ) : (
        <Volume2 className="w-6 h-6 text-white" />
    )}
    </button>

    <audio
    ref={audioRef}
    loop
    preload="auto"
    muted={isMuted}
    >
    <source src="./assets/music/background-music.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
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
                      className="rounded-lg shadow-lg transition-all duration-1000 max-w-full max-h-[70vh]"
                      style={{
                        filter: index === currentIndex ? 'none' : 'brightness(0.7)',
                        display: 'block',
                        margin: '0 auto',
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

        <div className="absolute bottom-8 left-0 right-0 text-center z-50">
        <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
        >
            Connect with us on Instagram ❤️
        </a>
        </div>
      </div>
    </div>
  );
}

export default PhotoGallery;