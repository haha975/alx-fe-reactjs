import React from "react";

export default function UserCard({ user }) {
  // user might be either a full user object (from /users/{login}) or a search item fallback
  const location = user.location || "";
  const repos = user.public_repos ?? user.repos ?? null;

  return (
    <div className="bg-white p-3 rounded shadow-sm flex gap-4 items-start">
      <img
        src={user.avatar_url}
        alt={user.login + " avatar"}
        className="w-16 h-16 rounded"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
            <p className="text-sm text-gray-600">@{user.login}</p>
          </div>
          <div className="text-sm text-gray-600">
            {repos !== null ? <span>Repos: {repos}</span> : null}
          </div>
        </div>

        {user.bio && <p className="mt-2 text-sm text-gray-700">{user.bio}</p>}

        <div className="mt-2 flex gap-3 text-sm text-gray-600">
          {location && <div>📍 {location}</div>}
          <div>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              View profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
