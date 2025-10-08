// src/App.jsx
import React from "react";
import PostsComponent from "./components/PostsComponent";

export default function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>React Query Demo</h1>
      <PostsComponent />
    </div>
  );
}
