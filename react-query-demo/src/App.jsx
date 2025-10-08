// src/App.jsx
import React from "react";
import PostsComponent from "./components/PostsComponent";
import { QueryClient, QueryClientProvider } from "react-query";

// ALX expects these exact names
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: "2rem" }}>
        <h1>React Query Demo</h1>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}
