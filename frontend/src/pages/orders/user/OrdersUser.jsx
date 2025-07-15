import React,{useEffect} from 'react'
import { DataTable } from '@/components/data-table'
import {columns} from "./columns"
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { fetchAllOrderByUser,fetchAllOrders } from '@/store/orderSlice'

const OrdersUser = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const user=useSelector((state)=>state.auth.user)

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = user?.isAdmin
        ? await dispatch(fetchAllOrders()).unwrap()
        : await dispatch(fetchAllOrderByUser()).unwrap();

      console.log("Fetched Orders:", response);
    } catch (error) {
      console.error("Order fetch failed:", error);
    }
  };

  if (user) {
    fetchOrders();
  }
}, [dispatch, user]);


const order=useSelector((state)=>state.orders.order_mine)
console.log("Orders",user)
const formattedData=order?.map((item)=>({
 id: item._id,
 
    image: item.orderItems?.[0]?.image || "",
    date: new Date(item.createdAt).toISOString().split("T")[0],
    total: `${item.totalPrice} ETB`,
    status: item.isPaid ? "Paid" : "Pending",
    delivered: item.isDelivered ? "Delivered" : "Pending",
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