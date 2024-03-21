import React,{useState} from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './components/navbar'
import Shop from './pages/shop/shop'
import Cart from'./pages/cart/cart'
import ProductDetails from './pages/productDetails/productDetails'
import Login from './components/Login/login'
import Signup from './components/SignUp/signup'
import ProtectedRoute from './components/Protected/protectedRoute'
import CheckoutPage from './pages/checkOut/checkout'

function App() {
  return (

      
<Router>
  <Routes>
    <Route path='/' element={<Shop/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/cart' element={<Cart/>} />
    <Route path='/checkout' element={<ProtectedRoute><CheckoutPage/></ProtectedRoute>} />
    <Route path='/product/:id' element={<ProductDetails/>} />
  </Routes>
</Router>

  )
}

export default App
