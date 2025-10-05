import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('');

  function submit(e) {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search GitHub username..."
        style={{ padding: 8, width: '60%', marginRight: 8 }}
      />
      <button type="submit" style={{ padding: '8px 12px' }}>Search</button>
    </form>
  );
}
