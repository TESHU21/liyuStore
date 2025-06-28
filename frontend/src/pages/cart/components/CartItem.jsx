import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const CartItem = ({cart}) => {
  const [quantity, setQuantity] = useState(1);
  const price = 749.99;
  const total = (quantity * price).toFixed(2);

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="border-b pb-4 mb-4">
        <div className="grid grid-cols-5 font-semibold text-lg mb-2">
          <div>Product</div>
          <div></div>
          <div className="col-span-1">Price</div>
          <div className="col-span-1">Quantity</div>
          <div className="col-span-1">Total</div>
        </div>

        <div className="grid grid-cols-5 items-center gap-4 py-4 border-t">
          <div className="flex items-center space-x-4 col-span-2">
            <img
            src={cart?.image}
              alt="MacBook"
              className="w-28 h-20 object-cover"
            />
            <div>
              <p className="font-semibold">{cart?.name}</p>
              <p className="text-gray-500 text-sm">{cart?.brand}</p>
              <button className="text-red-600 text-sm mt-1 hover:underline">
                Remove
              </button>
            </div>
          </div>

          <div>${price}</div>

          <div>
            <select
              value={quantity}
              onChange={handleQuantityChange}
              className="border rounded-md px-4 py-2 bg-gray-100"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>${total}</div>
        </div>
      </div>

      <div className="text-lg font-medium mb-2">Items : {quantity}</div>
      <div className="text-xl font-semibold mb-6">Total : ${total}</div>

      <button className="bg-blue-700 text-white px-6 py-3 rounded-md hover:bg-blue-800">
        Proceed to checkout
      </button>
    </div>
  );
};

export default CartItem;
