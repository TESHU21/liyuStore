import React,{useState} from 'react'
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
  const [activeTab,setActiveTab]=useState("products")
  return (
    <div className='flex flex-col'>
        <div className='flex md:pl-[148px] gap-2 md:my-[40px]'><ChevronLeft/> <span>Back </span></div>
        <div className=' flex-grow mx-[43px] bg-[#F9FBFC] h-auto px-[170px] '>
        
               <Tabs defaultValue="products" className="pt-10"
               value={activeTab}
               onValueChange={setActiveTab}

               >
  <div className="flex justify-between items-center">
    <TabsList className="bg-transparent flex gap-12 border-none shadow-none"
    
    
    >
      <TabsTrigger
        value="products"
        className="
          data-[state=active]:text-blue-primary 
          data-[state=active]:bg-transparent 
          data-[state=active]:border-none 
          data-[state=active]:shadow-none 
          border-none shadow-none
        "
      >
        Products
      </TabsTrigger>
      <TabsTrigger
        value="createProducts"
        className="
          data-[state=active]:text-blue-primary 
          data-[state=active]:bg-transparent 
          data-[state=active]:border-none 
          data-[state=active]:shadow-none 
          border-none shadow-none
        "
      >
        Create Products
      </TabsTrigger>
    </TabsList>
    {activeTab === "products" && (
  <p className="text-end">Total: {products.length}</p>
)}

  </div>

  <TabsContent value="products">
    <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 mt-[67px] gap-6 justify-items-center">
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