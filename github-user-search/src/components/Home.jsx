import React, { useState } from 'react';
import SearchBar from './SearchBar';
import UserCard from './UserCard';
import { searchUsers } from '../services/githubService';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(q) {
    setError(null);
    setLoading(true);
    try {
      const results = await searchUsers(q);
      setUsers(results);
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {users.length ? users.map(u => <UserCard user={u} key={u.id} />) : <p>No results yet — try searching for a username.</p>}
      </div>
    </div>
  );
}
