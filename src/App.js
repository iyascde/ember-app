import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Companion from './pages/Companion';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/companion" element={<Companion />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;