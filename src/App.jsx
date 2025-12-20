import { Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Signup from './components/signup'
import Home from './components/home'
import Admin from './components/admin'
import Details from './components/details'
import Orders from './components/orders'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/services' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/services/:id' element={<Details />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </>
  )
}
