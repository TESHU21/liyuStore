

export function OrderSummaryCard({
  orderItem,
 
}) {
  return (
    <div className="w-full ">
      {/* Header */}
      <div className=" flex items-center py-4 justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={orderItem.image}
              alt={orderItem.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <span className="absolute -top-2 -right-2 bg-blue-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {orderItem.quantity}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">{orderItem.name}</h3>
            <p className="text-sm text-gray-500">Brand: {orderItem.brand}</p>
            <p className="text-sm text-gray-500">${orderItem.price.toFixed(2)}</p>
          </div>
        </div>
        <span className="text-lg font-semibold">
          ${(orderItem.price * orderItem.quantity).toFixed(2)}
        </span>
      </div>

     
    </div>
  );
}
