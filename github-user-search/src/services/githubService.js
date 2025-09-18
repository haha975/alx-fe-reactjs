// src/services/githubService.js
import axios from 'axios';

const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: token ? { Authorization: `token ${token}` } : {}
});

// Search users by query (returns array of users)
export async function searchUsers(query) {
  const q = encodeURIComponent(query);
  const res = await api.get(`/search/users?q=${q}&per_page=20`);
  return res.data.items;
}

// Get a single user's details
export async function getUser(username) {
  const res = await api.get(`/users/${username}`);
  return res.data;
}
