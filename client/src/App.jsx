import { useState } from 'react'
import './index.css'
import LoginDashboard from './pages/LoginDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <LoginDashboard/>
  )
}

export default App
