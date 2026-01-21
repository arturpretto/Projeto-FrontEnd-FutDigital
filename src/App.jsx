import { Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/login'
import Signup from './pages/Auth/signup'
import Services from './pages/Services/services'
import Admin from './pages/Admin/admin'
import Details from './pages/Product/details'
import Orders from './pages/Orders/orders'
import Checkout from './pages/Product/checkout'
import Home from './pages/Home/home'
import Order from './pages/Admin/order'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/services' element={<Services />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/product/:id' element={<Details />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/checkout/:id' element={<Checkout />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}
