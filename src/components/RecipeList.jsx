import React from 'react'
import { useRecipeStore } from '../store/recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one using the form above.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: '1rem', padding: '8px', border: '1px solid #eee' }}>
            <h3 style={{ margin: 0 }}>{recipe.title}</h3>
            <p style={{ marginTop: '6px' }}>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default RecipeList
