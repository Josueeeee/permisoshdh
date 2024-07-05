
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import {AuthProvider} from './context/authContext'
import { ProtectedRoute } from './components/ProtectRouter'


function App() {

  
  return (  
    <div className=' bg-[#F3F6FC]'>
    <AuthProvider>
    <Routes>
        <Route path="/"  element={
          <ProtectedRoute>
            <Home/> 
          </ProtectedRoute>
        }  />
        
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element= {<Register/>} />
    </Routes>
    </AuthProvider>
    </div>

  )
}

export default App
