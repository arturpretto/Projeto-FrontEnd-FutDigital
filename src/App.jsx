import { Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/login'
import Signup from './pages/Auth/signup'
import Services from './pages/Services/services'
import Admin from './pages/Admin/admin'
import ProductDetails from './pages/Product/product'
import Orders from './pages/Orders/orders'
import Checkout from './pages/Product/checkout'
import Home from './pages/Home/home'
import OrderDetails from './pages/Orders/order'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/services' element={<Services />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/order/:id' element={<OrderDetails />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/checkout/:id' element={<Checkout />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}
