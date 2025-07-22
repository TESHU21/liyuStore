import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrderByUser, fetchAllOrders } from '@/store/orderSlice';
import { DataTable } from '@/components/data-table';
import { columns } from './user/columns';

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const order_mine = useSelector((state) => state.orders.order_mine);
  const order_general = useSelector((state) => state.orders.order);
  const isLoading = useSelector((state) => state.orders.isFetchingOrder); // Optional

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = user?.isAdmin
          ? await dispatch(fetchAllOrders()).unwrap()
          : await dispatch(fetchAllOrderByUser()).unwrap();
        console.log('Fetched Orders:', response);
      } catch (error) {
        console.error('Order fetch failed:', error);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [dispatch, user]);

  const orders = Array.isArray(!user?.isAdmin ? order_general : order_mine)
    ? !user?.isAdmin
      ? order_general
      : order_mine
    : [];

  const formattedData = orders.map((item) => ({
    id: item._id,
    image: item.orderItems?.[0]?.image || '',
    date: new Date(item.createdAt).toISOString().split('T')[0],
    total: `${item.totalPrice} ETB`,
    status: item.isPaid ? 'Paid' : 'Pending',
    delivered: item.isDelivered ? 'Delivered' : 'Pending',
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
        ) : formattedData.length > 0 ? (
          <DataTable columns={columns({ handleViewDetail })} data={formattedData} />
        ) : (
          <p className="text-center text-gray-500 py-4">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
