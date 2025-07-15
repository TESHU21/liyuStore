import React,{useEffect} from 'react'
import { DataTable } from '@/components/data-table'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchAllOrders } from '@/store/orderSlice'

const OrdersAdmin = () => {
   const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(() => {
      const fetchOrders=async()=>{
        try{
          
       
          const response =  await dispatch(fetchAllOrders()).unwrap() // .unwrap gives raw result or throws
          console.log("orders:", response); // This is your actual order data
    
        }
        catch(error){
          console.log(error)
        }
      }
      fetchOrders()
     
      
    }, [dispatch]);
    const order=useSelector((state)=>state.orders.order)
    const user=useSelector((state)=>state.auth.user)
    console.log("User",user)
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
    <div>
       {formattedData &&
                      <DataTable columns={columns({handleViewDetail})} data={formattedData}/>
      
              }
    </div>
  )
}

export default OrdersAdmin