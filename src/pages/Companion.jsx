import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEmber } from '../Context/EmberContext.js';

export default function Companion() {
  const [listening, setListening] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const [clock, setClock] = useState('');
  const navigate = useNavigate();

  const { profile } = useEmber();

  const emberLines = [
    `${profile.patientName}, I've been thinking about you. How are you feeling today?`,
    `Do you remember you once told me about your roses? I'd love to hear about them again.`,
    `It's such a lovely time of day. Have you had your coffee yet, sweetheart?`,
    `I was just thinking about Thomas. He sounds like he was such a wonderful man.`,
    `Your ${profile.caregiverRelation} called earlier. They said to tell you they love you very much.`,
    `Would you like to hear a little music? I know you love Frank Sinatra.`,
    `Tell me something — what does your garden look like this time of year?`,
];

  const [lineIndex, setLineIndex] = useState(0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
      setClock(`${time}  ·  ${date}`);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let speakTimeout;
    let nextTimeout;

    if (listening) {
      // show typing first
      setIsTyping(true);
      setShowBubble(true);
      setBubbleText('');

      speakTimeout = setTimeout(() => {
        setIsTyping(false);
        setBubbleText(emberLines[lineIndex % emberLines.length]);

        nextTimeout = setTimeout(() => {
          setIsTyping(true);
          setBubbleText('');
          setTimeout(() => {
            setIsTyping(false);
            setLineIndex(prev => prev + 1);
            setBubbleText(emberLines[(lineIndex + 1) % emberLines.length]);
          }, 2000);
        }, 7000);
      }, 1800);
    } else {
      setShowBubble(false);
      setIsTyping(false);
      setBubbleText('');
    }

    return () => {
      clearTimeout(speakTimeout);
      clearTimeout(nextTimeout);
    };
  }, [listening, lineIndex]);

  const endSession = () => {
    setListening(false);
    setShowEndOverlay(false);
    setTimeout(() => navigate('/dashboard'), 800);
  };

  return (
    <>
      <style>{`
        .companion-page {
          width: 100%; height: 100vh;
          background: #F6F0E5;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }
        .bg-glow {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
        }
        .bg-glow::before {
          content: '';
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 80vmin; height: 80vmin;
          background: radial-gradient(ellipse at center, rgba(212,184,150,0.22) 0%, rgba(245,239,228,0) 70%);
          border-radius: 50%;
          animation: breathe-bg 8s ease-in-out infinite;
        }
        @keyframes breathe-bg {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.7; }
        }
        .particles {
          position: fixed; inset: 0; pointer-events: none; z-index: 1; overflow: hidden;
        }
        .particle {
          position: absolute; width: 3px; height: 3px;
          border-radius: 50%; background: var(--tan);
          opacity: 0; animation: float-particle linear infinite;
        }
        @keyframes float-particle {
          0%   { bottom: -5%; opacity: 0; transform: translateX(0) scale(1); }
          10%  { opacity: 0.4; }
          90%  { opacity: 0.15; }
          100% { bottom: 105%; opacity: 0; transform: translateX(20px) scale(0.5); }
        }
        .logo-corner {
          position: fixed; top: 2.5rem; left: 3rem;
          font-family: 'Playfair Display', serif; font-size: 1.2rem;
          color: var(--brown-dark);
          display: flex; align-items: center; gap: 0.4rem;
          z-index: 20;
          opacity: 0; animation: fadeDown 1s ease forwards 0.2s;
        }
        .corner-time {
          position: fixed; top: 2.5rem; left: 50%; transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(0.8rem, 1.8vmin, 0.95rem);
          letter-spacing: 0.15em; color: var(--text-muted); font-weight: 300;
          z-index: 20;
          opacity: 0; animation: fadeDown 1s ease forwards 0.2s;
        }
        .main-content {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          align-items: center; text-align: center; padding: 2rem;
        }
        .greeting-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1rem, 2.5vmin, 1.2rem);
          font-weight: 300; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 0.8rem;
          opacity: 0; animation: fadeDown 1s ease forwards 0.4s;
        }
        .patient-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 10vmin, 7rem);
          font-weight: 400; line-height: 1; color: var(--brown-dark);
          margin-bottom: 0.5rem;
          opacity: 0; animation: fadeDown 1s ease forwards 0.65s;
        }
        .tagline {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: clamp(1.1rem, 3vmin, 1.55rem); font-weight: 300;
          color: var(--text-soft); margin-bottom: 5vmin;
          opacity: 0; animation: fadeDown 1s ease forwards 0.9s; line-height: 1.6;
        }
        .waveform {
          display: flex; align-items: center; justify-content: center;
          gap: 5px; height: 40px; margin-bottom: 3vmin;
          opacity: ${listening ? 1 : 0};
          transition: opacity 0.5s;
        }
        .wbar {
          width: 4px; background: var(--tan-deep); border-radius: 2px;
          animation: wbar-anim 1s ease-in-out infinite;
        }
        .wbar:nth-child(1) { animation-delay: 0.0s; }
        .wbar:nth-child(2) { animation-delay: 0.1s; }
        .wbar:nth-child(3) { animation-delay: 0.2s; }
        .wbar:nth-child(4) { animation-delay: 0.08s; }
        .wbar:nth-child(5) { animation-delay: 0.18s; }
        .wbar:nth-child(6) { animation-delay: 0.05s; }
        .wbar:nth-child(7) { animation-delay: 0.15s; }
        .wbar:nth-child(8) { animation-delay: 0.12s; }
        .wbar:nth-child(9) { animation-delay: 0.22s; }
        @keyframes wbar-anim {
          0%, 100% { height: 6px; opacity: 0.4; }
          50% { height: 32px; opacity: 1; }
        }
        .btn-wrap {
          position: relative; display: flex;
          align-items: center; justify-content: center;
          margin-bottom: 5vmin;
          opacity: 0; animation: fadeUp 1.1s ease forwards 1.15s;
        }
        .ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(212,184,150,0.25);
        }
        .ring-outer { width: 260px; height: 260px; animation: ring-pulse 3.5s ease-in-out infinite; }
        .ring-mid   { width: 220px; height: 220px; animation: ring-pulse 3.5s ease-in-out infinite 0.4s; }
        @keyframes ring-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.06); opacity: 0.15; }
        }
        .ember-btn {
          width: 180px; height: 180px; border-radius: 50%; border: none;
          cursor: pointer; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 0.6rem;
          position: relative; z-index: 2;
          background: var(--brown-dark);
          box-shadow: 0 20px 60px rgba(74,55,40,0.25), 0 4px 16px rgba(74,55,40,0.2);
          transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s, background 0.4s;
          animation: idle-breathe 4s ease-in-out infinite 2s;
        }
        .ember-btn.active {
          background: linear-gradient(135deg, #5a3a25, var(--brown-dark));
          animation: listening-pulse 1.8s ease-in-out infinite !important;
        }
        @keyframes idle-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.025); }
        }
        @keyframes listening-pulse {
          0%, 100% { box-shadow: 0 0 0 0px rgba(201,168,76,0.15), 0 20px 60px rgba(74,55,40,0.25); }
          50% { box-shadow: 0 0 0 28px rgba(201,168,76,0.06), 0 0 80px rgba(201,168,76,0.18), 0 20px 60px rgba(74,55,40,0.3); }
        }
        .ember-btn:hover { transform: scale(1.06) !important; animation: none; box-shadow: 0 0 0 20px rgba(201,168,76,0.08), 0 28px 70px rgba(74,55,40,0.3); }
        .ember-btn:active { transform: scale(0.96) !important; transition: transform 0.15s; }
        .btn-icon { font-size: 2.8rem; line-height: 1; transition: transform 0.3s; }
        .ember-btn:hover .btn-icon { transform: scale(1.1); }
        .btn-label {
          font-family: 'Cormorant Garamond', serif; font-size: 1rem;
          font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(245,239,228,0.85);
        }
        .status-text {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: clamp(1rem, 2.5vmin, 1.3rem);
          color: var(--text-muted); letter-spacing: 0.04em;
          min-height: 2em; transition: color 0.5s;
          opacity: 0; animation: fadeUp 1s ease forwards 1.5s;
        }
        .ember-says {
          position: fixed; bottom: 8vh; left: 50%;
          transform: translateX(-50%);
          max-width: min(580px, 88vw);
          background: #F0E8D5;
          border: 1px solid rgba(212,184,150,0.4);
          border-radius: 20px; padding: 1.6rem 2rem;
          text-align: center;
          box-shadow: 0 12px 48px rgba(74,55,40,0.1);
          z-index: 20;
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.2,0.64,1);
        }
        .ember-says-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--tan-deep); margin-bottom: 0.5rem;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
        }
        .ember-says-label::before, .ember-says-label::after {
          content: ''; width: 20px; height: 1px; background: var(--tan-deep); display: block;
        }
        .ember-says-text {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-size: clamp(1rem, 2.5vmin, 1.3rem);
          color: var(--brown-dark); line-height: 1.65;
        }
        .typing-dots { display: inline-flex; gap: 4px; align-items: center; }
        .typing-dot {
          width: 6px; height: 6px; background: var(--tan-deep);
          border-radius: 50%; animation: dot-bounce 1.2s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dot-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        .end-btn {
          position: fixed; bottom: 2.5rem; right: 3rem;
          font-family: 'Cormorant Garamond', serif; font-size: 0.85rem;
          letter-spacing: 0.08em; color: var(--text-muted);
          opacity: 0; animation: fadeUp 1s ease forwards 2s;
          transition: color 0.3s; cursor: pointer;
          background: none; border: none;
        }
        .end-btn:hover { color: var(--text-soft); }
        .end-overlay {
          position: fixed; inset: 0;
          background: rgba(74,55,40,0.6);
          backdrop-filter: blur(6px);
          z-index: 200; display: flex;
          align-items: center; justify-content: center;
          animation: fadeIn 0.4s ease forwards;
        }
        .end-card {
          background: var(--cream); border-radius: 24px;
          padding: 3rem 3.5rem; text-align: center; max-width: 400px;
          box-shadow: 0 24px 80px rgba(74,55,40,0.3);
          animation: fadeUp 0.4s cubic-bezier(0.34,1.2,0.64,1) forwards;
        }
        .end-card-icon { font-size: 3rem; margin-bottom: 1.2rem; }
        .end-card-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-style: italic; color: var(--brown-dark); margin-bottom: 0.8rem; }
        .end-card-body { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; color: var(--text-soft); line-height: 1.7; margin-bottom: 2rem; font-style: italic; }
        .end-card-actions { display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap; }
        .btn-end-yes {
          font-family: 'Cormorant Garamond', serif; font-size: 0.95rem;
          letter-spacing: 0.06em; background: var(--brown-dark); color: var(--cream);
          border: none; padding: 0.85rem 2rem; border-radius: 100px;
          cursor: pointer; transition: all 0.3s;
        }
        .btn-end-yes:hover { background: var(--brown); transform: translateY(-1px); }
        .btn-end-no {
          font-family: 'Cormorant Garamond', serif; font-size: 0.95rem;
          letter-spacing: 0.06em; background: transparent; color: var(--text-soft);
          border: 1px solid var(--tan); padding: 0.85rem 2rem; border-radius: 100px;
          cursor: pointer; transition: all 0.3s;
        }
        .btn-end-no:hover { border-color: var(--brown); color: var(--brown-dark); }
      `}</style>

      <div className="companion-page">
        <div className="bg-glow"></div>

        {/* Particles */}
        <div className="particles">
          {[
            { left:'12%', duration:'18s', delay:'0s' },
            { left:'28%', duration:'22s', delay:'3s', color:'var(--gold)' },
            { left:'45%', duration:'16s', delay:'7s' },
            { left:'62%', duration:'20s', delay:'1s', color:'var(--rose)' },
            { left:'78%', duration:'25s', delay:'5s' },
            { left:'90%', duration:'19s', delay:'9s', color:'var(--gold)' },
            { left:'35%', duration:'23s', delay:'12s' },
            { left:'55%', duration:'17s', delay:'4s', color:'var(--rose)' },
          ].map((p, i) => (
            <div key={i} className="particle" style={{
              left: p.left,
              animationDuration: p.duration,
              animationDelay: p.delay,
              background: p.color || 'var(--tan)',
            }}></div>
          ))}
        </div>

        {/* Logo */}
        <div className="logo-corner">
          Ember <span className="ember-dot"></span>
        </div>

        {/* Clock */}
        <div className="corner-time">{clock}</div>

        {/* Main */}
        <div className="main-content">
          <div className="greeting-text">{greeting()}</div>
          <div className="patient-name">{profile.patientName}.</div>
          <div className="tagline">Ember is here with you.<br/>Whenever you're ready.</div>

          {/* Waveform */}
          <div className="waveform" style={{ opacity: listening ? 1 : 0 }}>
            {[...Array(9)].map((_, i) => <div key={i} className="wbar"></div>)}
          </div>

          {/* Button */}
          <div className="btn-wrap">
            <div className="ring ring-outer"></div>
            <div className="ring ring-mid"></div>
            <button
              className={`ember-btn ${listening ? 'active' : ''}`}
              onClick={() => setListening(!listening)}
            >
              <span className="btn-icon">{listening ? '🔊' : '🕯️'}</span>
              <span className="btn-label">{listening ? 'Listening…' : 'Talk to Ember'}</span>
            </button>
          </div>

          {/* Status */}
          <div className="status-text" style={{ color: listening ? 'var(--tan-deep)' : '' }}>
            {listening ? 'Ember is with you' : 'Press the flame to begin'}
          </div>
        </div>

        {/* Ember Says Bubble */}
        {showBubble && (
          <div className="ember-says">
            <div className="ember-says-label">Ember</div>
            <div className="ember-says-text">
              {isTyping ? (
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              ) : bubbleText}
            </div>
          </div>
        )}

        {/* End Button */}
        <button className="end-btn" onClick={() => setShowEndOverlay(true)}>
          End conversation ·
        </button>

        {/* End Overlay */}
        {showEndOverlay && (
          <div className="end-overlay">
            <div className="end-card">
              <div className="end-card-icon">🌿</div>
              <h2 className="end-card-title">Until next time, {profile.patientName}.</h2>
              <p className="end-card-body">It was so lovely talking with you today. Ember will always be here, whenever you need a friendly voice.</p>
              <div className="end-card-actions">
                <button className="btn-end-yes" onClick={endSession}>Goodbye for now</button>
                <button className="btn-end-no" onClick={() => setShowEndOverlay(false)}>Keep talking</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}