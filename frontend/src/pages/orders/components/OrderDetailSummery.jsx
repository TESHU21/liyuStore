import React from 'react';
import { useSelector } from 'react-redux';

const OrderDetailSummery = ({ order }) => {
  const user = useSelector((state) => state.auth?.user);

  const {
    _id,
    shippingAddress = {},
    itemsPrice,
    taxPrice,
    totalPrice,
  } = order || {};

  const { city, country } = shippingAddress;

  return (
    <div className="flex flex-col border border-gray-200 md:w-[373px] rounded-md p-6 bg-white">
      
      {/* Shipping Section */}
      <div>
        <h2 className="text-lg font-semibold text-blue-800 mb-4">Shipping</h2>
        <div className="space-y-2 text-sm">
          <InfoRow label="Order ID:" value={_id} />
          <InfoRow label="Name:" value={user?.fullName || 'N/A'} />
          <InfoRow label="Email:" value={user?.email || 'N/A'} />
          <InfoRow label="Location:" value={`${city || '-'}, ${country || '-'}`} />
          <InfoRow label="Price:" value={`$${itemsPrice?.toFixed(2) || '0.00'}`} />
        </div>
      </div>

      <hr className="my-6" />

      {/* Order Summary Section */}
      <div>
        <h2 className="text-lg font-semibold text-blue-800 mb-4">Order Summary</h2>
        <div className="space-y-2 gap-8 text-sm">
          <InfoRow label="Items:" value={`$${itemsPrice?.toFixed(2) || '0.00'}`} />
          <InfoRow label="Shipping:" value={`$${order?.shippingPrice?.toFixed(2) || '0.00'}`} />
          <InfoRow label="Tax:" value={`$${taxPrice?.toFixed(2) || '0.00'}`} />
          <InfoRow label="Total:" value={`$${totalPrice?.toFixed(2) || '0.00'}`} bold />
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable row component
const InfoRow = ({ label, value, bold = false }) => (
  <div className="flex justify-between ">
    <span className="font-semibold text-blue-800">{label}</span>
    <span className={bold ? 'font-bold' : ''}>{value}</span>
  </div>
);

export default OrderDetailSummery;
