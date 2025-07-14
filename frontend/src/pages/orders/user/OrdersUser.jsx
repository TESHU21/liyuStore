import React,{useEffect} from 'react'
import { DataTable } from '@/components/data-table'
import {columns} from "./columns"
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { fetchAllOrderByUser } from '@/store/orderSlice'

const OrdersUser = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()


useEffect(() => {
  const fetchOrders=async()=>{
    try{
      
   
      const response =  await dispatch(fetchAllOrderByUser()).unwrap() // .unwrap gives raw result or throws
      console.log("orders:", response); // This is your actual order data

    }
    catch(error){
      console.log(error)
    }
  }
  fetchOrders()
 
  
}, [dispatch]);
const order=useSelector((state)=>state.orders.order_mine)
console.log("Orders",order)
const formattedData=order?.map((item)=>({
 id: item._id,
 
    image: item.orderItems?.[0]?.image || "",
    date: new Date(item.createdAt).toISOString().split("T")[0],
    total: `${item.totalPrice} ETB`,
    status: item.isPaid ? "Paid" : "Pending",
    delivered: item.isDelivered ? "Paid" : "Pending",
}))

const handleViewDetail=(data)=>{
  navigate(`/orders/${data.id}`)
  console.log(data.id)
}

  return (
    <div className=' flex flex-col items-center justify-center '>
      <h1 className=' felx py-8 font-lato font-semibold'>My Orders</h1>
      <div className=' flex mx-auto'>
        {formattedData &&
                <DataTable columns={columns({handleViewDetail})} data={formattedData}/>

        }
        </div>
    </div>
  )
}

export default OrdersUser