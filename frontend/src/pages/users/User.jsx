import React,{useState,useEffect} from 'react'
import { DataTable } from '@/components/data-table'
// import { dummyData } from './data'
import { columns } from './columns'
import { ChevronLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import {getUser} from "../../store/authSlice"

const User = () => {
    const [data,setData]=useState([])
    const dispatch=useDispatch()
    const handleDelete=()=>{
        console.log("handle Delete")
    }
    const handleEdit=()=>{
        console.log("handle Delete")
    }
    useEffect(()=>{
        const fetchUser=async()=>{
           try{
           const res=  await dispatch(getUser()).unwrap()
           const user=res;
          const formattedData=user.map((item)=>({
            id:item._id,
            fullName:item.fullName,
            email:item.email,
            admin:item.isAdmin,


          }))
          setData(formattedData)

        }
        catch(error){
            console.log(error)
        }
        }
        fetchUser()

    },[])
  return (

        <div className='mx-[250px]'>
            <div className=' flex  py-15'>
                <ChevronLeft/>
                <span>Back</span>
            </div>
        <h6 className='font-semibold leading-relaxed text-2xl text-blue-primary pb-4'>Users</h6>
           <div className=' '>
        <DataTable columns={columns({handleDelete,handleEdit})} data={data}  />
    </div>
    </div>
  
 
  )
}

export default User