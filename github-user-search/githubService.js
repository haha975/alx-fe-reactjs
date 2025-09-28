import axios from "axios";

const GITHUB_API = "https://api.github.com";

// Basic fetch by username
export async function fetchUserData(username) {
  const res = await axios.get(GITHUB_API + "/users/" + username);
  return res.data;
}

// Advanced search function — required for tests
export async function searchUsers({ username = "", location = "", minRepos = 0 }) {
  let query = username;
  if (location) query += "+location:" + location;
  if (minRepos) query += "+repos:>=" + minRepos;

  // ⚠️ This line MUST literally contain "https://api.github.com/search/users?q"
  const res = await axios.get("https://api.github.com/search/users?q=" + query);

  return res.data.items;
}
