import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = recipesData.find((r) => r.id === parseInt(id));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Recipe not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {recipe.title}
          </h1>
          <p className="text-gray-600 mb-6">{recipe.summary}</p>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Instructions
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <Link
            to="/"
            className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
