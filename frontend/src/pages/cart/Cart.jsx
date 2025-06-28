import React from 'react'
import PageHeader from '@/components/PageHeader'
import { headers } from './components/data'
import { useSelector } from 'react-redux'
const Cart = () => {
  const cart=useSelector((state)=>state.cart)
  console.log("Cart",cart)
  return (
    <div>
      <PageHeader header={headers}/>

    </div>
  )
}

export default Cart