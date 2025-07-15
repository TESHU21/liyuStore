import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import ProductCard from '../user/ProductCard';
import CreateProduct from './ProductFormPage';
import { fetchProducts } from '@/store/productSlice';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useDispatch, useSelector } from 'react-redux';

const Product = () => {
  const [isEditingProducts, setIsEditingProducts] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const dispatch = useDispatch();
  const prod = useSelector((state) => state.products);

  const fetchProductsFun = async () => {
    try {
      await dispatch(fetchProducts()).unwrap();
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProductsFun();
  }, [dispatch]);

  return (
    <div className='flex flex-col py-6'>
      <div className='flex md:pl-[148px] gap-2 md:my-[40px] my-6 px-4'>
        <ChevronLeft onClick={() => setIsEditingProducts(null)} className="cursor-pointer" />
        <span>Back</span>
      </div>

      <div className='flex-grow md:mx-[43px] bg-[#F9FBFC] md:pb-20 md:px-[170px] px-6'>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          defaultValue="products"
          className="pt-10"
        >
          <div className="flex justify-between items-center">
            <TabsList className="bg-transparent flex gap-12 border-none shadow-none">
              <TabsTrigger
                value="products"
                className="
                  data-[state=active]:text-blue-primary 
                  data-[state=active]:bg-transparent 
                  data-[state=active]:border-none 
                  data-[state=active]:shadow-none 
                  border-none shadow-none
                  cursor-pointer
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
                  cursor-pointer
                "
              >
                {isEditingProducts ? "Update Products" : "Create Products"}
              </TabsTrigger>
            </TabsList>

            {activeTab === "products" && (
              <p className="text-end">Total: {prod.products.length}</p>
            )}
          </div>

          <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 mt-[67px] gap-6 justify-items-center">
              {prod.products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onEdit={(p) => {
                    setIsEditingProducts(p);
                    setActiveTab("createProducts");
                  }}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="createProducts">
            <CreateProduct
              productToEdit={isEditingProducts}
              setActiveTab={setActiveTab}
              setIsEditingProducts={setIsEditingProducts}
              refreshProducts={fetchProductsFun}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Product;
