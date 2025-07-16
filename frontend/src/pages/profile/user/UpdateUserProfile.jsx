import React,{useEffect} from 'react'
import {SignUpSchema,initialValues,fields} from "../../auth/registration/components/data"
import FormComp from '@/components/FormComp'
import { useDispatch } from 'react-redux'
import {getCurrentUserProfile,updateProfile} from "../../../store/authSlice"

const UpdateUserProfile = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    const fetchProfile=async()=>{
      try{
        const response=await dispatch(getCurrentUserProfile()).unwrap()
        console.log("Responsee",response)
      }
      catch(error){
        console.log(error)
      }
    }
    fetchProfile()

  },[dispatch])
  return (
    <div className=' flex flex-col pt-10  items-center justify-center'>
        <h1 className='font-lato font-semibold'>Update Profile</h1>
        <div className=' w-full px-4 md:w-[900px]'>
            <FormComp schema={SignUpSchema} initialValues={initialValues} fields={fields} submitBtnText="Update" />
        </div>
        
    </div>
  )
}

export default UpdateUserProfile