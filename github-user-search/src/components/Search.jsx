import React, { useState } from "react";
import { searchUsersAdvanced } from "../services/githubService";
import UserCard from "./UserCard";

export default function Search() {
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 10;

  async function runSearch({ nextPage = 1, append = false } = {}) {
    // reset error state
    setNotFound(false);
    setLoading(true);

    try {
      const res = await searchUsersAdvanced({
        q,
        location,
        minRepos: minRepos !== "" ? Number(minRepos) : undefined,
        per_page: perPage,
        page: nextPage,
      });

      if (res.total_count === 0 || !res.items || res.items.length === 0) {
        if (!append) setUsers([]);
        setNotFound(true);
        setTotal(res.total_count || 0);
      } else {
        setTotal(res.total_count || 0);
        if (append) {
          setUsers((prev) => [...prev, ...res.items]);
        } else {
          setUsers(res.items);
        }
      }
      setPage(nextPage);
    } catch (err) {
      // show user-facing not-found message per requirement
      setUsers([]);
      setTotal(0);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // start from first page
    await runSearch({ nextPage: 1, append: false });
  };

  const handleLoadMore = async () => {
    const next = page + 1;
    await runSearch({ nextPage: next, append: true });
  };

  const hasMore = users.length < total;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Advanced GitHub User Search</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">Username / Keyword</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. octocat or react"
            className="w-full border rounded px-3 py-2"
            aria-label="Username or keyword"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City or country (optional)"
            className="w-full border rounded px-3 py-2"
            aria-label="Location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Min Repos</label>
          <input
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            type="number"
            min="0"
            placeholder="0"
            className="w-full border rounded px-3 py-2"
            aria-label="Minimum repositories"
          />
        </div>

        <div className="md:col-span-4 flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            aria-label="Search"
          >
            Search
          </button>
          <button
            type="button"
            className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
            onClick={() => {
              setQ("");
              setLocation("");
              setMinRepos("");
              setUsers([]);
              setTotal(0);
              setNotFound(false);
              setPage(1);
            }}
          >
            Clear
          </button>
        </div>
      </form>

      <div className="mt-6">
        {loading && <p className="text-gray-600">Loading...</p>}
        {notFound && !loading && <p className="text-red-600">Looks like we cant find the user</p>}

        {!loading && users.length > 0 && (
          <>
            <p className="text-sm text-gray-600 mb-3">Showing {users.length} of {total} results</p>
            <div className="space-y-3">
              {users.map((u) => (
                <UserCard user={u} key={u.id || u.login} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="bg-white border px-4 py-2 rounded hover:bg-gray-50"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
