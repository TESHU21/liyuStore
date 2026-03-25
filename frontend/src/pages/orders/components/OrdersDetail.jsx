import React, { useMemo } from "react";
import { columns } from "./colomns";
import { DataTable } from "@/components/data-table";
import OrderDetailSummery from "./OrderDetailSummery";
import { useParams } from "react-router-dom";
import { useFetchOrderByIdQuery } from "@/store/api/orderApi";

const OrdersDetail = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchOrderByIdQuery(id, {
    skip: !id,
  });

  const formattedData = useMemo(() => {
    const items = order?.orderItems || [];
    return items.map((item) => ({
      image: item.image,
      product: item.name,
      quantity: item.qty,
      unitprice: item.price,
      total: item.price * item.qty,
    }));
  }, [order]);

  return (
    <div className="flex gap-10 pt-10 mx-auto justify-center">
      {isLoading ? (
        <div className="text-gray-500">Loading order...</div>
      ) : isError ? (
        <div className="text-red-500">
          {error?.data?.message || "Failed to load order"}
        </div>
      ) : (
        <>
          {formattedData?.length ? (
            <DataTable columns={columns()} data={formattedData} />
          ) : null}

          <OrderDetailSummery order={order} />
        </>
      )}

      {isFetching && !isLoading ? (
        <div className="text-gray-400">Refreshing...</div>
      ) : null}
    </div>
  );
};

export default OrdersDetail;
