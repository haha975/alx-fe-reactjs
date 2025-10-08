// src/pages/Post.jsx
import React from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const { id } = useParams();
  return <h2>Viewing Post ID: {id}</h2>;
}
