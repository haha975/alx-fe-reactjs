import React from 'react'
import { useRecipeStore } from './recipeStore'
import { Link } from 'react-router-dom'

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations)

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {recommendations.length === 0 && <p>No recommendations yet</p>}
      {recommendations.map(recipe => (
        <div key={recipe.id}>
          <h3><Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link></h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  )
}

export default RecommendationsList
