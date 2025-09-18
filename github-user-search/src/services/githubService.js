// src/services/githubService.js
import axios from 'axios';

const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: token ? { Authorization: `token ${token}` } : {}
});

/**
 * Advanced search using GitHub Search API (GET /search/users)
 * Accepts q (text), location (string), minRepos (number), per_page (number), page (number)
 * Returns: { total_count, items: [detailed user objects] }
 */
export async function searchUsersAdvanced({ q = '', location = '', minRepos, per_page = 10, page = 1 }) {
  // build qualifiers
  const parts = [];
  const trimmedQ = String(q || '').trim();
  if (trimmedQ) parts.push(trimmedQ);

  if (location) {
    // wrap location in quotes if it contains spaces
    const loc = location.includes(' ') ? `"${location}"` : location;
    parts.push(`location:${loc}`);
  }

  if (minRepos !== undefined && minRepos !== null && minRepos !== '') {
    const n = Number(minRepos);
    if (!Number.isNaN(n)) parts.push(`repos:>=${n}`);
  }

  const query = parts.join(' ').trim();
  if (!query) {
    // GitHub search requires a query - fall back to a wildcard-like search using type:user
    // but GitHub doesn't support plain wildcard users, so we use "followers:>=0" to return users
    // (this gives many results; caller should provide at least one qualifier)
    throw new Error('Please provide at least one search term or qualifier');
  }

  const res = await api.get('/search/users', {
    params: { q: query, per_page, page }
  });

  const total_count = res.data.total_count || 0;
  const items = Array.isArray(res.data.items) ? res.data.items : [];

  // For richer info (location, public_repos) fetch each user's detail
  // NOTE: this issues one request per user; keep per_page small in dev or use an authenticated token.
  const detailed = await Promise.all(items.map(async (it) => {
    try {
      const userRes = await api.get(`/users/${it.login}`);
      return userRes.data; // includes location, public_repos, bio, etc.
    } catch (err) {
      // if detail fetch fails, fallback to search item fields
      return it;
    }
  }));

  return { total_count, items: detailed };
}

/**
 * Fetch a single user's data by username
 */
export async function fetchUserData(username) {
  if (!username) throw new Error('username is required');
  const res = await api.get(`/users/${encodeURIComponent(username)}`);
  return res.data;
}
