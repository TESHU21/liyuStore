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
    <div>
      <Tabs defaultValue="relatedproducts" className="py-0">
        <TabsList asChild>
          <div className='flex'>
            <TabsTrigger value="relatedproducts">
              Related Product
            </TabsTrigger>
            <TabsTrigger value="reviewform">
              Write Your Review
            </TabsTrigger>
            <TabsTrigger value="allreviews">
              All Reviews
            </TabsTrigger>
          </div>
        </TabsList>

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
