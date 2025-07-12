import React,{useEffect} from 'react'
import { columns } from "./colomns"
import { DataTable } from '@/components/data-table'
import OrderDetailSummery from './OrderDetailSummery'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { fetchOrderById } from '@/store/orderSlice'



const OrdersDetail = () => {
  const dispatch=useDispatch()
   const {id}=useParams()
  useEffect(()=>{
    const fetchOrderDetail=async()=>{
      try{
        const res=await dispatch(fetchOrderById(id)).unwrap()
        console.log("Response",res)
      }
      catch(error){
        console.log(error)
      }
    }
     if (id) {
      fetchOrderDetail()
    }


  },[dispatch])
    const order = useSelector(state => state.orders.orderdetail) // adjust based on your state shape
const formattedData=order?.orderItems.map((item)=>(
  {
    image:item.image,
    product:item.name,
      quantity:item.qty,
      unitprice:item.price,
      total:item.price*item.qty

  }
))
console.log("formattedData",formattedData)
 
  return (
    <div className='flex gap-10 pt-10 mx-auto justify-center'>
      {formattedData &&         <DataTable columns={columns()} data={formattedData}/>
}

        <OrderDetailSummery order={order}/>

    </div>
  )
}

export default OrdersDetail