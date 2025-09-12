import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import { useRecipeStore } from './components/recipeStore'

const RecipeDetailsWrapper = () => {
  const { id } = useParams()
  return <RecipeDetails recipeId={parseInt(id)} />
}

function App() {
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations)

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <SearchBar />
              <AddRecipeForm />
              <RecipeList />
              <FavoritesList />
              <button onClick={generateRecommendations}>Generate Recommendations</button>
              <RecommendationsList />
            </div>
          }
        />
        <Route path="/recipes/:id" element={<RecipeDetailsWrapper />} />
      </Routes>
    </Router>
  )
}

export default App
