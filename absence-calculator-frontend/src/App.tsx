
import './App.css'
import Index from './pages/Index'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Feriados from './pages/Feriados'
import Configuracoes from './pages/Configuracoes'
import Aulas from './pages/Aulas'
import Faltas from './pages/Faltas'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Register />} />
          <Route path='/faltas' element={
            <ProtectedRoute>
              <Faltas />
            </ProtectedRoute>
          } />
          <Route path='/feriados' element={
            // <ProtectedRoute>
              <Feriados />
            // {/* </ProtectedRoute> */}
          } />
          <Route path='/aulas' element={
            // <ProtectedRoute>
              <Aulas />
            // </ProtectedRoute>
          } />
          <Route path='/configuracoes' element={
            <ProtectedRoute>
              <Configuracoes />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
