import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import UserDetail from './components/UserDetail';

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: '24px auto', padding: '0 12px' }}>
      <header style={{ marginBottom: 20 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>GitHub User Search</h1>
        </Link>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:login" element={<UserDetail />} />
        </Routes>
      </main>
    </div>
  );
}
