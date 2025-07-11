import React from 'react'
import { columns } from "./colomns"
import { dummyData } from './dummyData'
import { DataTable } from '@/components/data-table'
import OrderDetailSummery from './OrderDetailSummery'
import { useParams } from 'react-router-dom'


const OrdersDetail = () => {
  const {id}=useParams()
  return (
    <div className='flex gap-10 pt-10 mx-auto justify-center'>

        <DataTable columns={columns()} data={dummyData}/>
        <OrderDetailSummery/>

    </div>
  )
}

export default OrdersDetail