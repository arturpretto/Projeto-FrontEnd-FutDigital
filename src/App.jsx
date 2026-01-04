import { Routes, Route } from 'react-router-dom'
import Login from './components/Auth/login'
import Signup from './components/Auth/signup'
import Home from './components/Home/home'
import Admin from './components/Admin/admin'
import Product from './components/Product/product'
import Orders from './components/Orders/orders'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/services' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/services/:id' element={<Product />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </>
  )
}
