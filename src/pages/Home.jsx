import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <>
      <style>{`
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 1.6rem 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(to bottom, rgba(245,239,228,0.95), rgba(245,239,228,0));
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 500;
          color: var(--brown-dark);
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }
        .nav-links a {
          font-family: 'Lora', serif;
          font-size: 0.85rem;
          color: var(--text-soft);
          text-decoration: none;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .nav-links a:hover { color: var(--brown-dark); }
        .nav-cta {
          font-family: 'Lora', serif;
          font-size: 0.85rem;
          background: var(--brown-dark);
          color: var(--cream);
          padding: 0.65rem 1.6rem;
          border-radius: 100px;
          text-decoration: none;
          letter-spacing: 0.06em;
          transition: background 0.3s, transform 0.2s;
        }
        .nav-cta:hover { background: var(--brown); transform: translateY(-1px); }
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 0 4rem;
        }
        .hero::after {
          content: '';
          position: absolute;
          top: -10%; right: -5%;
          width: 700px; height: 700px;
          background: radial-gradient(ellipse at center, rgba(212,184,150,0.35) 0%, rgba(245,239,228,0) 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-eyebrow {
          font-family: 'Lora', serif;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--tan-deep);
          margin-bottom: 1.8rem;
          opacity: 0;
          animation: fadeUp 0.8s ease forwards 0.2s;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .hero-eyebrow::before {
          content: '';
          display: block;
          width: 32px; height: 1px;
          background: var(--tan-deep);
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 5vw, 5.2rem);
          font-weight: 400;
          line-height: 1.1;
          color: var(--brown-dark);
          margin-bottom: 2rem;
          opacity: 0;
          animation: fadeUp 0.9s ease forwards 0.4s;
        }
        .hero-title em { font-style: italic; color: var(--tan-deep); }
        .hero-body {
          font-family: 'Lora', serif;
          font-size: 1.1rem;
          line-height: 1.85;
          color: var(--text-soft);
          max-width: 480px;
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeUp 0.9s ease forwards 0.6s;
        }
        .hero-actions {
          display: flex;
          gap: 1.2rem;
          align-items: center;
          opacity: 0;
          animation: fadeUp 0.9s ease forwards 0.8s;
        }
        .btn-primary {
          font-family: 'Lora', serif;
          font-size: 0.95rem;
          background: var(--brown-dark);
          color: var(--cream);
          padding: 1rem 2.2rem;
          border-radius: 100px;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .btn-primary:hover {
          background: var(--brown);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(74,55,40,0.2);
        }
        .btn-secondary {
          font-family: 'Lora', serif;
          font-size: 0.9rem;
          color: var(--text-soft);
          text-decoration: none;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.3s;
        }
        .btn-secondary:hover { color: var(--brown-dark); }
        .hero-right {
          position: relative;
          height: 580px;
          opacity: 0;
          animation: fadeIn 1.2s ease forwards 0.6s;
        }
        .photo-frame {
          position: absolute;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(74,55,40,0.15), 0 4px 12px rgba(74,55,40,0.1);
        }
        .photo-1 {
          width: 280px; height: 340px;
          top: 30px; left: 40px;
          transform: rotate(-2.5deg);
          background: linear-gradient(135deg, #D4C4B0 0%, #C4A882 30%, #B89870 60%, #A08060 100%);
          animation: float1 6s ease-in-out infinite;
        }
        .photo-2 {
          width: 220px; height: 260px;
          top: 80px; right: 20px;
          transform: rotate(3deg);
          background: linear-gradient(135deg, #C8B89A 0%, #B8A07A 40%, #A08868 100%);
          animation: float2 7s ease-in-out infinite 1s;
        }
        .photo-3 {
          width: 180px; height: 210px;
          bottom: 40px; left: 100px;
          transform: rotate(-1deg);
          background: linear-gradient(135deg, #D8C8A8 0%, #C4A878 50%, #B09060 100%);
          animation: float1 8s ease-in-out infinite 2s;
        }
        @keyframes float1 {
          0%, 100% { transform: rotate(-2.5deg) translateY(0); }
          50% { transform: rotate(-2.5deg) translateY(-10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: rotate(3deg) translateY(0); }
          50% { transform: rotate(3deg) translateY(-8px); }
        }
        .photo-inner {
          width: 100%; height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 1.2rem;
        }
        .photo-caption {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.8rem;
          color: rgba(74,55,40,0.6);
          text-align: center;
        }
        .photo-icon { font-size: 3.5rem; margin-bottom: 0.5rem; }
        .quote-card {
          position: absolute;
          bottom: 60px; right: -10px;
          background: var(--cream);
          border: 1px solid rgba(212,184,150,0.4);
          border-radius: 12px;
          padding: 1.2rem 1.5rem;
          max-width: 220px;
          box-shadow: 0 12px 40px rgba(74,55,40,0.12);
          animation: float2 9s ease-in-out infinite 0.5s;
        }
        .quote-card p {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-soft);
        }
        .quote-card cite {
          display: block;
          margin-top: 0.6rem;
          font-family: 'Lora', serif;
          font-style: normal;
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .waveform {
          position: absolute;
          top: 20px; right: 60px;
          display: flex;
          align-items: center;
          gap: 3px;
          padding: 0.7rem 1rem;
          background: rgba(245,239,228,0.9);
          border: 1px solid rgba(212,184,150,0.3);
          border-radius: 100px;
        }
        .waveform-bar {
          width: 3px;
          background: var(--tan-deep);
          border-radius: 2px;
          animation: wave 1.2s ease-in-out infinite;
        }
        .waveform-bar:nth-child(1) { height: 8px; animation-delay: 0s; }
        .waveform-bar:nth-child(2) { height: 16px; animation-delay: 0.1s; }
        .waveform-bar:nth-child(3) { height: 22px; animation-delay: 0.2s; }
        .waveform-bar:nth-child(4) { height: 14px; animation-delay: 0.3s; }
        .waveform-bar:nth-child(5) { height: 20px; animation-delay: 0.15s; }
        .waveform-bar:nth-child(6) { height: 10px; animation-delay: 0.25s; }
        .waveform-bar:nth-child(7) { height: 18px; animation-delay: 0.05s; }
        @keyframes wave {
          0%, 100% { transform: scaleY(1); opacity: 0.7; }
          50% { transform: scaleY(0.4); opacity: 1; }
        }
        .waveform-label {
          font-family: 'Lora', serif;
          font-size: 0.72rem;
          color: var(--tan-deep);
          margin-left: 0.4rem;
          letter-spacing: 0.04em;
        }
        .stats-bar {
          background: var(--cream-dark);
          border-top: 1px solid rgba(212,184,150,0.3);
          border-bottom: 1px solid rgba(212,184,150,0.3);
          padding: 2.5rem 4rem;
        }
        .stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .stat-item { text-align: center; }
        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 400;
          color: var(--brown-dark);
          display: block;
        }
        .stat-label {
          font-family: 'Lora', serif;
          font-size: 0.8rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .stat-divider { width: 1px; height: 50px; background: rgba(212,184,150,0.4); }
        .pull-quote-section {
          padding: 6rem 4rem;
          background: linear-gradient(135deg, var(--cream-dark) 0%, var(--cream) 100%);
          position: relative;
          overflow: hidden;
        }
        .pull-quote-section::before {
          content: '\\201C';
          position: absolute;
          top: -2rem; left: 3rem;
          font-family: 'Playfair Display', serif;
          font-size: 20rem;
          color: rgba(212,184,150,0.15);
          line-height: 1;
          pointer-events: none;
        }
        .pull-quote-inner { max-width: 800px; margin: 0 auto; text-align: center; }
        .pull-quote-text {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(1.5rem, 2.8vw, 2.4rem);
          line-height: 1.5;
          color: var(--brown-dark);
          margin-bottom: 2rem;
        }
        .pull-quote-attr {
          font-family: 'Lora', serif;
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .how-section { padding: 7rem 4rem; max-width: 1200px; margin: 0 auto; }
        .section-label {
          font-family: 'Lora', serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--tan-deep);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .section-label::before { content: ''; display: block; width: 24px; height: 1px; background: var(--tan-deep); }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3.5vw, 3.2rem);
          font-weight: 400;
          line-height: 1.2;
          color: var(--brown-dark);
          margin-bottom: 1.5rem;
        }
        .section-title em { font-style: italic; color: var(--tan-deep); }
        .how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-top: 4rem;
        }
        .how-card {
          background: var(--cream);
          border: 1px solid rgba(212,184,150,0.3);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .how-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(74,55,40,0.1); }
        .how-card-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4rem;
          font-weight: 300;
          color: rgba(212,184,150,0.5);
          line-height: 1;
          margin-bottom: 1rem;
        }
        .how-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          color: var(--brown-dark);
          margin-bottom: 0.8rem;
        }
        .how-card-body {
          font-family: 'Lora', serif;
          font-size: 0.92rem;
          line-height: 1.8;
          color: var(--text-soft);
        }
        .how-card-icon { font-size: 1.8rem; margin-bottom: 1rem; }
        .features-section {
          background: linear-gradient(160deg, var(--brown-dark) 0%, #2E1F14 100%);
          padding: 7rem 4rem;
        }
        .features-inner { max-width: 1200px; margin: 0 auto; }
        .features-section .section-label { color: var(--tan); }
        .features-section .section-label::before { background: var(--tan); }
        .features-section .section-title { color: var(--cream); }
        .features-section .section-title em { color: var(--gold); }
        .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 4rem; }
        .feature-item {
          display: flex;
          gap: 1.5rem;
          padding: 2rem;
          border: 1px solid rgba(212,184,150,0.1);
          border-radius: 12px;
          transition: background 0.3s, border-color 0.3s;
        }
        .feature-item:hover { background: rgba(212,184,150,0.06); border-color: rgba(212,184,150,0.25); }
        .feature-icon { font-size: 1.8rem; flex-shrink: 0; margin-top: 0.2rem; }
        .feature-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--cream); margin-bottom: 0.5rem; }
        .feature-body { font-family: 'Lora', serif; font-size: 0.88rem; line-height: 1.75; color: rgba(245,239,228,0.55); }
        .cta-section { padding: 8rem 4rem; text-align: center; position: relative; overflow: hidden; }
        .cta-section::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 400px;
          background: radial-gradient(ellipse, rgba(212,184,150,0.2) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 4vw, 4rem);
          font-weight: 400;
          line-height: 1.2;
          color: var(--brown-dark);
          max-width: 700px;
          margin: 0 auto 1.5rem;
        }
        .cta-title em { font-style: italic; color: var(--tan-deep); }
        .cta-body {
          font-family: 'Lora', serif;
          font-size: 1.05rem;
          color: var(--text-soft);
          max-width: 480px;
          margin: 0 auto 3rem;
          line-height: 1.8;
        }
        .cta-actions { display: flex; gap: 1.2rem; justify-content: center; align-items: center; flex-wrap: wrap; }
        .btn-large {
          font-family: 'Lora', serif;
          font-size: 1rem;
          background: var(--brown-dark);
          color: var(--cream);
          padding: 1.1rem 2.8rem;
          border-radius: 100px;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }
        .btn-large:hover { background: var(--brown); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(74,55,40,0.25); }
        .btn-ghost {
          font-family: 'Lora', serif;
          font-size: 0.95rem;
          color: var(--text-soft);
          border: 1px solid rgba(122,92,62,0.3);
          padding: 1.1rem 2.2rem;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.3s;
        }
        .btn-ghost:hover { border-color: var(--brown); color: var(--brown-dark); }
        footer {
          background: var(--brown-dark);
          padding: 3rem 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          color: var(--cream);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .footer-tagline { font-family: 'Lora', serif; font-style: italic; font-size: 0.85rem; color: rgba(245,239,228,0.45); margin-top: 0.3rem; }
        .footer-links { display: flex; gap: 2rem; list-style: none; }
        .footer-links a { font-family: 'Lora', serif; font-size: 0.8rem; color: rgba(245,239,228,0.45); text-decoration: none; letter-spacing: 0.06em; text-transform: uppercase; transition: color 0.3s; }
        .footer-links a:hover { color: var(--tan); }
        .footer-powered { font-family: 'Lora', serif; font-size: 0.78rem; color: rgba(245,239,228,0.3); }
        .divider { width: 100%; height: 1px; background: linear-gradient(to right, transparent, var(--tan), transparent); }
      `}</style>

      {/* NAV */}
      <nav>
        <Link to="/" className="nav-logo">
          Ember <span className="ember-dot"></span>
        </Link>
        <ul className="nav-links">
          <li><a href="#how">How It Works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#stories">Stories</a></li>
        </ul>
        <Link to="/profile" className="nav-cta">Begin a Profile</Link>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">A Voice That Remembers</div>
            <h1 className="hero-title">Some memories<br/><em>never have to fade.</em></h1>
            <p className="hero-body">Ember is a gentle AI companion for those living with dementia — a warm, familiar voice that knows their stories, loves their family, and is always there to listen and remember.</p>
            <div className="hero-actions">
              <Link to="/profile" className="btn-primary">Create a Memory Profile <span>→</span></Link>
              <a href="#how" className="btn-secondary">See how it works ↓</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="waveform">
              {[...Array(7)].map((_, i) => <div key={i} className="waveform-bar"></div>)}
              <span className="waveform-label">Ember is listening…</span>
            </div>
            <div className="photo-frame photo-1"><div className="photo-inner"><div className="photo-icon">👵</div><div className="photo-caption">Summer at the lake, 1974</div></div></div>
            <div className="photo-frame photo-2"><div className="photo-inner"><div className="photo-icon">🌻</div><div className="photo-caption">Margaret's garden</div></div></div>
            <div className="photo-frame photo-3"><div className="photo-inner"><div className="photo-icon">🎵</div><div className="photo-caption">Her favourite song</div></div></div>
            <div className="quote-card">
              <p>"She smiled when it mentioned the roses. That was the first time in weeks."</p>
              <cite>— A daughter, California</cite>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-item"><span className="stat-number">55M</span><span className="stat-label">People living with dementia worldwide</span></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><span className="stat-number">1 in 3</span><span className="stat-label">Seniors die with dementia or Alzheimer's</span></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><span className="stat-number">∞</span><span className="stat-label">Memories worth preserving</span></div>
        </div>
      </div>

      {/* PULL QUOTE */}
      <div className="pull-quote-section">
        <div className="pull-quote-inner">
          <p className="pull-quote-text">"The hardest part isn't the forgetting. It's watching someone you love feel lost and alone, when all they need is a familiar voice."</p>
          <span className="pull-quote-attr">— Every family caregiver</span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="section-label">The Process</div>
        <h2 className="section-title">Simple for families.<br/><em>Profound for loved ones.</em></h2>
        <div className="how-grid">
          {[
            { n:'01', icon:'📖', title:'Build the Memory Profile', body:'Spend ten minutes telling Ember about your loved one — their family, their stories, their favourite memories. The more you share, the more personal Ember becomes.' },
            { n:'02', icon:'🔊', title:'Start a Conversation', body:'Your loved one simply presses one button. Ember greets them warmly by name, brings up familiar topics, and listens patiently — with no rush, no confusion, no judgment.' },
            { n:'03', icon:'🌿', title:'Stay Connected', body:'Families receive gentle summaries of each conversation. Update the memory profile anytime. Ember grows richer with every exchange.' },
          ].map(c => (
            <div className="how-card" key={c.n}>
              <div className="how-card-number">{c.n}</div>
              <div className="how-card-icon">{c.icon}</div>
              <h3 className="how-card-title">{c.title}</h3>
              <p className="how-card-body">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider"></div>

      {/* FEATURES */}
      <div className="features-section" id="features">
        <div className="features-inner">
          <div className="section-label">Built With Care</div>
          <h2 className="section-title">Every detail designed<br/><em>for dignity.</em></h2>
          <div className="features-grid">
            {[
              { icon:'🧠', title:'Powered by Amazon Nova Sonic', body:'Real-time, natural voice conversation with virtually no delay — so the interaction feels human, warm, and genuinely present.' },
              { icon:'💛', title:'Never Corrects, Always Validates', body:"Ember meets your loved one where they are — never correcting misremembered details, always affirming their feelings." },
              { icon:'🔒', title:'Private by Design', body:"Every memory profile is completely private and encrypted. Your family's stories belong to your family." },
              { icon:'🌙', title:'Available Any Hour', body:"Dementia doesn't follow a schedule. Sundowning, early mornings, middle-of-the-night anxiety — Ember is always there." },
              { icon:'👨‍👩‍👧', title:'Caregiver Dashboard', body:'A quiet window into your loved one\'s world. See what topics brought them joy today and how to make tomorrow even better.' },
              { icon:'🌍', title:'Multilingual Support', body:'For many people, the language of memory is not English. Ember speaks in the language your loved one is most comfortable in.' },
            ].map(f => (
              <div className="feature-item" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <div><h3 className="feature-title">{f.title}</h3><p className="feature-body">{f.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* STORIES */}
<div id="stories" style={{background:'var(--cream-dark)', padding:'7rem 4rem'}}>
  <div style={{maxWidth:'1200px', margin:'0 auto'}}>
    <div className="section-label">Real Voices</div>
    <h2 className="section-title">Words from those<br/><em>who understand.</em></h2>
    <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem', marginTop:'4rem'}}>
      {[
        {
          quote: "To love a person is to learn the song in their heart, and sing it to them when they have forgotten.",
          author: "Arne Garborg",
          role: "Poet & Author",
          icon: "🎵"
        },
        {
          quote: "The disease might hide the person underneath, but there's still a person in there who needs your love and attention.",
          author: "Jamie Calandriello",
          role: "Dementia Advocate",
          icon: "💛"
        },
        {
          quote: "Those with dementia are still people. They just need to be interacted with on a human level.",
          author: "Carey Mulligan",
          role: "Actress & Advocate",
          icon: "🌿"
        },
        {
          quote: "Dementia does not rob someone of their dignity. It's our reaction to them that does.",
          author: "Teepa Snow",
          role: "Dementia Care Specialist",
          icon: "🕯️"
        },
        {
          quote: "Though you may forget us, we will always remember you.",
          author: "Jennifer Green",
          role: "Caregiver & Author",
          icon: "🌹"
        },
        {
          quote: "While the final chapter of my life with dementia may be trying, nothing has diminished my gratitude for the countless blessings in my life.",
          author: "Sandra Day O'Connor",
          role: "Former U.S. Supreme Court Justice",
          icon: "⚖️"
        },
      ].map((t, i) => (
        <div key={i} style={{
          background:'var(--cream)',
          borderRadius:'20px',
          padding:'2.5rem 2rem',
          border:'1px solid rgba(212,184,150,0.25)',
          position:'relative',
          transition:'transform 0.3s, box-shadow 0.3s',
          cursor:'default',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 20px 60px rgba(74,55,40,0.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
        >
          {/* large quote mark */}
          <div style={{
            fontFamily:'Playfair Display, serif',
            fontSize:'5rem',
            color:'var(--tan)',
            position:'absolute',
            top:'0.5rem', left:'1.5rem',
            lineHeight:1,
            opacity:0.35,
            pointerEvents:'none',
          }}>"</div>

          <div style={{fontSize:'1.4rem', marginBottom:'1rem', paddingTop:'1.2rem'}}>{t.icon}</div>

          <p style={{
            fontFamily:'Lora, serif',
            fontStyle:'italic',
            fontSize:'0.97rem',
            lineHeight:1.85,
            color:'var(--text-soft)',
            marginBottom:'1.8rem',
          }}>{t.quote}</p>

          <div style={{display:'flex', alignItems:'center', gap:'0.8rem'}}>
            <div style={{
              width:'38px', height:'38px',
              borderRadius:'50%',
              background:'var(--cream-dark)',
              border:'1px solid rgba(212,184,150,0.3)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1rem', flexShrink:0,
            }}>{t.icon}</div>
            <div>
              <div style={{fontFamily:'Playfair Display, serif', fontSize:'0.95rem', color:'var(--brown-dark)'}}>{t.author}</div>
              <div style={{fontFamily:'Lora, serif', fontSize:'0.75rem', color:'var(--text-muted)'}}>{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

{/* QUICK ACCESS */}
<section style={{padding:'5rem 4rem', maxWidth:'1200px', margin:'0 auto'}}>
  <div className="section-label">Quick Access</div>
  <h2 className="section-title">Everything in <em>one place.</em></h2>
  <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.2rem', marginTop:'3rem'}}>
    {[
      { icon:'📖', title:'Memory Profile', desc:'Set up or update your loved one\'s personal memory profile.', to:'/profile', color:'#EDD5CE' },
      { icon:'🕯️', title:'Talk to Ember', desc:'Open the companion interface for your loved one to speak with Ember.', to:'/companion', color:'#E8D5A3' },
      { icon:'🏡', title:'Dashboard', desc:'View conversation summaries, mood tracking, and Ember\'s suggestions.', to:'/dashboard', color:'#D4E0D1' },
      { icon:'💬', title:'How It Works', desc:'Learn how Ember creates meaningful conversations from memories.', to:'#how', color:'rgba(212,184,150,0.3)' },
    ].map((card, i) => (
      <Link
        key={i}
        to={card.to}
        style={{textDecoration:'none'}}
      >
        <div
          style={{
            background:'var(--cream)',
            border:'1px solid rgba(212,184,150,0.3)',
            borderRadius:'20px',
            padding:'2rem 1.8rem',
            transition:'all 0.3s',
            height:'100%',
            cursor:'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-6px)';
            e.currentTarget.style.boxShadow = '0 20px 60px rgba(74,55,40,0.12)';
            e.currentTarget.style.borderColor = 'rgba(184,149,106,0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(212,184,150,0.3)';
          }}
        >
          <div style={{
            width:'52px', height:'52px', borderRadius:'14px',
            background: card.color,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'1.6rem', marginBottom:'1.2rem',
            transition:'transform 0.3s',
          }}>{card.icon}</div>
          <div style={{
            fontFamily:'Playfair Display, serif',
            fontSize:'1.1rem', color:'var(--brown-dark)',
            marginBottom:'0.5rem',
          }}>{card.title}</div>
          <div style={{
            fontFamily:'Lora, serif',
            fontSize:'0.83rem', color:'var(--text-soft)',
            lineHeight:1.7,
          }}>{card.desc}</div>
          <div style={{
            marginTop:'1.2rem',
            fontFamily:'Lora, serif',
            fontSize:'0.8rem',
            color:'var(--tan-deep)',
            display:'flex', alignItems:'center', gap:'0.3rem',
          }}>Go there →</div>
        </div>
      </Link>
    ))}
  </div>
</section>

      {/* CTA */}
      <section className="cta-section" id="start">
        <h2 className="cta-title">Give them a voice<br/>that <em>knows them</em> still.</h2>
        <p className="cta-body">Creating a memory profile takes ten minutes. The comfort it brings can last every day.</p>
        <div className="cta-actions">
          <Link to="/profile" className="btn-large">Create a Memory Profile →</Link>
          <a href="#how" className="btn-ghost">Learn more first</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="footer-logo">Ember <span className="ember-dot" style={{background:'var(--tan)'}}></span></div>
          <div className="footer-tagline">Memory lives on.</div>
        </div>
        <ul className="footer-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">How It Works</a></li>
          <li><a href="#">For Clinicians</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="footer-powered">Powered by Amazon Nova Sonic</div>
      </footer>
    </>
  );
}