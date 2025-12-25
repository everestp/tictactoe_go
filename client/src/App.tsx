import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import { Route, Routes } from 'react-router'
import GameRoom from './pages/GameRoom'

function App() {
  

  return (
   <>
   <Routes>
    <Route path="/" element={<Login />} />
     <Route path="/game" element={<GameRoom />} />
   </Routes>
   
   </>
  )
}

export default App
