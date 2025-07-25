import { useState } from 'react'

import './App.css'
import Index from './pages/Index'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Feriados from './pages/Feriados'
import Configuracoes from './pages/Configuracoes' 
import Aulas from './pages/Aulas'
import Faltas from './pages/Faltas'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/registro' element={<Register />}/>
          <Route path='/faltas' element={<Faltas />}/>
          <Route path='/feriados' element={<Feriados />}/>
          <Route path='/aulas' element={<Aulas />}/>
          <Route path='/configuracoes' element={<Configuracoes />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
