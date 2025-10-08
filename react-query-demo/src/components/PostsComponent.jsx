// src/components/PostsComponent.jsx
import React from "react";
import { useQuery } from "react-query";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Error fetching posts");
  return res.json();
};

export default function PostsComponent() {
  const { data, error, isLoading, isError, refetch } = useQuery("posts", fetchPosts, {
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: true, 
    keepPreviousData: true,     
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts from JSONPlaceholder</h2>
      <button onClick={() => refetch()}>Refetch Posts</button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
