import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEmber } from '../Context/EmberContext.js';

export default function Profile() {
  const [openCard, setOpenCard] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false, false]);
  const [familyMembers, setFamilyMembers] = useState([{ name: '', relation: '' }]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedToggles, setSelectedToggles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const { profile, updateProfile } = useEmber();

  const toggleCard = (i) => setOpenCard(openCard === i ? null : i);

  const markComplete = (i) => {
    const updated = [...completed];
    updated[i] = true;
    setCompleted(updated);
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleItem = (item) => {
    setSelectedToggles(prev =>
      prev.includes(item) ? prev.filter(t => t !== item) : [...prev, item]
    );
  };

  const addMember = () => setFamilyMembers([...familyMembers, { name: '', relation: '' }]);
  const removeMember = (i) => {
    if (familyMembers.length > 1) {
      setFamilyMembers(familyMembers.filter((_, idx) => idx !== i));
    }
  };
  const updateMember = (i, field, value) => {
    const updated = [...familyMembers];
    updated[i][field] = value;
    setFamilyMembers(updated);
  };

  const completedCount = completed.filter(Boolean).length;
  const progressPct = (completedCount / 6) * 100;

  const interests = ['🌱 Gardening','🎵 Music','📚 Reading','🧶 Knitting','🍳 Cooking','✝️ Faith','🎨 Art','🃏 Cards & Games','⚾ Sports','🌍 Travel','🎬 Films','🌺 Nature'];
  const comfortItems = ['🌹 Talking about their garden','🎵 Mentioning favourite songs','👶 Stories about grandchildren','✝️ Faith and prayer','🏡 Memories of home','🐾 Talking about their pets'];
  const anxietyItems = ['💔 Recent losses or grief','🏥 Medical topics or diagnoses','📰 Current events or news','💸 Finances or bills'];
  const timeTags = ['🌅 Early morning','🌞 Daytime','🌆 Late afternoon','🌙 Evening (sundowning)','🌑 Middle of the night'];

  const cards = [
  { icon: '🌸', bg: '#D4E0D1', title: 'About You', subtitle: 'The caregiver setting up this profile' },
  { icon: '👵', bg: '#EDD5CE', title: 'About Them', subtitle: 'The person Ember will care for' },
  { icon: '👨‍👩‍👧', bg: '#E8D5A3', title: 'Family & Loved Ones', subtitle: 'The people who matter most to them' },
  { icon: '📖', bg: 'rgba(212,184,150,0.3)', title: 'Favourite Memories & Stories', subtitle: 'The moments that made them who they are' },
  { icon: '🌿', bg: '#D4E0D1', title: 'Daily Routines & Preferences', subtitle: 'The rhythms that bring them comfort' },
  { icon: '🕯️', bg: 'rgba(122,92,62,0.12)', title: 'Comfort & Sensitivity', subtitle: 'What soothes them, and what to gently avoid' },
];

  return (
    <>
      <style>{`
        .profile-page { background: var(--cream); min-height: 100vh; }
        .profile-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 1.4rem 4rem;
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(245,239,228,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .profile-nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 500;
          color: var(--brown-dark); text-decoration: none;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .nav-back {
          font-family: 'Lora', serif; font-size: 0.85rem;
          color: var(--text-soft); text-decoration: none;
          letter-spacing: 0.04em; display: flex; align-items: center; gap: 0.4rem;
          transition: color 0.3s;
        }
        .nav-back:hover { color: var(--brown-dark); }
        .page-header {
          padding: 9rem 4rem 4rem;
          max-width: 760px; margin: 0 auto; text-align: center;
        }
        .page-eyebrow {
          font-family: 'Lora', serif; font-size: 0.75rem;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--tan-deep); margin-bottom: 1.2rem;
          display: flex; align-items: center; justify-content: center; gap: 0.8rem;
          animation: fadeUp 0.7s ease forwards;
        }
        .page-eyebrow::before, .page-eyebrow::after {
          content: ''; display: block; width: 28px; height: 1px; background: var(--tan-deep);
        }
        .page-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.4rem); font-weight: 400;
          line-height: 1.15; color: var(--brown-dark); margin-bottom: 1.2rem;
          opacity: 0; animation: fadeUp 0.8s ease forwards 0.15s;
        }
        .page-title em { font-style: italic; color: var(--tan-deep); }
        .page-subtitle {
          font-family: 'Lora', serif; font-style: italic;
          font-size: 1.05rem; line-height: 1.8; color: var(--text-soft);
          opacity: 0; animation: fadeUp 0.8s ease forwards 0.3s;
        }
        .progress-wrap {
          max-width: 760px; margin: 0 auto 1rem; padding: 0 4rem;
          opacity: 0; animation: fadeUp 0.8s ease forwards 0.45s;
        }
        .progress-header {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;
        }
        .progress-label {
          font-family: 'Lora', serif; font-size: 0.78rem;
          color: var(--text-muted); letter-spacing: 0.06em; text-transform: uppercase;
        }
        .progress-count {
          font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; color: var(--tan-deep);
        }
        .progress-track {
          width: 100%; height: 3px;
          background: rgba(212,184,150,0.25); border-radius: 100px; overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: linear-gradient(to right, var(--tan), var(--tan-deep));
          border-radius: 100px;
          transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
        }
        .form-area {
          max-width: 760px; margin: 0 auto;
          padding: 1.5rem 4rem 6rem;
          display: flex; flex-direction: column; gap: 1rem;
        }
        .acc-card {
          background: var(--cream);
          border: 1px solid var(--border);
          border-radius: 20px; overflow: hidden;
          transition: box-shadow 0.4s, border-color 0.4s;
        }
        .acc-card.open { border-color: rgba(184,149,106,0.5); box-shadow: 0 8px 40px rgba(74,55,40,0.10); }
        .acc-card:hover { box-shadow: 0 16px 56px rgba(74,55,40,0.14); border-color: rgba(184,149,106,0.4); }
        .acc-header {
          padding: 1.8rem 2rem;
          display: flex; align-items: center; justify-content: space-between;
          cursor: pointer; user-select: none; transition: background 0.3s; gap: 1rem;
        }
        .acc-header:hover { background: rgba(212,184,150,0.06); }
        .acc-card.open .acc-header { background: rgba(212,184,150,0.08); border-bottom: 1px solid var(--border); }
        .acc-left { display: flex; align-items: center; gap: 1.2rem; }
        .acc-icon-wrap {
          width: 48px; height: 48px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; flex-shrink: 0; transition: transform 0.3s;
        }
        .acc-card:hover .acc-icon-wrap, .acc-card.open .acc-icon-wrap { transform: scale(1.08); }
        .acc-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 500; color: var(--brown-dark); margin-bottom: 0.2rem; }
        .acc-subtitle { font-family: 'Lora', serif; font-size: 0.8rem; color: var(--text-muted); font-style: italic; }
        .acc-right { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }
        .acc-badge {
          font-family: 'Lora', serif; font-size: 0.72rem;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 0.3rem 0.8rem; border-radius: 100px;
          background: #D4E0D1; color: #6A8F66;
          transition: opacity 0.4s;
        }
        .acc-chevron {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), background 0.3s, border-color 0.3s;
          color: var(--text-muted); font-size: 0.75rem;
        }
        .acc-card.open .acc-chevron { background: var(--tan-deep); border-color: var(--tan-deep); color: white; }
        .acc-body { overflow: hidden; transition: max-height 0.55s cubic-bezier(0.4,0,0.2,1); }
        .acc-content { padding: 2rem 2rem 2.5rem; display: flex; flex-direction: column; gap: 1.4rem; }
        .field { display: flex; flex-direction: column; gap: 0.5rem; }
        .field-row { display: grid; gap: 1.2rem; }
        .field-row.cols-2 { grid-template-columns: 1fr 1fr; }
        .field-row.cols-3 { grid-template-columns: 1fr 1fr 1fr; }
        label { font-family: 'Lora', serif; font-size: 0.8rem; color: var(--text-soft); letter-spacing: 0.05em; text-transform: uppercase; }
        label .optional { color: var(--text-muted); font-style: italic; text-transform: none; letter-spacing: 0; font-size: 0.75rem; margin-left: 0.3rem; }
        input[type="text"], input[type="number"], select, textarea {
          font-family: 'Lora', serif; font-size: 0.95rem; color: var(--text-main);
          background: var(--cream-dark); border: 1px solid var(--border);
          border-radius: 12px; padding: 0.85rem 1.1rem;
          transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
          outline: none; width: 100%; resize: none;
        }
        input::placeholder, textarea::placeholder { color: var(--text-muted); font-style: italic; }
        input:focus, select:focus, textarea:focus {
          border-color: var(--tan-deep); background: var(--cream);
          box-shadow: 0 0 0 3px rgba(184,149,106,0.12);
        }
        select { appearance: none; cursor: pointer; }
        textarea { min-height: 100px; line-height: 1.7; }
        .field-hint { font-family: 'Lora', serif; font-size: 0.75rem; font-style: italic; color: var(--text-muted); line-height: 1.5; }
        .family-member {
          display: grid; grid-template-columns: 1fr 1fr auto;
          gap: 0.8rem; align-items: center;
          padding: 1rem 1.2rem;
          background: var(--cream-mid); border: 1px solid var(--border);
          border-radius: 14px; transition: border-color 0.3s, box-shadow 0.3s;
        }
        .family-member:focus-within { border-color: var(--tan-deep); box-shadow: 0 0 0 3px rgba(184,149,106,0.1); }
        .remove-btn {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(212,184,150,0.4); background: transparent;
          color: var(--text-muted); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; transition: all 0.25s; flex-shrink: 0;
        }
        .remove-btn:hover { background: #EDD5CE; border-color: #D4A5A0; color: #9a5a55; }
        .add-btn {
          font-family: 'Lora', serif; font-size: 0.85rem;
          color: var(--tan-deep); background: transparent;
          border: 1px dashed rgba(184,149,106,0.5); border-radius: 12px;
          padding: 0.8rem 1.2rem; cursor: pointer; width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: all 0.3s; letter-spacing: 0.03em;
        }
        .add-btn:hover { background: rgba(184,149,106,0.07); border-color: var(--tan-deep); color: var(--brown); }
        .tag-wrap { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.3rem; }
        .tag {
          font-family: 'Lora', serif; font-size: 0.8rem;
          padding: 0.4rem 1rem; border-radius: 100px;
          border: 1px solid var(--border); background: var(--cream-dark);
          color: var(--text-soft); cursor: pointer; transition: all 0.25s; user-select: none;
        }
        .tag:hover { border-color: var(--tan-deep); color: var(--brown); }
        .tag.selected { background: var(--brown-dark); border-color: var(--brown-dark); color: var(--cream); }
        .toggle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; }
        .toggle-item {
          display: flex; align-items: center; gap: 0.8rem;
          padding: 0.8rem 1rem; border-radius: 12px;
          border: 1px solid var(--border); cursor: pointer;
          transition: all 0.25s; background: var(--cream-mid); user-select: none;
        }
        .toggle-item:hover { border-color: var(--tan-deep); }
        .toggle-item.comfort.selected { background: rgba(156,175,150,0.2); border-color: #9CAF96; }
        .toggle-item.anxiety.selected { background: rgba(212,165,160,0.2); border-color: #D4A5A0; }
        .toggle-label { font-family: 'Lora', serif; font-size: 0.85rem; color: var(--text-soft); }
        .toggle-item.comfort.selected .toggle-label { color: #5a7a55; }
        .toggle-item.anxiety.selected .toggle-label { color: #9a5a55; }
        .toggle-check {
          margin-left: auto; width: 18px; height: 18px; border-radius: 50%;
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.65rem; transition: all 0.25s; flex-shrink: 0;
        }
        .toggle-item.selected .toggle-check { background: var(--brown-dark); border-color: var(--brown-dark); color: white; }
        .field-divider {
          display: flex; align-items: center; gap: 1rem;
          color: var(--text-muted); font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-size: 0.85rem;
        }
        .field-divider::before, .field-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
        .submit-area {
          max-width: 760px; margin: 0 auto 5rem; padding: 0 4rem;
          display: flex; flex-direction: column; align-items: center; gap: 1.2rem;
        }
        .submit-note { font-family: 'Lora', serif; font-style: italic; font-size: 0.85rem; color: var(--text-muted); text-align: center; line-height: 1.7; }
        .btn-submit {
          font-family: 'Lora', serif; font-size: 1rem;
          background: var(--brown-dark); color: var(--cream);
          padding: 1.1rem 3rem; border-radius: 100px; border: none;
          cursor: pointer; letter-spacing: 0.04em; transition: all 0.3s;
          display: flex; align-items: center; gap: 0.7rem;
        }
        .btn-submit:hover { background: var(--brown); transform: translateY(-2px); box-shadow: 0 12px 36px rgba(74,55,40,0.25); }
        .success-overlay {
          position: fixed; inset: 0;
          background: rgba(245,239,228,0.97);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          z-index: 1000; text-align: center; padding: 2rem;
          animation: fadeIn 0.6s ease forwards;
        }
        .success-ember { font-size: 4rem; margin-bottom: 1.5rem; animation: ember-glow 2s ease-in-out infinite; }
        @keyframes ember-glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(201,168,76,0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(201,168,76,0.8)); }
        }
        .success-title { font-family: 'Playfair Display', serif; font-size: 2.8rem; font-weight: 400; color: var(--brown-dark); margin-bottom: 1rem; }
        .success-title em { font-style: italic; color: var(--tan-deep); }
        .success-body { font-family: 'Lora', serif; font-style: italic; font-size: 1.05rem; color: var(--text-soft); max-width: 420px; line-height: 1.8; margin-bottom: 2.5rem; }
        .btn-start-ember {
          font-family: 'Lora', serif; font-size: 1rem;
          background: var(--brown-dark); color: var(--cream);
          padding: 1.1rem 2.8rem; border-radius: 100px;
          text-decoration: none; letter-spacing: 0.04em; transition: all 0.3s;
          display: inline-flex; align-items: center; gap: 0.6rem;
        }
        .btn-start-ember:hover { background: var(--brown); transform: translateY(-2px); box-shadow: 0 12px 36px rgba(74,55,40,0.25); }
        .profile-footer {
          background: var(--brown-dark); padding: 2.5rem 4rem;
          display: flex; align-items: center; justify-content: space-between;
        }
        .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: var(--cream); display: flex; align-items: center; gap: 0.5rem; }
        .footer-text { font-family: 'Lora', serif; font-size: 0.78rem; color: rgba(245,239,228,0.35); }
      `}</style>

      <div className="profile-page">
        {/* NAV */}
        <nav className="profile-nav">
          <Link to="/" className="profile-nav-logo">Ember <span className="ember-dot"></span></Link>
          <Link to="/" className="nav-back">← Back to home</Link>
        </nav>

        {/* HEADER */}
        <div className="page-header">
          <div className="page-eyebrow">Memory Profile</div>
          <h1 className="page-title">Tell us about <em>someone you love.</em></h1>
          <p className="page-subtitle">Every detail you share becomes part of how Ember knows them. Take your time. This is a gift.</p>
        </div>

        {/* PROGRESS */}
        <div className="progress-wrap">
          <div className="progress-header">
            <span className="progress-label">Profile completeness</span>
            <span className="progress-count">{completedCount} of 6 sections</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>

        {/* CARDS */}
        <div className="form-area">
          {cards.map((card, i) => (
            <div key={i} className={`acc-card ${openCard === i ? 'open' : ''}`}>
              <div className="acc-header" onClick={() => toggleCard(i)}>
                <div className="acc-left">
                  <div className="acc-icon-wrap" style={{ background: card.bg }}>{card.icon}</div>
                  <div>
                    <div className="acc-title">{card.title}</div>
                    <div className="acc-subtitle">{card.subtitle}</div>
                  </div>
                </div>
                <div className="acc-right">
                  {completed[i] && <span className="acc-badge">✓ Complete</span>}
                  <div className="acc-chevron">{openCard === i ? '▲' : '▼'}</div>
                </div>
              </div>

              <div className="acc-body" style={{ maxHeight: openCard === i ? '1200px' : '0' }}>
                <div className="acc-content">

                  {/* CARD 0 — About You (Caregiver) */}
{i === 0 && <>
  <div className="field-row cols-2">
    <div className="field">
      <label>Your Name</label>
      <input type="text" placeholder="e.g. Sarah Mitchell"
        onChange={e => { updateProfile({ caregiverName: e.target.value }); markComplete(0); }}
      />
    </div>
    <div className="field">
      <label>Your Relationship to Them</label>
      <select onChange={e => updateProfile({ caregiverRelation: e.target.value })}>
        <option value="" disabled defaultValue="">Select relationship</option>
        <option>Son</option>
        <option>Daughter</option>
        <option>Spouse / Partner</option>
        <option>Grandchild</option>
        <option>Sibling</option>
        <option>Professional Caregiver</option>
        <option>Other</option>
      </select>
    </div>
  </div>
  <div className="field-row cols-2">
    <div className="field">
      <label>Your Email <span className="optional">(for conversation summaries)</span></label>
      <input type="text" placeholder="e.g. sarah@email.com"/>
    </div>
    <div className="field">
      <label>How did you hear about Ember? <span className="optional">(optional)</span></label>
      <select>
        <option value="" disabled defaultValue="">Select one</option>
        <option>Doctor or clinician</option>
        <option>Family or friend</option>
        <option>Online search</option>
        <option>Social media</option>
        <option>Other</option>
      </select>
    </div>
  </div>
</>}

{/* CARD 1 — About Them (Patient) */}
{i === 1 && <>
  <div className="field-row cols-2">
    <div className="field">
      <label>Full Name</label>
      <input type="text" placeholder="e.g. Margaret Eleanor Webb"
        onChange={e => { updateProfile({ patientFullName: e.target.value }); markComplete(1); }}
      />
    </div>
    <div className="field">
      <label>Preferred Name <span className="optional">(what they like to be called)</span></label>
      <input type="text" placeholder="e.g. Maggie"
        onChange={e => updateProfile({ patientName: e.target.value })}
      />
    </div>
  </div>
  <div className="field-row cols-3">
    <div className="field"><label>Age</label><input type="number" placeholder="78" min="1" max="120"/></div>
    <div className="field"><label>Stage of Dementia</label>
      <select><option value="" disabled defaultValue="">Select stage</option>
        <option>Early stage</option><option>Middle stage</option>
        <option>Late stage</option><option>Unsure / not diagnosed</option>
      </select>
    </div>
    <div className="field"><label>Primary Language</label>
      <select onChange={e => updateProfile({ patientLanguage: e.target.value })}>
        <option value="" disabled defaultValue="">Select language</option>
        <option>English</option><option>Spanish</option><option>French</option>
        <option>Mandarin</option><option>Arabic</option><option>Other</option>
      </select>
    </div>
  </div>
  <div className="field-row cols-2">
    <div className="field"><label>Hometown</label><input type="text" placeholder="e.g. Charleston, South Carolina"/></div>
    <div className="field"><label>Occupation <span className="optional">(what they did for work)</span></label><input type="text" placeholder="e.g. Schoolteacher, 1962–1995"/></div>
  </div>
  <div className="field"><label>A sentence that describes them</label>
    <textarea placeholder="e.g. A warm, gentle soul who loved gardening, made the best banana bread in the county…"></textarea>
    <span className="field-hint">Ember will use this to shape its entire personality with them.</span>
  </div>
</>}

                  {/* CARD 1 */}
                  {i === 1 && <>
                    <p className="field-hint" style={{fontSize:'0.85rem', color:'var(--text-soft)', lineHeight:1.7}}>Add the names and relationships of people they love. Ember will use these to ask about them and make your loved one feel surrounded by family.</p>
                    <div style={{display:'flex', flexDirection:'column', gap:'0.8rem'}}>
                      {familyMembers.map((m, idx) => (
                        <div key={idx} className="family-member">
                          <input type="text" placeholder="Name" value={m.name} onChange={e => { updateMember(idx, 'name', e.target.value); markComplete(1); }}/>
                          <select value={m.relation} onChange={e => updateMember(idx, 'relation', e.target.value)}>
                            <option value="" disabled>Relationship</option>
                            <option>Spouse / Partner</option><option>Son</option><option>Daughter</option>
                            <option>Grandchild</option><option>Sibling</option><option>Close Friend</option><option>Other</option>
                          </select>
                          <button className="remove-btn" onClick={() => removeMember(idx)}>×</button>
                        </div>
                      ))}
                    </div>
                    <button className="add-btn" onClick={addMember}>+ Add another person</button>
                    <div className="field-divider">a little more</div>
                    <div className="field"><label>Pets <span className="optional">(past or present)</span></label><input type="text" placeholder="e.g. Biscuit, a golden retriever they had for 12 years"/></div>
                  </>}

                  {/* CARD 2 */}
                  {i === 2 && <>
                    <div className="field"><label>Their happiest memory</label><textarea placeholder="e.g. Every summer the whole family would drive to Lake Tahoe…" onChange={() => markComplete(2)}></textarea></div>
                    <div className="field"><label>A story they love to tell</label><textarea placeholder="e.g. She always told the story of how she met Thomas at a church dance in 1961…"></textarea></div>
                    <div className="field-divider">their favourite things</div>
                    <div className="field">
                      <label>Hobbies & Interests</label>
                      <div className="tag-wrap">
                        {interests.map(tag => (
                          <span key={tag} className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`} onClick={() => { toggleTag(tag); markComplete(2); }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="field-row cols-2">
                      <div className="field"><label>Favourite music or artists</label><input type="text" placeholder="e.g. Frank Sinatra, Nat King Cole"/></div>
                      <div className="field"><label>Favourite foods</label><input type="text" placeholder="e.g. Peach cobbler, sweet tea, biscuits"/></div>
                    </div>
                  </>}

                  {/* CARD 3 */}
                  {i === 3 && <>
                    <div className="field-row cols-2">
                      <div className="field"><label>Morning routine</label><textarea placeholder="e.g. Always had coffee before anything else. Liked to sit by the kitchen window…" style={{minHeight:'80px'}} onChange={() => markComplete(3)}></textarea></div>
                      <div className="field"><label>Evening routine</label><textarea placeholder="e.g. Watched the evening news, then Wheel of Fortune…" style={{minHeight:'80px'}}></textarea></div>
                    </div>
                    <div className="field">
                      <label>When Ember is most needed</label>
                      <div className="tag-wrap">
                        {timeTags.map(tag => (
                          <span key={tag} className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`} onClick={() => toggleTag(tag)}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="field"><label>How they prefer to be spoken to</label>
                      <select><option value="" disabled defaultValue="">Select a style</option>
                        <option>Warm and gentle — soft voice, short sentences</option>
                        <option>Cheerful and upbeat — light and positive</option>
                        <option>Calm and slow — very patient, no rushing</option>
                        <option>Familiar and casual — like talking to a friend</option>
                      </select>
                    </div>
                  </>}

                  {/* CARD 4 */}
                  {i === 4 && <>
                    <div className="field">
                      <label>Things that bring deep comfort</label>
                      <p className="field-hint" style={{marginBottom:'0.6rem'}}>Ember will bring these up when your loved one seems anxious or upset.</p>
                      <div className="toggle-grid">
                        {comfortItems.map(item => (
                          <div key={item} className={`toggle-item comfort ${selectedToggles.includes(item) ? 'selected' : ''}`} onClick={() => { toggleItem(item); markComplete(4); }}>
                            <span>{item.split(' ')[0]}</span>
                            <span className="toggle-label">{item.split(' ').slice(1).join(' ')}</span>
                            <span className="toggle-check">{selectedToggles.includes(item) ? '✓' : ''}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="field-divider">what to avoid</div>
                    <div className="field">
                      <label>Topics that cause distress</label>
                      <p className="field-hint" style={{marginBottom:'0.6rem'}}>Ember will gently steer away from these.</p>
                      <div className="toggle-grid">
                        {anxietyItems.map(item => (
                          <div key={item} className={`toggle-item anxiety ${selectedToggles.includes(item) ? 'selected' : ''}`} onClick={() => toggleItem(item)}>
                            <span>{item.split(' ')[0]}</span>
                            <span className="toggle-label">{item.split(' ').slice(1).join(' ')}</span>
                            <span className="toggle-check">{selectedToggles.includes(item) ? '✓' : ''}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="field"><label>Anything else Ember should know</label><textarea placeholder="e.g. She sometimes thinks she's late for work. Please don't correct her — just gently redirect to something she loves…"></textarea></div>
                  </>}

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUBMIT */}
        <div className="submit-area">
          <p className="submit-note">When you're ready, Ember will use everything you've shared to become a warm, personal companion — patient, kind, and always there.</p>
          <button className="btn-submit" onClick={() => setShowSuccess(true)}>🕯️ Create Their Memory Profile</button>
        </div>

        {/* SUCCESS */}
        {showSuccess && (
          <div className="success-overlay">
            <div className="success-ember">🕯️</div>
            <h2 className="success-title">Ember is <em>ready.</em></h2>
            <p className="success-body">Their memories are safe with us. Whenever they need a familiar voice, Ember will be there — warm, patient, and filled with everything you've shared.</p>
            <Link to="/companion" className="btn-start-ember">Begin Their First Conversation →</Link>
          </div>
        )}

        {/* FOOTER */}
        <footer className="profile-footer">
          <div className="footer-logo">Ember <span className="ember-dot" style={{background:'var(--tan)'}}></span></div>
          <div className="footer-text">Powered by Amazon Nova Sonic · Built with love</div>
        </footer>
      </div>
    </>
  );
}