import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Layout from '@/layout/Layout'
import Home from '@/pages/home/Home'
import Shop from '@/pages/shop/Shop'
import Cart from '@/pages/cart/Cart'
import Favourite from '@/pages/favourite/Favourite'
import ShopDetail from '@/pages/shop/detail/ShopDetail'
import Login from '@/pages/auth/login/Login'
import Checkout from '@/pages/checkout/Checkout'
const AppRoutes = () => {
  return (
    <Routes >
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
        <Route path='shop' element={<Shop/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path ="favourite" element={<Favourite/>}/>
        <Route path='detail' element={<ShopDetail/>}/>
        <Route path="checkout" element={<Checkout/>}/>
        </Route>
        <Route path='login' element={<Login/>}/>
        
    </Routes>
  )
}

export default AppRoutes