import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Layout from '@/layout/Layout'
import Home from '@/pages/home/Home'
import Shop from '@/pages/shop/Shop'
import ShopDetail from '@/pages/shop/user/detail/ShopDetail'
import Cart from '@/pages/cart/Cart'
import Favourite from '@/pages/favourite/Favourite'
import Login from '@/pages/auth/login/Login'
import Checkout from '@/pages/checkout/Checkout'
import CreateProduct from '@/pages/shop/admin/ProductFormPage'
import Profile from '@/pages/profile/Profile'
import CategoryManager from "../pages/catagory/CategoryManager"
import OrdersUser from '@/pages/orders/user/OrdersUser'
import OrdersDetail from '@/pages/orders/components/OrdersDetail'
const AppRoutes = () => {
  return (
    <Routes >
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
        <Route path='shop' element={<Shop/>}/>
        <Route path='shop/:id' element={<ShopDetail/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path ="favourite" element={<Favourite/>}/>
        <Route path='detail' element={<ShopDetail/>}/>
        <Route path="checkout" element={<Checkout/>}/>
        <Route path="product" element={<CreateProduct/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="category" element={<CategoryManager/>}/>
        <Route path="orders" element={<OrdersUser/>}/>
        <Route path='orders/:id' element={<OrdersDetail/>}/>

        </Route>
        <Route path='login' element={<Login/>}/>
        
    </Routes>
  )
}

export default AppRoutes