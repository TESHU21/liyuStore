import React from 'react'
import { DataTable } from '@/components/data-table'
import {columns} from "./columns"

const OrdersUser = () => {
const userData = [
  {
    id: "L001",
    firstName: "Teshome",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "2025-06-01",
    total: "500 ETB",
    status: "Completed",
    delivered: "Paid",
  },
  {
    id: "L002",
    firstName: "Sara",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    date: "2025-06-03",
    total: "300 ETB",
    status: "Pending",
    delivered: "Pending",
  },
  {
    id: "L003",
    firstName: "Mulugeta",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    date: "2025-06-05",
    total: "750 ETB",
    status: "Completed",
    delivered: "Paid",
  },
  {
    id: "L004",
    firstName: "Rediet",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    date: "2025-06-08",
    total: "620 ETB",
    status: "Pending",
    delivered: "Pending",
  },
  {
    id: "L005",
    firstName: "Yared",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    date: "2025-06-10",
    total: "890 ETB",
    status: "Paid",
    delivered: "Paid",
  },
]

const handleViewDetail=()=>{
  
}

  return (
    <div className=' flex flex-col items-center justify-center '>
      <h1 className=' felx py-8 font-lato font-semibold'>My Orders</h1>
      <div className=' flex mx-auto'>
        <DataTable columns={columns({handleViewDetail})} data={userData}/>
        </div>
    </div>
  )
}

export default OrdersUser