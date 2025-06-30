import React from 'react'
import PageHeader from '@/components/PageHeader'
import { headers } from './components/data'
import { useSelector } from 'react-redux'
import CartItem from './components/CartItem'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const navigate=useNavigate()
  const cart=useSelector((state)=>state.cart.items)
  const totalPrice=useSelector((state)=>state.cart.totalAmount)
  const totalQuantity=useSelector((state)=>state.cart.totalQuantity)
  
  return (
    <div className=' pb-20'>
      <PageHeader header={headers}/>
      <div className='md:pt-10'>
        {cart.length>0?( <div>
           {cart.map((item)=><CartItem key={item._id} cart={item}/>)}
           <div className='max-w-4xl mx-auto'>
              <div className="text-lg font-medium mb-2">Items : {totalQuantity}</div>
      <div className="text-xl font-semibold mb-6">Total : ${totalPrice.toLocaleString()}</div>

      <button className="bg-blue-primary w-1/2 text-white px-6 py-3 rounded-md hover:bg-blue-primary mx-auto"
      onClick={()=>navigate("/checkout")}
      >
        Proceed to checkout
      </button>
           </div>
        
        </div>
         
        ):(
          <p className='text-center'>No Products Added To Cart</p>
        )}
        
      </div>

    </div>
  )
}

export default Cart