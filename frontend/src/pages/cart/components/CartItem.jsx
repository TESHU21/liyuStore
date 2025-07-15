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
    <div className="mx-auto max-w-4xl border-b pb-4 mb-4 px-4">
      {/* Header Row - hidden on mobile */}
      <div className="hidden md:grid grid-cols-5 font-semibold text-lg leading-[23.1px] mb-2">
        <div>Product</div>
        <div></div>
        <div className="col-span-1">Price</div>
        <div className="col-span-1">Quantity</div>
        <div className="col-span-1">Total</div>
      </div>

      {/* Item Row */}
      <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-4 py-4 border-t">
        {/* Product Info */}
        <div className="md:col-span-2 flex md:flex-row flex-col md:items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
          <img
            src={cart.image}
            alt={cart.name}
            className="w-full md:w-28 h-40 md:h-20 object-cover rounded"
          />
          <div>
            <p className="font-semibold text-base md:text-lg">{cart.name}</p>
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
        <div className="flex justify-between md:block">
          <span className="md:hidden font-semibold">Price: </span>
          <span>${cart.price.toLocaleString()}</span>
        </div>

        {/* Quantity Selector */}
        <div className="flex justify-between md:block">
          <span className="md:hidden font-semibold">Qty: </span>
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
        <div className="flex justify-between md:block">
          <span className="md:hidden font-semibold">Total: </span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
