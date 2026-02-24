import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEmber } from '../Context/EmberContext.js';

export default function Dashboard() {
  const [barWidths, setBarWidths] = useState([0,0,0,0,0,0,0]);

  const { profile } = useEmber();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const today = new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });

  useEffect(() => {
    setTimeout(() => setBarWidths([82,65,70,55,40,72,45]), 600);
  }, []);

  const moodDays = [
    { day:'Mon', width: barWidths[0], type:'joyful',  emoji:'😊' },
    { day:'Tue', width: barWidths[1], type:'calm',    emoji:'🌿' },
    { day:'Wed', width: barWidths[2], type:'calm',    emoji:'🌿' },
    { day:'Thu', width: barWidths[3], type:'joyful',  emoji:'😊' },
    { day:'Fri', width: barWidths[4], type:'calm',    emoji:'🌙' },
    { day:'Sat', width: barWidths[5], type:'calm',    emoji:'🌿' },
    { day:'Sun', width: barWidths[6], type:'anxious', emoji:'💛' },
  ];

  const moodFills = {
    joyful:  'linear-gradient(to right, #E8D5A3, #C9A84C)',
    calm:    'linear-gradient(to right, #D4E0D1, #9CAF96)',
    anxious: 'linear-gradient(to right, #EDD5CE, #D4A5A0)',
  };

  const convos = [
    { day:'Today', time:'9:14 AM', mood:'😊 Joyful', moodClass:'joyful', summary:'Talked about her rose garden and Thomas. Recalled a summer trip to Lake Tahoe in 1974 in vivid detail.', highlight:'"She could remember the colour of the tablecloth at dinner that night."', duration:'24 min' },
    { day:'Sun',   time:'7:42 PM', mood:'💛 A little anxious', moodClass:'anxious', summary:'Started the session unsettled. Ember redirected to favourite songs — mood lifted when Nat King Cole was mentioned.', highlight:null, duration:'18 min' },
    { day:'Sat',   time:'10:05 AM', mood:'🌿 Calm', moodClass:'calm', summary:'A quiet morning session about banana bread, her mother\'s recipe, and what Sundays felt like growing up in Charleston.', highlight:'"She hummed a little while she was talking."', duration:'31 min' },
    { day:'Fri',   time:'8:30 PM', mood:'🌙 Quiet', moodClass:'quiet', summary:'Short evening session. She was tired but wanted company. Ember kept things gentle and soft.', highlight:null, duration:'9 min' },
  ];

  const topics = [
    { label:'🌹 Rose garden', count:'12×' },
    { label:'💑 Thomas', count:'11×' },
    { label:'🎵 Nat King Cole', count:'9×' },
    { label:'🍞 Banana bread', count:'7×' },
    { label:'🏡 Charleston', count:'6×' },
    { label:'👶 Grandchildren', count:'5×' },
    { label:'☀️ Lake Tahoe', count:'4×' },
    { label:'✝️ Sunday church', count:'3×' },
  ];

  const suggestions = [
    { icon:'🌹', text: <><strong>Add more rose garden details.</strong> {profile.patientName} mentions the garden in nearly every session. Adding specific flower names and who helped her tend them would make Ember's responses even richer.</> },
    { icon:'🌙', text: <><strong>Sunday evenings seem harder.</strong> Consider adding specific song titles that help — Ember noticed music lifts her mood significantly during anxious moments.</> },
    { icon:'💑', text: <><strong>Tell Ember more about Thomas.</strong> He brings her great comfort. Adding a favourite story about him would give Ember something beautiful to reflect back.</> },
  ];

  const stats = [
    { icon:'💬', value:'14', label:'Conversations this month', delta:'↑ 3 more than last month', up:true },
    { icon:'⏱️', value:'6.2h', label:'Total time with Ember', delta:'↑ 40 min more this week', up:true },
    { icon:'😊', value:'78%', label:'Joyful or calm sessions', delta:'↑ Up from 65% last week', up:true },
    { icon:'🌙', value:'3', label:'Evening sessions', delta:'→ Same as last week', up:null },
  ];

  return (
    <>
      <style>{`
        .dash { display: flex; min-height: 100vh; background: var(--cream-dark); }

        /* SIDEBAR */
        .sidebar {
          width: 260px; min-height: 100vh;
          background: var(--brown-dark);
          display: flex; flex-direction: column;
          padding: 2.5rem 1.8rem;
          position: fixed; top:0; left:0; bottom:0;
          z-index: 50; overflow-y: auto;
        }
        .sidebar-logo {
          font-family: 'Playfair Display', serif; font-size: 1.5rem;
          color: var(--cream); display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.4rem; text-decoration: none;
        }
        .sidebar-tagline {
          font-family: 'Lora', serif; font-style: italic;
          font-size: 0.75rem; color: rgba(245,239,228,0.35);
          margin-bottom: 2.5rem;
        }
        .patient-card {
          background: rgba(245,239,228,0.07);
          border: 1px solid rgba(245,239,228,0.1);
          border-radius: 16px; padding: 1.2rem; margin-bottom: 2rem;
          transition: background 0.3s;
        }
        .patient-card:hover { background: rgba(245,239,228,0.1); }
        .patient-avatar {
          width: 48px; height: 48px; border-radius: 50%;
          background: linear-gradient(135deg, #EDD5CE, #E8D5A3);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; margin-bottom: 0.8rem;
        }
        .patient-name-card {
          font-family: 'Playfair Display', serif; font-size: 1rem;
          color: var(--cream); margin-bottom: 0.2rem;
        }
        .patient-detail {
          font-family: 'Lora', serif; font-size: 0.75rem;
          color: rgba(245,239,228,0.45);
          display: flex; align-items: center; gap: 0.4rem; margin-top: 0.2rem;
        }
        .status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #9CAF96; flex-shrink: 0;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        .sidebar-section-label {
          font-family: 'Lora', serif; font-size: 0.65rem;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(245,239,228,0.25); padding: 0.5rem 1rem 0.3rem; margin-top: 0.5rem;
        }
        .sidebar-nav { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; flex: 1; }
        .sidebar-nav li a {
          display: flex; align-items: center; gap: 0.8rem;
          padding: 0.75rem 1rem; border-radius: 10px;
          font-family: 'Lora', serif; font-size: 0.85rem;
          color: rgba(245,239,228,0.55); text-decoration: none;
          transition: all 0.25s;
        }
        .sidebar-nav li a:hover { background: rgba(245,239,228,0.07); color: rgba(245,239,228,0.85); }
        .sidebar-nav li.active a { background: rgba(245,239,228,0.12); color: var(--cream); }
        .nav-icon { font-size: 1rem; width: 20px; text-align: center; flex-shrink: 0; }
        .sidebar-bottom { margin-top: auto; padding-top: 1.5rem; border-top: 1px solid rgba(245,239,228,0.08); }
        .caregiver-info { display: flex; align-items: center; gap: 0.8rem; }
        .caregiver-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(245,239,228,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
        }
        .caregiver-name { font-family: 'Lora', serif; font-size: 0.82rem; color: rgba(245,239,228,0.6); }
        .caregiver-role { font-family: 'Lora', serif; font-size: 0.7rem; color: rgba(245,239,228,0.3); }

        /* MAIN */
        .dash-main { margin-left: 260px; flex: 1; padding: 3rem 3rem 4rem; }

        /* TOPBAR */
        .topbar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 2.5rem;
          opacity: 0; animation: fadeDown 0.7s ease forwards 0.1s;
        }
        .topbar-date { font-family: 'Cormorant Garamond', serif; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.3rem; }
        .topbar-title { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 400; color: var(--brown-dark); }
        .topbar-title em { font-style: italic; color: var(--tan-deep); }
        .topbar-actions { display: flex; align-items: center; gap: 1rem; }
        .btn-open-ember {
          font-family: 'Lora', serif; font-size: 0.85rem;
          background: var(--brown-dark); color: var(--cream);
          padding: 0.75rem 1.6rem; border-radius: 100px;
          text-decoration: none; display: flex; align-items: center; gap: 0.5rem;
          transition: all 0.3s; letter-spacing: 0.03em;
        }
        .btn-open-ember:hover { background: var(--brown); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(74,55,40,0.2); }
        .btn-outline {
          font-family: 'Lora', serif; font-size: 0.85rem;
          background: transparent; color: var(--text-soft);
          padding: 0.75rem 1.4rem; border-radius: 100px;
          text-decoration: none; border: 1px solid var(--border); transition: all 0.3s;
        }
        .btn-outline:hover { border-color: var(--tan-deep); color: var(--brown-dark); }

        /* HIGHLIGHT */
        .highlight {
          background: var(--brown-dark); border-radius: 24px;
          padding: 2.5rem 3rem; margin-bottom: 2rem;
          position: relative; overflow: hidden;
          opacity: 0; animation: fadeUp 0.7s ease forwards 0.2s;
        }
        .highlight::before {
          content: ''; position: absolute; top: -60px; right: -60px;
          width: 280px; height: 280px;
          background: radial-gradient(ellipse, rgba(212,184,150,0.1), transparent 70%);
          border-radius: 50%; pointer-events: none;
        }
        .highlight-label {
          font-family: 'Lora', serif; font-size: 0.72rem;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--tan); margin-bottom: 0.8rem;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .highlight-label::before { content: ''; width: 20px; height: 1px; background: var(--tan); display: block; }
        .highlight-title {
          font-family: 'Playfair Display', serif; font-size: 1.5rem;
          font-style: italic; color: var(--cream); margin-bottom: 0.6rem;
          max-width: 600px; line-height: 1.4;
        }
        .highlight-body {
          font-family: 'Lora', serif; font-size: 0.88rem;
          color: rgba(245,239,228,0.55); line-height: 1.75; max-width: 560px;
        }
        .highlight-pills { margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap; }
        .highlight-pill {
          font-family: 'Lora', serif; font-size: 0.75rem;
          padding: 0.4rem 1rem; border-radius: 100px;
          background: rgba(245,239,228,0.08);
          border: 1px solid rgba(245,239,228,0.12);
          color: rgba(245,239,228,0.55);
          display: flex; align-items: center; gap: 0.4rem;
        }

        /* STATS */
        .stats-row {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1rem; margin-bottom: 2rem;
        }
        .stat-card {
          background: var(--cream); border: 1px solid var(--border);
          border-radius: 18px; padding: 1.5rem 1.5rem 1.2rem;
          transition: transform 0.3s, box-shadow 0.3s;
          opacity: 0; animation: fadeUp 0.6s ease forwards;
        }
        .stat-card:nth-child(1) { animation-delay: 0.3s; }
        .stat-card:nth-child(2) { animation-delay: 0.38s; }
        .stat-card:nth-child(3) { animation-delay: 0.46s; }
        .stat-card:nth-child(4) { animation-delay: 0.54s; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(74,55,40,0.1); }
        .stat-icon { font-size: 1.4rem; margin-bottom: 0.8rem; display: block; }
        .stat-value { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 400; color: var(--brown-dark); line-height: 1; margin-bottom: 0.3rem; }
        .stat-label { font-family: 'Lora', serif; font-size: 0.75rem; color: var(--text-muted); }
        .stat-delta { font-family: 'Lora', serif; font-size: 0.72rem; margin-top: 0.5rem; }
        .delta-up { color: #6A8F66; }
        .delta-same { color: var(--text-muted); }

        /* TWO COL */
        .two-col { display: grid; grid-template-columns: 1.4fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }

        /* CARDS */
        .card {
          background: var(--cream); border: 1px solid var(--border);
          border-radius: 20px; overflow: hidden;
          opacity: 0; animation: fadeUp 0.6s ease forwards 0.5s;
        }
        .card-header {
          padding: 1.5rem 1.8rem 1.2rem; border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
        }
        .card-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: var(--brown-dark); }
        .card-subtitle { font-family: 'Lora', serif; font-style: italic; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem; }
        .card-action { font-family: 'Lora', serif; font-size: 0.75rem; color: var(--tan-deep); text-decoration: none; transition: color 0.3s; }
        .card-action:hover { color: var(--brown); }
        .card-body { padding: 0 1.8rem; }

        /* CONVO */
        .convo-entry {
          display: flex; gap: 1rem; padding: 1rem 0;
          border-bottom: 1px solid rgba(212,184,150,0.15);
          transition: background 0.2s;
          margin: 0 -1.8rem; padding-left: 1.8rem; padding-right: 1.8rem;
        }
        .convo-entry:last-child { border-bottom: none; }
        .convo-entry:hover { background: rgba(212,184,150,0.05); }
        .convo-date-col { min-width: 70px; }
        .convo-date { font-family: 'Cormorant Garamond', serif; font-size: 0.8rem; color: var(--text-muted); }
        .convo-time { font-family: 'Lora', serif; font-size: 0.7rem; color: rgba(160,140,122,0.6); }
        .convo-mood {
          display: inline-flex; align-items: center; gap: 0.3rem;
          font-family: 'Lora', serif; font-size: 0.72rem;
          padding: 0.2rem 0.7rem; border-radius: 100px; margin-bottom: 0.4rem;
        }
        .mood-joyful  { background: rgba(201,168,76,0.12);  color: #8a6a20; }
        .mood-calm    { background: rgba(156,175,150,0.15); color: #6A8F66; }
        .mood-anxious { background: rgba(212,165,160,0.15); color: #8a4a44; }
        .mood-quiet   { background: rgba(160,140,122,0.12); color: var(--text-soft); }
        .convo-summary { font-family: 'Lora', serif; font-size: 0.85rem; color: var(--text-soft); line-height: 1.65; }
        .convo-highlight { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.92rem; color: var(--tan-deep); margin-top: 0.3rem; }
        .convo-duration { font-family: 'Lora', serif; font-size: 0.7rem; color: var(--text-muted); margin-top: 0.4rem; }

        /* MOOD CHART */
        .mood-chart { display: flex; flex-direction: column; gap: 0.9rem; padding: 1.5rem 1.8rem; }
        .mood-row { display: flex; align-items: center; gap: 0.8rem; }
        .mood-day { font-family: 'Lora', serif; font-size: 0.72rem; color: var(--text-muted); width: 30px; text-align: right; flex-shrink: 0; }
        .mood-track { flex: 1; height: 8px; background: rgba(212,184,150,0.2); border-radius: 100px; overflow: hidden; }
        .mood-fill { height: 100%; border-radius: 100px; transition: width 1s cubic-bezier(0.4,0,0.2,1); }
        .mood-emoji { font-size: 0.85rem; width: 20px; text-align: center; flex-shrink: 0; }

        /* TOPICS */
        .topics-wrap { display: flex; flex-wrap: wrap; gap: 0.6rem; padding: 1.5rem 1.8rem; }
        .topic-pill {
          font-family: 'Lora', serif; font-size: 0.78rem;
          padding: 0.45rem 1rem; border-radius: 100px;
          border: 1px solid var(--border); background: var(--cream-dark);
          color: var(--text-soft); display: flex; align-items: center; gap: 0.4rem;
          transition: all 0.25s; cursor: default;
        }
        .topic-pill:hover { border-color: var(--tan-deep); background: var(--cream); color: var(--brown); }
        .topic-count { font-family: 'Cormorant Garamond', serif; font-size: 0.72rem; color: var(--text-muted); background: rgba(212,184,150,0.2); padding: 0.1rem 0.4rem; border-radius: 100px; }

        /* SUGGESTIONS */
        .suggestion-list { display: flex; flex-direction: column; gap: 0.8rem; padding: 1.5rem 1.8rem; }
        .suggestion-item {
          display: flex; gap: 1rem; align-items: flex-start;
          padding: 1rem 1.2rem;
          background: var(--cream-mid); border: 1px solid var(--border);
          border-radius: 14px; transition: all 0.25s; cursor: default;
        }
        .suggestion-item:hover { border-color: var(--tan-deep); background: var(--cream); transform: translateX(4px); }
        .suggestion-icon { font-size: 1.2rem; flex-shrink: 0; margin-top: 0.1rem; }
        .suggestion-text { font-family: 'Lora', serif; font-size: 0.85rem; color: var(--text-soft); line-height: 1.6; }
        .suggestion-text strong { font-weight: 500; color: var(--brown-dark); }
      `}</style>

      <div className="dash">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <Link to="/" className="sidebar-logo">Ember <span className="ember-dot"></span></Link>
          <div className="sidebar-tagline">Memory lives on.</div>

          <div className="patient-card">
            <div className="patient-avatar">👵</div>
            <div className="patient-name-card">{profile.patientFullName}</div>
            <div className="patient-detail"><span className="status-dot"></span>Active today · 24 min</div>
            <div className="patient-detail">Early stage · English</div>
          </div>

          <ul className="sidebar-nav">
            <li className="active"><a href="#"><span className="nav-icon">🏡</span> Overview</a></li>
            <li><a href="#"><span className="nav-icon">💬</span> Conversations</a></li>
            <li><a href="#"><span className="nav-icon">🌿</span> Mood & Wellbeing</a></li>
            <div className="sidebar-section-label">Profile</div>
            <li><Link to="/profile"><span className="nav-icon">📖</span> Memory Profile</Link></li>
            <li><a href="#"><span className="nav-icon">👨‍👩‍👧</span> Family Members</a></li>
            <li><a href="#"><span className="nav-icon">⚙️</span> Ember Settings</a></li>
            <div className="sidebar-section-label">Account</div>
            <li><a href="#"><span className="nav-icon">🔔</span> Notifications</a></li>
            <li><a href="#"><span className="nav-icon">🔒</span> Privacy & Data</a></li>
          </ul>

          <div className="sidebar-bottom">
            <div className="caregiver-info">
              <div className="caregiver-avatar">🌸</div>
              <div>
                <div className="caregiver-name">{profile.caregiverName}</div>
                <div className="caregiver-role">{profile.caregiverRelation} · Primary Caregiver</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="dash-main">

          {/* TOPBAR */}
          <div className="topbar">
            <div>
              <div className="topbar-date">{today}</div>
              <h1 className="topbar-title">{greeting()}, <em>{profile.caregiverName}.</em></h1>
            </div>
            <div className="topbar-actions">
              <Link to="/profile" className="btn-outline">✏️ Update Profile</Link>
              <Link to="/companion" className="btn-open-ember">🕯️ Open Ember for {profile.patientName}</Link>
            </div>
          </div>

          {/* HIGHLIGHT */}
          <div className="highlight">
            <div className="highlight-label">Today's moment</div>
            <div className="highlight-title">"She laughed when Ember mentioned the roses — a real, full laugh."</div>
            <div className="highlight-body">This morning's conversation touched on {profile.patientName}'s garden and her late husband Thomas. Ember noticed her tone lift significantly when the rose garden came up. She spoke for nearly eight minutes about the summer of 1974. A beautiful session.</div>
            <div className="highlight-pills">
              <div className="highlight-pill">🕯️ 24 min conversation</div>
              <div className="highlight-pill">🌅 9:14 AM</div>
              <div className="highlight-pill">😊 Joyful mood</div>
            </div>
          </div>

          {/* STATS */}
          <div className="stats-row">
            {stats.map((s, i) => (
              <div key={i} className="stat-card">
                <span className="stat-icon">{s.icon}</span>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
                <div className={`stat-delta ${s.up === true ? 'delta-up' : 'delta-same'}`}>{s.delta}</div>
              </div>
            ))}
          </div>

          {/* TWO COL */}
          <div className="two-col">

            {/* Conversation Log */}
            <div className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">Recent Conversations</div>
                  <div className="card-subtitle">What {profile.patientName} and Ember talked about</div>
                </div>
                <a href="#" className="card-action">View all →</a>
              </div>
              <div className="card-body">
                {convos.map((c, i) => (
                  <div key={i} className="convo-entry">
                    <div className="convo-date-col">
                      <div className="convo-date">{c.day}</div>
                      <div className="convo-time">{c.time}</div>
                    </div>
                    <div>
                      <div className={`convo-mood mood-${c.moodClass}`}>{c.mood}</div>
                      <div className="convo-summary">{c.summary}</div>
                      {c.highlight && <div className="convo-highlight">{c.highlight}</div>}
                      <div className="convo-duration">🕯️ {c.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right col */}
            <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>

              {/* Mood Chart */}
              <div className="card" style={{animationDelay:'0.6s'}}>
                <div className="card-header">
                  <div>
                    <div className="card-title">Mood This Week</div>
                    <div className="card-subtitle">How each session felt</div>
                  </div>
                </div>
                <div className="mood-chart">
                  {moodDays.map((m, i) => (
                    <div key={i} className="mood-row">
                      <div className="mood-day">{m.day}</div>
                      <div className="mood-track">
                        <div className="mood-fill" style={{ width:`${m.width}%`, background: moodFills[m.type] }}></div>
                      </div>
                      <div className="mood-emoji">{m.emoji}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div className="card" style={{animationDelay:'0.7s'}}>
                <div className="card-header">
                  <div>
                    <div className="card-title">Topics She Loves</div>
                    <div className="card-subtitle">What lights {profile.patientName} up</div>
                  </div>
                </div>
                <div className="topics-wrap">
                  {topics.map((t, i) => (
                    <div key={i} className="topic-pill">{t.label} <span className="topic-count">{t.count}</span></div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Suggestions */}
          <div className="card" style={{animationDelay:'0.8s'}}>
            <div className="card-header">
              <div>
                <div className="card-title">Ember's Suggestions for You</div>
                <div className="card-subtitle">Small ways to make tomorrow even warmer</div>
              </div>
            </div>
            <div className="suggestion-list">
              {suggestions.map((s, i) => (
                <div key={i} className="suggestion-item">
                  <div className="suggestion-icon">{s.icon}</div>
                  <div className="suggestion-text">{s.text}</div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </>
  );
}