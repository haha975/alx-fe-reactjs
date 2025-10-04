// src/components/AddRecipeForm.jsx
import React, { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState(""); // renamed from instructions
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required";
    if (ingredients.split(",").length < 2)
      newErrors.ingredients = "Include at least two ingredients, separated by commas";
    if (!steps.trim()) newErrors.steps = "Steps are required"; // validation for steps

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage("");
      return;
    }

    // If valid, log the data (replace with actual POST later)
    console.log({
      title,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      steps, // include steps
    });

    setSuccessMessage("Recipe added successfully!");
    setErrors({});
    setTitle("");
    setIngredients("");
    setSteps(""); // reset steps
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Add New Recipe
        </h1>

        {successMessage && (
          <div className="mb-4 text-green-600 font-medium">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Ingredients (comma separated)
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows="3"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
            )}
          </div>

          {/* Steps */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Steps</label>
            <textarea
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.steps && (
              <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
