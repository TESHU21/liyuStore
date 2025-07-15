import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from '@/components/ui/separator';
import ShopHeader from '../admin/components/ShopHeader';
import ProductCard from './ProductCard';
import { headers } from '../admin/components/products';
import PageHeader from '@/components/PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '@/store/productSlice';
import { fetchCategories } from '@/store/categorySlice';

const ShopUser = () => {
  const dispatch = useDispatch();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const prod = useSelector((state) => state.products);
  const categories = useSelector((state) => state.category.categories);

  // Create a lookup map from category ID to name
  const categoryMap = Object.fromEntries(
    categories.map((cat) => [cat._id, cat.name])
  );

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
  };

  const fetchProductsFun = async () => {
    try {
      const res = await dispatch(fetchAllProducts()).unwrap();
      const uniqueBrands = [
        ...new Set(res.products?.map((product) => product?.brand)),
      ];
      setBrands(uniqueBrands);

      await dispatch(fetchCategories()).unwrap();
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProductsFun();
  }, [dispatch]);

  // Filter products based on brand, category name, and price
  const filteredProducts = prod.products.filter((product) => {
    const categoryName = categoryMap[product.category]; // convert ID to name

    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(categoryName);

    const priceMatch =
      (!minPrice || product.price >= parseFloat(minPrice)) &&
      (!maxPrice || product.price <= parseFloat(maxPrice));

    return brandMatch && categoryMatch && priceMatch;
  });

  return (
    <div>
      <PageHeader header={headers} />
      <div className="flex flex-col md:flex-row pb-12 md:pb-[154px]">
        {/* Left Section - Filters */}
        <div className=" mt-6 md:pt-[55px] md:px-6">
          <h4 className="  text-2xs  md:text-lg font-bold text-center md:text-start">Shop By</h4>

          <div className=" flex flex-row md:flex-col bg-white mt-4 text-sm border-r">
            <Accordion type="multiple" className="w-full px-2">
              {/* Product Categories */}
              <AccordionItem value="categories" className="md:pb-[31px]">
                <AccordionTrigger className="font-semibold cursor-pointer">
                  Product Categories
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <label key={category._id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="accent-gray-600"
                      />
                      <span>{category.name}</span>
                    </label>
                  ))}
                </AccordionContent>
              </AccordionItem>

              {/* Brands */}
              <AccordionItem value="brands" className="md:py-[31px]">
                <AccordionTrigger className="font-semibold cursor-pointer">Brand</AccordionTrigger>
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
            <div className="px-4">
              <Separator className="mb-3" />
              <div className="flex flex-col">
                <h3 className="font-semibold my-4">Price</h3>
                <input
                  type="number"
                  placeholder="Min price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full p-2 bg-gray-100 text-gray-500 rounded outline-none mb-2"
                />
                <input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
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

        {/* Right Section - Products */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 md:pr-[39px] mt-4  md:mt-[110px] gap-4 justify-items-center">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopUser;
