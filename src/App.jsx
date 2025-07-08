import { useState } from 'react'
import './App.scss'
import Name from "./components/name/Name.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Name />
    </>
  )
}

export default App
