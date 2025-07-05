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
import Rating from "@/components/Rating";

const ShopDetail = () => {
  const [quantity, setQuantity] = useState("");
  const maxQuantity = 1000;
  const quantityOptions = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  const dispatch = useDispatch();
  const product = useSelector((state) => state.selectedProduct.product);
  console.log("Proddddduct",product.rating)

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
          <div className="flex items-center mb-2 text-sm pt-8 text-gray-600">
            <span className="mr-4 text-base">{product?.brand}</span>
          
            <Rating rating={product.rating} totalReviews={product.numReviews}/>
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
    <SelectValue className="text-black" placeholder="Select Quantity" />
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
