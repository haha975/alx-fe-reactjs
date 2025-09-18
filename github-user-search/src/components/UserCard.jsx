import React from 'react';
import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      border: '1px solid #eee',
      borderRadius: 8,
      marginBottom: 8
    }}>
      <img src={user.avatar_url} alt={`${user.login} avatar`} width="64" height="64" style={{ borderRadius: 8 }} />
      <div>
        <Link to={`/user/${user.login}`} style={{ fontSize: 16, fontWeight: 600 }}>{user.login}</Link>
        <div>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
    </div>
  );
}
