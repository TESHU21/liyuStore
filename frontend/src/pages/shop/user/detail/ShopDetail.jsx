import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProductDetailsTabs from "./ProductDetailsTabs";
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "@/store/cartSlice";
import { toast } from "sonner";

const ShopDetail = () => {
  const [quantity, setQuantity] = useState(null);
  const maxQuantity = 1000;
  const quantityOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  const dispatch = useDispatch();
  const product = useSelector((state) => state.selectedProduct.product);

  const handleAddToCart = () => {
    if (!product || !quantity) return;

    dispatch(
      addProductToCart({
        _id: product._id,
        name: product.name,
        image: product.image,
        brand: product.brand,
        price: product.price,
        quantity: parseInt(quantity, 10),
      })
    );
    toast.success("You Added Items to cart sucessfully")
  };

  return (
    <div className="flex flex-col justify-center font-inter px-[40px] pb-16">
      <div className="bg-white rounded-xl flex flex-col lg:flex-row w-full overflow-hidden gap-10">
        {/* Product Image */}
        <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none">
          <img
            src={product?.image}
            alt={product?.name}
            className="max-w-full max-h-[332px] rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 flex flex-col">
          {/* Brand and Rating */}
          <div className="flex items-center mb-2 text-sm text-gray-600">
            <span className="mr-4 text-base">{product?.brand}</span>
            <div className="flex items-center text-yellow-500">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72a1 1 0 01.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg
                className="w-4 h-4 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.72a1 1 0 01.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-gray-600">(1 review)</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-lato text-3xl sm:text-4xl font-semibold mb-4 leading-tight">
            {product?.name}
          </h3>

          {/* Description */}
          <p className="text-gray-700 mt-7 text-base">
            {product?.description}
          </p>

          {/* Price */}
          <p className="text-blue-primary text-3xl leading-6 my-7">
            ${product?.price}
          </p>

          {/* Stock */}
          <p className="font-semibold">In stock</p>
          <Separator className="mt-4 mb-[40px]" />

          {/* Quantity Selector */}
          <div className="w-32 mb-6">
            <Select value={quantity} onValueChange={setQuantity}>
              <SelectTrigger className="w-[151px] bg-[#E6EFF5] h-12">
                <SelectValue placeholder="Quantity" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-auto">
                {quantityOptions.map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="bg-[#01589A] h-12 hover:bg-blue-primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Tabs Section */}
      <ProductDetailsTabs />
    </div>
  );
};

export default ShopDetail;
