import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'

function App() {
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
              <AddRecipeForm />
              <RecipeList />
            </div>
          }
        />
        <Route
          path="/recipes/:id"
          element={<RecipeDetailsWrapper />}
        />
      </Routes>
    </Router>
  )
}

// Wrapper to extract ID from URL
import { useParams } from 'react-router-dom'
const RecipeDetailsWrapper = () => {
  const { id } = useParams()
  return <RecipeDetails recipeId={parseInt(id)} />
}

export default App
