import { Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/login'
import Signup from './pages/Auth/signup'
import Home from './pages/Home/home'
import Admin from './pages/Admin/admin'
import Product from './pages/Product/details'
import Orders from './pages/Orders/orders'
import Checkout from './components/checkout'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/checkout/:id' element={<Checkout />} />
      </Routes>
    </>
  )
}
