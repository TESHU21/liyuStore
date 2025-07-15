import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronLeft } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { getAllUsers, deleteUser, editUser } from "@/store/userSlice";
import { getColumns } from "./columns";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [editingRowId, setEditingRowId] = useState(null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Format users for the table
  const formattedData = users.map((user) => ({
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    admin: user.isAdmin,
  }));

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  // Handle edit — this receives userId and the edited user data from columns
  const handleEdit = (id, userData) => {
    dispatch(editUser({ id, userData }));
    setEditingRowId(null);
  };

  // Memoize columns to avoid unnecessary re-renders
  const columns = useMemo(
    () =>
      getColumns({
        handleDelete,
        handleEdit,
        editingRowId,
        setEditingRowId,
      }),
    [handleDelete, handleEdit, editingRowId]
  );

  return (
    <div className="md:mx-[250px] px-2">
      <div className="flex py-15">
        <ChevronLeft />
        <span>Back</span>
      </div>
      <h6 className="font-semibold leading-relaxed text-2xl text-blue-primary pb-4">
        Users
      </h6>
      <div className=" overflow-x-auto">
        <DataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
};

export default User;
