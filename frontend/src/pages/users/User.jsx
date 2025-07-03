import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronLeft } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { columns } from './columns';
import { getAllUsers, deleteUser } from '@/store/userSlice';

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = () => {
    console.log("handle Edit");
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const formattedData = users.map((item) => ({
    id: item._id,
    fullName: item.fullName,
    email: item.email,
    admin: item.isAdmin,
  }));

  return (
    <div className='mx-[250px]'>
      <div className='flex py-15'>
        <ChevronLeft />
        <span>Back</span>
      </div>
      <h6 className='font-semibold leading-relaxed text-2xl text-blue-primary pb-4'>Users</h6>
      <div>
        <DataTable columns={columns({ handleDelete, handleEdit })} data={formattedData} />
      </div>
    </div>
  );
};

export default User;
