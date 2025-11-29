import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import MainRouter from './MainRouter';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <MainRouter />
    </Router>
  )
}

export default App
