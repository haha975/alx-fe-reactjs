import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUser } from '../services/githubService';

export default function UserDetail() {
  const { login } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUser(login);
        if (mounted) setUser(data);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to fetch user');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [login]);

  if (loading) return <p>Loading profile…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <Link to="/">← Back to search</Link>
      <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
        <img src={user.avatar_url} alt={user.login} width="150" style={{ borderRadius: 8 }} />
        <div>
          <h2>{user.name || user.login}</h2>
          {user.bio && <p>{user.bio}</p>}
          <p>Followers: {user.followers} • Following: {user.following}</p>
          <p>Repos: {user.public_repos}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">Open on GitHub</a>
        </div>
      </div>
    </div>
  );
}
