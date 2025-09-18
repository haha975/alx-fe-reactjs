import React, { useState } from "react";
import { fetchUserData, searchUsers } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState(0);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      let users = [];
      if (username && !location && minRepos === 0) {
        // Single user search using fetchUserData
        const user = await fetchUserData(username);
        users = [user]; // wrap in array for consistency
      } else {
        // Advanced search
        users = await searchUsers({ username, location, minRepos });
      }
      setResults(users);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(Number(e.target.value))}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Search
        </button>
      </form>

      <div className="mt-4">
        {loading && <p>Loading...</p>}
        {error && <p>Looks like we can't find the user</p>}
        {results.length > 0 && (
          <div className="flex flex-col gap-4">
            {results.map((user) => (
              <div key={user.id} className="p-2 border rounded flex items-center gap-4">
                <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
                <div>
                  <p className="font-bold">{user.login}</p>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
