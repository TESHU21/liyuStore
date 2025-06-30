import React from 'react'
import PageHeader from '@/components/PageHeader'
import FormComp from '@/components/FormComp'
import  {checkoutSchema,fields,initialValues} from "./components/data"
import { OrderSummaryCard } from './components/OrderSummeryCard'
import { useSelector } from 'react-redux'
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";


const Checkout = () => {
  const cart=useSelector((state)=>state.cart.items)
console.log("Cart",cart)
    const orderItem = {
    id: "macbook-pro-2019-16",
    name: "Apple MacBook Pro 2019 | 16\"",
    brand: "Apple",
    price: 749.99,
    quantity: 1,
    imageUrl: "#", // Replace with an actual image URL
  };
  
 
  const sub_total =useSelector((state)=>state.cart.totalAmount) 
  const shippingFees = sub_total*0.05;
   const tax = sub_total*0.1;
   const total=sub_total+tax+shippingFees;
 const headers={
title:"Checkout",
currentPage:"checkout",
description:"",
}
  return (
    <div>
        <PageHeader header={headers}/>
        <div className=' flex gap-12  md:mt-[40px] px-[39px]'>
            <div className='w-full md:w-[782px]'>
          <h6 className='mb-8'>Billing Detials</h6>
          

                <div className='bg-[#F9FBFC]  px-[59px] pt-[61px] pb-[85px]'>
                    <FormComp schema={checkoutSchema} fields={fields}  initialValues={initialValues}/>

                </div>
               

            </div>
            <div className='  w-1/2 '>
                <h6 className='pb-8'>Products</h6>
                <div className='bg-[#F9FBFC] pt-[108px] px-12'>
                  {
                    cart.map((item)=>
                     <OrderSummaryCard key={item._id} orderItem={item}  />
                    )
                  }
                   {/* Content */}
      <div className="p-4 border-t mt-4 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="font-semibold leading-[16px]">Shipping</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Shipping fees</span>
          <span className="font-medium">${shippingFees.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Tax:</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between pt-4 border-t text-lg font-bold">
          <span>Total</span>
          <span>${total.toLocaleString()}</span>

        </div>

        {/* Payment method */}
        <div className="pt-4">
          <h3 className="text-md font-semibold mb-2">Select Method</h3>
          <RadioGroup
            // defaultValue={selectedPaymentMethod}
            // onValueChange={onPaymentMethodChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal-credit-card" id="r1" />
              <Label htmlFor="r1">Paypal or credit card</Label>
            </div>
            {/* Additional payment methods can go here */}
          </RadioGroup>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <Button
        //  onClick={onPlaceOrder} 
        className="w-full h-12 bg-blue-primary ">
          Place order
        </Button>
      </div>
                   

                </div>
            </div>

        </div>
    </div>
  )
}

export default Checkout