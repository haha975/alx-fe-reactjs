// src/pages/Login.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
