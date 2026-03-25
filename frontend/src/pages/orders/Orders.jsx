import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataTable } from "@/components/data-table";
import { columns } from "./user/columns";
import {
  useFetchAllOrderByUserQuery,
  useFetchAllOrdersQuery,
} from "@/store/api/orderApi";

const Orders = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const {
    data: ordersMineData,
    isLoading: isMineLoading,
    isFetching: isMineFetching,
    isError: isMineError,
    error: mineError,
  } = useFetchAllOrderByUserQuery(undefined, {
    skip: !user || user?.isAdmin,
  });

  const {
    data: ordersAllData,
    isLoading: isAllLoading,
    isFetching: isAllFetching,
    isError: isAllError,
    error: allError,
  } = useFetchAllOrdersQuery(undefined, {
    skip: !user || !user?.isAdmin,
  });

  const isLoading = isMineLoading || isAllLoading;
  const isFetching = isMineFetching || isAllFetching;
  const error = mineError || allError;

  const ordersRaw = user?.isAdmin ? ordersAllData : ordersMineData;
  const orders = Array.isArray(ordersRaw)
    ? ordersRaw
    : ordersRaw?.orders || ordersRaw?.data || [];

  const formattedData = orders.map((item) => ({
    id: item._id,
    image: item.orderItems?.[0]?.image || "",
    date: new Date(item.createdAt).toISOString().split("T")[0],
    total: `${item.totalPrice} ETB`,
    status: item.isPaid ? "Paid" : "Pending",
    delivered: item.isDelivered ? "Delivered" : "Pending",
  }));

  const handleViewDetail = (data) => {
    navigate(`/orders/${data.id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="py-8 font-lato font-semibold text-xl">My Orders</h1>

      <div className="w-full md:max-w-6xl px-4 overflow-x-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : isMineError || isAllError ? (
          <p className="text-center text-red-500 py-4">
            {error?.data?.message || "Failed to load orders."}
          </p>
        ) : formattedData.length > 0 ? (
          <DataTable
            columns={columns({ handleViewDetail })}
            data={formattedData}
          />
        ) : (
          <p className="text-center text-gray-500 py-4">No orders found.</p>
        )}

        {isFetching && !isLoading ? (
          <p className="text-center text-gray-400 py-2">Refreshing...</p>
        ) : null}
      </div>
    </div>
  );
};

export default Orders;
