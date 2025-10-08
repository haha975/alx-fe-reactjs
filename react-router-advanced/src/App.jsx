import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogPost from "./components/BlogPost"; // updated
// ProfileDetails and ProfileSettings are nested inside Profile

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/blog/1">Sample Blog</Link>
        {isAuthenticated ? (
          <button onClick={() => setIsAuthenticated(false)}>Logout</button>
        ) : (
          <button onClick={() => setIsAuthenticated(true)}>Login</button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected route */}
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Dynamic route as ALX expects */}
        <Route path="/blog/:id" element={<BlogPost />} />

        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
