import React from 'react';

const OrderDetailSummery = ({order}) => {
  
  return (
    <div className="border border-gray-200 rounded-md p-6 bg-white">
      {/* Shipping Section */}
      <div>
        <h2 className="text-lg font-semibold text-blue-800 mb-4">Shipping</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold text-blue-800">Order:</span>
            <span>{order._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-800">Name:</span>
            <span>John Doe</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-800">Email:</span>
            <span>Johndoe@gmail.com</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-800">Order:</span>
            <span>{order.shippingAddress.city} ,{order.shippingAddress.country}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-800">Method:</span>
            <span>{order.itemsPrice}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6" />

      {/* Order Summary Section */}
      <div>
        <h2 className="text-lg font-semibold text-blue-800 mb-4">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold text-blue-800">Items:</span>
            <span>$ {order?.itemsPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-800">Shipping:</span>
            <span>$ 0</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-800">Tax:</span>
            <span>$ {order?.taxPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-blue-800">Total:</span>
            <span className="font-bold">$ {order?.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSummery;
