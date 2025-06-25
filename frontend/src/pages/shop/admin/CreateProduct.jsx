import React from 'react'
import {schema,fields,initialValues} from "./data"
import { ChevronLeft } from 'lucide-react';
import { useSelector,useDispatch } from 'react-redux';
import { createProduct } from '@/store/productSlice';
import { uploadImageToFirebase } from '@/lib/uploadImage';

import FormComp from '@/components/FormComp'

const CreateProduct = () => {
  const dispatch=useDispatch();
  const handleCreateProducts=async(data)=>{
    try{
      let imageUrl="";
       if (data.image) {  // Assuming 'image' is your file field name
        imageUrl = await uploadImageToFirebase(data.image);
      }

      // Build payload for backend
      const payload = {
        ...data,
        image: imageUrl // or whatever your backend expects (e.g. imageUrl)
      };

      // Remove file object if backend doesn't want it
      delete payload.imageFile; 

      // Dispatch create product
      dispatch(createProduct(payload));
    }catch (error) {
      console.error("Product creation failed", error);
      // Optionally set error state to show in UI
    }
   
  }
  return (
    <div className='px-20 pt-10'>
      
        <FormComp schema={schema} fields={fields} initialValues={initialValues}  submitBtnText="Create Products" onSubmit={handleCreateProducts} />
    </div>
  )
}

export default CreateProduct