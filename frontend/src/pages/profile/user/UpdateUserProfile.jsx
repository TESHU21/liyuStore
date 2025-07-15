import React from 'react'
import {SignUpSchema,initialValues,fields} from "../../auth/registration/components/data"
import FormComp from '@/components/FormComp'

const UpdateUserProfile = () => {
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