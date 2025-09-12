import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'

const RecipeDetailsWrapper = () => {
  const { id } = useParams()
  return <RecipeDetails recipeId={parseInt(id)} />
}

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
              <SearchBar />
              <AddRecipeForm />
              <RecipeList />
            </div>
          }
        />
        <Route path="/recipes/:id" element={<RecipeDetailsWrapper />} />
      </Routes>
    </Router>
  )
}

export default App
