import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from '@/components/ui/separator'
import ShopHeader from './components/ShopHeader'
import ProductCard from './components/ProductCard'
import { products } from './components/products'

const Shop = () => {
  const [selectedBrands, setSelectedBrands] = useState([])
  const [price, setPrice] = useState("")

  const brands = ["Apple", "Samsung", "Lenovo", "Sony"]

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    )
  }

  const handleReset = () => {
    setSelectedBrands([])
    setPrice("")
  }

  return (
    <div>
      <ShopHeader />
      <div className=' flex'>
        {/* Left Secton */}
        <div className="pt-[55px] md:px-[42px]">
        <h4 className="text-lg font-bold">Shop By</h4>

        <div className="w-64 bg-white mt-4 text-sm border-r">
          {/* Filter Accordion */}
          <Accordion type="multiple" className="w-full px-4">
            {/* Product Categories */}
            <AccordionItem value="categories" className="md:pb-[31px]">
              <AccordionTrigger className="font-semibold">Product Categories</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 text-gray-700">
                  <li>Laptops (4)</li>
                  <li>Phones (3)</li>
                  <li>Cameras</li>
                  <li>Watches (3)</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Brands */}
            <AccordionItem value="brands" className="md:py-[31px]">
              <AccordionTrigger className="font-semibold">Brand</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="accent-gray-600"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Price Filter */}
          <div className="px-4 ">
            <Separator className="mb-3" />
            <div className='flex flex-col '>
            <h3 className="font-semibold my-8 ">Price</h3>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full p-2 bg-gray-100 text-gray-500 rounded outline-none"
            />
          </div>

          {/* Reset Button */}
          <div className="px-4 mt-4">
            <button
              onClick={handleReset}
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
            >
              Reset
            </button>
          </div>
          </div>
        </div>
      </div>
      <div className="flex-grow grid grid-cols-1  lg:grid-cols-3 xl:grid-cols-4 px-[39px] mt-[110px] gap-6 justify-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      </div>


    </div>
  )
}

export default Shop
