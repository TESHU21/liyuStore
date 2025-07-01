import React from 'react'
import { columns } from "./colomns"
import { dummyData } from './dummyData'
import { DataTable } from '@/components/data-table'

const OrdersDetail = () => {
  return (
    <div>
        <DataTable columns={columns} dummyData={dummyData}/>
    </div>
  )
}

export default OrdersDetail