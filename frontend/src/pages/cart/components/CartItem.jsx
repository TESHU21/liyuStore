import React from "react";
import { useDispatch } from "react-redux";
import { removeProductFromCart, updateProductQuantity } from "@/store/cartSlice";

const CartItem = ({ cart }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity !== cart.quantity) {
      dispatch(updateProductQuantity({ id: cart._id, quantity: newQuantity }));
    }
  };

  const total = (cart.price * cart.quantity).toFixed(2);

  return (
    <div className="mx-auto max-w-4xl border-b pb-4 mb-4">
      <div className="grid grid-cols-5 font-semibold text-lg leading-[23.1px] mb-2">
        <div>Product</div>
        <div></div>
        <div className="col-span-1">Price</div>
        <div className="col-span-1">Quantity</div>
        <div className="col-span-1">Total</div>
      </div>

      <div className="grid grid-cols-5 items-center gap-4 py-4 border-t">
        {/* Product Info */}
        <div className="flex items-center space-x-4 col-span-2">
          <img
            src={cart.image}
            alt={cart.name}
            className="w-28 h-20 object-cover"
          />
          <div>
            <p className="font-semibold">{cart.name}</p>
            <p className="text-gray-500 text-sm">Brand: {cart.brand}</p>
            <button
              className="text-red-500 text-sm hover:underline mt-1"
              onClick={() => dispatch(removeProductFromCart(cart._id))}
            >
              Remove
            </button>
          </div>
        </div>

        {/* Price */}
        <div>${cart.price.toLocaleString()}</div>

        {/* Quantity Selector */}
        <div>
          <select
            value={cart.quantity}
            onChange={handleQuantityChange}
            className="border rounded-md px-4 py-2 bg-[#E6EFF5]"
          >
            {Array.from({ length: 1000 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Total Price */}
        <div>${total}</div>
      </div>
    </div>
  );
};

export default CartItem;
