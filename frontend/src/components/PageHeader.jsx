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

const PageHeader = ({header}) => {
  return (
    <div>
        <div>
            <div className=' flex flex-col items-center justify-center gap-3 md:gap-8 md:h-[316px] h-[100px] bg-gradient-to-l from-[#009CDE] to-[#01589A] pb-4 md:pb-0 md:pt-[107px]'>
                <h1 className=' font-lato text-white font-bold md:text-[60px] md:leading-[86px]'>{header?.title}</h1>
                <p className=' font-semibold md:text-[20px] px-16 text-white'>{header?.description}</p>
            </div>
        </div>
        <div className=' flex justify-center pt-[22px]'>
                <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/"  className='md:text-[20px]'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        
        <BreadcrumbItem>
          <BreadcrumbPage className="md:text-[20px]">{header?.currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
        </div>
      
    </div>
  )
}

export default PageHeader