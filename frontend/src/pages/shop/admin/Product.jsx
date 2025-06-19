import React from 'react'
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../components/products';


const Product = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex md:pl-[148px] gap-2 md:my-[80px]'><ChevronLeft/> <span>Back </span></div>
        <div className=' flex-grow mx-[43px] bg-[#F9FBFC] h-auto px-[170px] '>
            <div className='flex items-center md:mt-[45px] justify-between'>
                <div className='flex gap-12'> <h6>Products</h6>
                <span>Create Products</span>
                </div>
               <p>Total</p>
            </div>
             <div className="flex-grow grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-3 mt-[67px] gap-6 justify-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>


        </div>
    </div>
  )
}

export default Product