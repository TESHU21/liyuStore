import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ReviewForm from './ReviewForm'
import ReletedProducts from './ReletedProducts'
import AllReviews from './AllReviews'

const ProductDetailsTabs = () => {
  return (
    <div className='pt-[80px]' >
     
      <Tabs defaultValue="relatedproducts "  >
         <div  className=' flex justify-center pb-[50px]'>
        <TabsList asChild className="bg-transparent flex border-none shadow-none">
          <div className='flex gap-[64px] '>
            <TabsTrigger value="relatedproducts"    className="
                  data-[state=active]:text-blue-primary 
                  data-[state=active]:bg-transparent 
                  data-[state=active]:border-none 
                  data-[state=active]:shadow-none 
                  border-none shadow-none
                  cursor-pointer
                ">
              Related Product
            </TabsTrigger>
            <TabsTrigger value="reviewform"    className="
                  data-[state=active]:text-blue-primary 
                  data-[state=active]:bg-transparent 
                  data-[state=active]:border-none 
                  data-[state=active]:shadow-none 
                  border-none shadow-none
                  cursor-pointer
                ">
              Write Your Review
            </TabsTrigger>
            <TabsTrigger value="allreviews"    className="
                  data-[state=active]:text-blue-primary 
                  data-[state=active]:bg-transparent 
                  data-[state=active]:border-none 
                  data-[state=active]:shadow-none 
                  border-none shadow-none
                  cursor-pointer
                ">
              All Reviews
            </TabsTrigger>
          </div>
        </TabsList>
        </div>

        <TabsContent value="relatedproducts">
          <ReletedProducts />
        </TabsContent>
        <TabsContent value="reviewform">
          <ReviewForm />
        </TabsContent>
        <TabsContent value="allreviews">
          <AllReviews />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProductDetailsTabs
