import React from 'react'
import { DataTable } from '@/components/data-table'
import { dummyData } from './data'
import { columns } from './columns'
import { ChevronLeft } from 'lucide-react';


const User = () => {
    const handleDelete=()=>{
        console.log("handle Delete")
    }
    const handleEdit=()=>{
        console.log("handle Delete")
    }
  return (

        <div className='mx-[250px]'>
            <div className=' flex  py-15'>
                <ChevronLeft/>
                <span>Back</span>
            </div>
        <h6 className='font-semibold leading-relaxed text-2xl text-blue-primary pb-4'>Users</h6>
           <div className=' '>
        <DataTable columns={columns({handleDelete,handleEdit})} data={dummyData}  />
    </div>
    </div>
  
 
  )
}

export default User