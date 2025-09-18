// src/services/githubService.js
import axios from 'axios';

const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: token ? { Authorization: `token ${token}` } : {}
});

/**
 * Fetch a single GitHub user's data by username.
 * Uses endpoint: GET /users/{username}
 * Name required by task: fetchUserData
 */
export async function fetchUserData(username) {
  if (!username) throw new Error('username is required');
  const res = await api.get(`/users/${encodeURIComponent(username)}`);
  return res.data;
}
