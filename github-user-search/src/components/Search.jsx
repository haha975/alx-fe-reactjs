import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';

export default function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return;
    setLoading(true);
    setNotFound(false);
    setUser(null);

    try {
      const data = await fetchUserData(trimmed);
      setUser(data);
    } catch (err) {
      // any error => show user-friendly not found message per task
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '24px auto', padding: '0 12px' }}>
      <h2>Search GitHub User</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username..."
          style={{ padding: 8, width: '60%', marginRight: 8 }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {notFound && <p style={{ color: 'red' }}>Looks like we cant find the user</p>}

      {user && (
        <div style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          border: '1px solid #eee',
          padding: 12,
          borderRadius: 8
        }}>
          <img src={user.avatar_url} alt={`${user.login} avatar`} width="96" height="96" style={{ borderRadius: 8 }} />
          <div>
            <h3 style={{ margin: 0 }}>{user.name || user.login}</h3>
            {user.bio && <p style={{ margin: '8px 0' }}>{user.bio}</p>}
            <p style={{ margin: 0 }}>Followers: {user.followers} • Repos: {user.public_repos}</p>
            <p style={{ marginTop: 8 }}>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
