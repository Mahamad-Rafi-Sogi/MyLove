import React from 'react';

interface FloatingElement {
id: number;
left: string;
delay: string;
duration: string;
size: string;
emoji: string;
rotation: 'rotate' | 'rotateReverse';
}

const FloatingElements: React.FC = () => {
const elements: FloatingElement[] = Array.from({ length: 30 }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${3 + Math.random() * 4}s`,
    size: `${1 + Math.random() * 1.5}rem`,
    emoji: ["💧", "🌸", "💕"][Math.floor(Math.random() * 3)],
    rotation: Math.random() > 0.5 ? 'rotate' : 'rotateReverse'
}));

return (
<div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {elements.map(({ id, left, delay, duration, size, emoji, rotation }) => (
    <div
        key={id}
        className="absolute animate-float"
        style={{
        left,
        top: '-20px',
        animationDelay: delay,
        animationDuration: duration,
        fontSize: size,
        opacity: 0.8,
        willChange: 'transform',
        filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))',
        }}
    >
        <div className={`animate-${rotation} transition-transform`}>
        {emoji}
        </div>
    </div>
    ))}

    <style jsx>{`
    @keyframes float {
        0% {
        transform: translateY(-20px) translateX(0);
        opacity: 0;
        }
        10% {
        opacity: 0.8;
        }
        50% {
        transform: translateY(50vh) translateX(20px);
        }
        90% {
        opacity: 0.8;
        }
        100% {
        transform: translateY(100vh) translateX(-20px);
        opacity: 0;
        }
    }

    @keyframes rotate {
        0% {
        transform: rotate(0deg) scale(1);
        }
        50% {
        transform: rotate(180deg) scale(1.1);
        }
        100% {
        transform: rotate(360deg) scale(1);
        }
    }

    @keyframes rotateReverse {
        0% {
        transform: rotate(360deg) scale(1);
        }
        50% {
        transform: rotate(180deg) scale(1.1);
        }
        100% {
        transform: rotate(0deg) scale(1);
        }
    }

    .animate-float {
        animation: float linear infinite;
    }

    .animate-rotate {
        animation: rotate 4s ease-in-out infinite;
    }

    .animate-rotateReverse {
        animation: rotateReverse 4s ease-in-out infinite;
    }
    `}</style>
</div>
);
};

export default FloatingElements;
    </div>
);
};

export default FloatingElements;

