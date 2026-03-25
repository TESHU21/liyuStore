import React, { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import ShopHeader from "../admin/components/ShopHeader";
import ProductCard from "./ProductCard";
import { headers } from "../admin/components/products";
import PageHeader from "@/components/PageHeader";
import Loader from "@/components/Loader";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { useGetCategoriesQuery } from "@/store/api/catagoriesApi";

const ShopUser = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // const prod = useSelector((state) => state.products);
  // const categories = useSelector((state) => state.category.categories);

  // Create a lookup map from category ID to name
  const {
    data: productsData,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetProductsQuery();
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();
  const loading = isProductsLoading || isCategoriesLoading;
  const error = productsError || categoriesError;

  // normalize data
  const productsArray = useMemo(() => {
    if (Array.isArray(productsData)) return productsData;
    return productsData?.products || productsData?.data || [];
  }, [productsData]);

  const categories = useMemo(() => {
    if (Array.isArray(categoriesData)) return categoriesData;
    return categoriesData?.categories || categoriesData?.data || [];
  }, [categoriesData]);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((cat) => [cat._id, cat.name])),
    [categories],
  );

  const brands = useMemo(
    () => [
      ...new Set(
        productsArray.map((product) => product?.brand).filter(Boolean),
      ),
    ],
    [productsArray],
  );

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleReset = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
  };

  // Extract products array from different possible response structures

  // Filter products based on brand, category name, and price
  const filteredProducts = productsArray.filter((product) => {
    const categoryName = categoryMap[product.category]; // convert ID to name

    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(categoryName);

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
          <h4 className="  text-2xs  md:text-lg font-bold text-center md:text-start">
            Shop By
          </h4>

          <div className=" flex flex-row md:flex-col bg-white mt-4 text-sm border-r">
            <Accordion type="multiple" className="w-full px-2">
              {/* Product Categories */}
              <AccordionItem value="categories" className="md:pb-[31px]">
                <AccordionTrigger className="font-semibold cursor-pointer">
                  Product Categories
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  {categories?.map((category) => (
                    <label
                      key={category._id}
                      className="flex items-center space-x-2"
                    >
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
                <AccordionTrigger className="font-semibold cursor-pointer">
                  Brand
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {brands?.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center space-x-2"
                      >
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
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:pr-[39px] mt-4  md:mt-[110px] gap-4 justify-items-center">
          {loading ? (
            <div className="col-span-full flex items-center  py-12">
              <Loader />
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12 text-red-500">
              {error?.data?.message || "Failed to load shop data"}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No products found matching your filters
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopUser;
