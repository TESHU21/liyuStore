import React from 'react'
import PageHeader from '@/components/PageHeader'
import { headers } from './components/data'
import { useSelector } from 'react-redux'
import CartItem from './components/CartItem'
const Cart = () => {
  const cart=useSelector((state)=>state.cart.items)
  console.log("Cart",cart)
  return (
    <div>
      <PageHeader header={headers}/>
      <div>
        {cart.length>0?(
          cart.map((item)=><CartItem key={item._id} cart={item}/>)
        ):(
          <p className='text-center'>No Products Added To Cart</p>
        )}
        
      </div>

    </div>
  )
}

export default Cart