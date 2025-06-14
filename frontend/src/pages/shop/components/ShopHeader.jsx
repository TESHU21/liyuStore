import React from 'react'
import { Link } from "react-router-dom";
import { SlashIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ShopHeader = () => {
  return (
    <div>
        <div>
            <div className=' flex flex-col items-center gap-8 h-[316px] bg-gradient-to-l from-[#009CDE] to-[#01589A] pt-[107px]'>
                <h1 className=' font-lato text-white font-bold text-[60px] leading-[86px]'>New Arrival</h1>
                <p className=' font-semibold text-[20px]  text-white'>Shop through our latest selection of Products</p>
            </div>
        </div>
        <div className=' flex justify-center pt-[22px]'>
                <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/"  className='text-[20px]'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[20px]">Shop</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
        </div>
      
    </div>
  )
}

export default ShopHeader