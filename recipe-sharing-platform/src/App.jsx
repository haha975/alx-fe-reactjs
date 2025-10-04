import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 rounded-xl shadow-lg bg-white">
        <h1 className="text-3xl font-bold text-blue-500">Recipe Sharing Platform — Tailwind is working!</h1>
        <p className="mt-4 text-sm text-gray-600">If you see BLUE text above, Tailwind is applied.</p>
      </div>
    </div>
    </>
  )
}

export default App
