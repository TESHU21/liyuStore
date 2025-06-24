import React from 'react'
import {schema,fields,initialValues} from "./data"
import { ChevronLeft } from 'lucide-react';

import FormComp from '@/components/FormComp'

const CreateProduct = () => {
  const handleCreateProducts=(data)=>{
    console.log("create products",data)
  }
  return (
    <div className='px-20 pt-10'>
      
        <FormComp schema={schema} fields={fields} initialValues={initialValues}  submitBtnText="Create Products" onSubmit={handleCreateProducts} />
    </div>
  )
}

export default CreateProduct