import React from 'react'
import { ChevronLeft } from 'lucide-react';
import ProductCard from './components/ProductCard';
import CreateProduct from './CreateProduct';
import { products } from './components/products';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"



const Product = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex md:pl-[148px] gap-2 md:my-[40px]'><ChevronLeft/> <span>Back </span></div>
        <div className=' flex-grow mx-[43px] bg-[#F9FBFC] h-auto px-[170px] '>
           <Tabs defaultValue="products" className=" py-10" >
        <TabsList asChild className="bg-transparent">
          <div className='flex gap-12'>
            <TabsTrigger value="products"
            className="
            data-[state=active]:text-blue-primary  data-[state=active]:bg-transparent  data-[state=active]:border-none   data-[state=active]:shadow-none  border-none shadow-none
            "
            >
              Products
            </TabsTrigger>
            <TabsTrigger value="createProducts"
            className=
            "    data-[state=active]:text-blue-primary data-[state=active]:bg-transparent  data-[state=active]:border-none   data-[state=active]:shadow-none  border-none shadow-none "
            >
              Create Products
            </TabsTrigger>
            
          </div>
        </TabsList>

        <TabsContent value="products">
              <div className="flex-grow grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-3 mt-[67px] gap-6 justify-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
          
        </TabsContent>
        <TabsContent value="createProducts">
        <CreateProduct />
        </TabsContent>
        
      </Tabs>
          
         


        </div>
    </div>
  )
}

export default Product