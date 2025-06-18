import React from 'react'
import PageHeader from '@/components/PageHeader'
import FormComp from '@/components/FormComp'
import  {checkoutSchema,fields,initialValues} from "./components/data"
import { OrderSummaryCard } from './components/OrderSummeryCard'

const Checkout = () => {
    const orderItem = {
    id: "macbook-pro-2019-16",
    name: "Apple MacBook Pro 2019 | 16\"",
    brand: "Apple",
    price: 749.99,
    quantity: 1,
    imageUrl: "https://via.placeholder.com/80x80", // Replace with an actual image URL
  };
  const shippingFees = 0.00;
  const tax = 10.00;
  const total = (orderItem.price * orderItem.quantity) + shippingFees + tax;
 const headers={
title:"Checkout",
currentPage:"checkout",
description:"",
}
  return (
    <div>
        <PageHeader header={headers}/>
        <div className=' flex gap-12  md:mt-[140px] px-[39px]'>
            <div className='w-full md:w-[782px]'>
          <h6 className='mb-8'>Billing Detials</h6>
          

                <div className='bg-[#F9FBFC]  px-[59px] pt-[61px] pb-[85px]'>
                    <FormComp schema={checkoutSchema} fields={fields}  initialValues={initialValues}/>

                </div>
               

            </div>
            <div className='  w-1/2 '>
                <h6 className='pb-8'>Products</h6>
                <div className='bg-[#F9FBFC] pt-[108px] px-12'>
                    <OrderSummaryCard orderItem={orderItem} tax={tax} shippingFees={shippingFees} total={total}/>

                </div>
            </div>

        </div>
    </div>
  )
}

export default Checkout