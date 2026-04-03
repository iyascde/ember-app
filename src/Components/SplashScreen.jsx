import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState(0);
  // stage 0: dark
  // stage 1: flame appears
  // stage 2: name fades in
  // stage 3: tagline fades in
  // stage 4: fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 400),
      setTimeout(() => setStage(2), 1400),
      setTimeout(() => setStage(3), 2200),
      setTimeout(() => setStage(4), 3400),
      setTimeout(() => onComplete(), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#2E1F14',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 99999,
      opacity: stage === 4 ? 0 : 1,
      transition: stage === 4 ? 'opacity 0.8s ease' : 'none',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

        .flame-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .flame-glow {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center,
            rgba(201,168,76,0.35) 0%,
            rgba(184,149,106,0.15) 40%,
            transparent 70%);
          animation: glow-pulse 2s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        .flame-emoji {
          font-size: 5rem;
          line-height: 1;
          position: relative;
          z-index: 2;
          animation: flame-flicker 1.5s ease-in-out infinite;
          filter: drop-shadow(0 0 20px rgba(201,168,76,0.6));
        }

        @keyframes flame-flicker {
          0%, 100% { transform: scale(1) rotate(-1deg); filter: drop-shadow(0 0 20px rgba(201,168,76,0.6)); }
          25% { transform: scale(1.05) rotate(1deg); filter: drop-shadow(0 0 30px rgba(201,168,76,0.8)); }
          50% { transform: scale(0.97) rotate(-0.5deg); filter: drop-shadow(0 0 15px rgba(201,168,76,0.5)); }
          75% { transform: scale(1.03) rotate(1.5deg); filter: drop-shadow(0 0 25px rgba(201,168,76,0.7)); }
        }

        .ring-splash {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.15);
          animation: ring-expand 2s ease-out infinite;
        }

        .ring-splash-1 { width: 140px; height: 140px; animation-delay: 0s; }
        .ring-splash-2 { width: 180px; height: 180px; animation-delay: 0.6s; }
        .ring-splash-3 { width: 220px; height: 220px; animation-delay: 1.2s; }

        @keyframes ring-expand {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.1); opacity: 0; }
        }

        .splash-name {
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          font-weight: 400;
          color: #F5EFE4;
          letter-spacing: 0.08em;
          margin-bottom: 0.8rem;
          text-align: center;
        }

        .splash-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 300;
          font-size: 1.2rem;
          color: rgba(212,184,150,0.7);
          letter-spacing: 0.12em;
          text-align: center;
        }

        .splash-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #C9A84C;
          border-radius: 50%;
          margin-left: 0.4rem;
          animation: glow-pulse 2s ease-in-out infinite;
          vertical-align: middle;
        }
      `}</style>

      {/* Flame */}
      <div className="flame-wrap" style={{
        opacity: stage >= 1 ? 1 : 0,
        transform: stage >= 1 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.8)',
        transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <div className="ring-splash ring-splash-1"></div>
        <div className="ring-splash ring-splash-2"></div>
        <div className="ring-splash ring-splash-3"></div>
        <div className="flame-glow"></div>
        <div className="flame-emoji">🕯️</div>
      </div>

      {/* Name */}
      <div className="splash-name" style={{
        opacity: stage >= 2 ? 1 : 0,
        transform: stage >= 2 ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        Ember <span className="splash-dot"></span>
      </div>

      {/* Tagline */}
      <div className="splash-tagline" style={{
        opacity: stage >= 3 ? 1 : 0,
        transform: stage >= 3 ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        Memory lives on.
      </div>
    </div>
  );
}