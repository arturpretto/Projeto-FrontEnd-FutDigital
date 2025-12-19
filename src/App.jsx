import { Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/signup'
import Home from './components/home'

export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/services' element={<Home />} />
    </Routes>
    </>
  )
}
