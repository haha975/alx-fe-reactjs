// src/hooks/useAuth.js
import { useState } from "react";

export default function useAuth() {
  // Simulate authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return { isAuthenticated, login, logout };
}
