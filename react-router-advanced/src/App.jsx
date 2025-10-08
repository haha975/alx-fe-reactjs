// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileSettings from "./pages/ProfileSettings";
import Post from "./pages/Post";
import Login from "./pages/Login";

export default function App() {
  // Simulate authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/post/1">Sample Post</Link>
        {isAuthenticated ? (
          <button onClick={() => setIsAuthenticated(false)}>Logout</button>
        ) : (
          <button onClick={() => setIsAuthenticated(true)}>Login</button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected Route */}
        <Route
          path="/profile/*"
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
          }
        >
          {/* Nested Routes */}
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

        {/* Dynamic Route */}
        <Route path="/post/:id" element={<Post />} />

        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* 404 fallback */}
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
