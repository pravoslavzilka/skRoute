import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListView from './components/ListView'
import LoginForm from './components/LoignForm'
import NoMatch from './components/NoMatch'
import Output from './components/Output'
import { Routes, Route } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>

       
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/output" element={<ListView />} />
            <Route path="/about" element={<h1>Helo </h1>} />
            <Route path="*" element={<NoMatch />} />
         </Routes>

        
      </div>
     
      
    </>
  )
}

export default App
