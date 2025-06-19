import React from 'react'
import {schema,fields,initialValues} from "./data"
import { ChevronLeft } from 'lucide-react';

import FormComp from '@/components/FormComp'

const CreateProduct = () => {
  return (
    <div className='px-20 pt-10'>
      
        <FormComp schema={schema} fields={fields} initialValues={initialValues}/>
    </div>
  )
}

export default CreateProduct