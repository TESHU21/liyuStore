import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Check, X } from "lucide-react";

// ✅ Memoized editable input with local state
const EditableCell = React.memo(({ defaultValue, onSave }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onSave(value)}
      className="border p-1 border-blue-primary w-full"
    />
  );
});

export const getColumns = ({
  handleEdit,
  handleDelete,
  editingRowId,
  setEditingRowId,
}) => [
  {
    accessorKey: "id",
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => (
      <div className="text-left w-[150px]">{row.original.id}</div>
    ),
    size: 200,
  },
  {
    accessorKey: "fullName",
    header: () => <div className="text-left">Full Name</div>,
    cell: ({ row }) => {
      const user = row.original;
      const isEditing = editingRowId === user.id;

      return isEditing ? (
        <EditableCell
          defaultValue={user.fullName}
          onSave={(val) =>
            handleEdit(user.id, { fullName: val, email: user.email })
          }
        />
      ) : (
        <div className="w-full text-left">{user.fullName}</div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => {
      const user = row.original;
      const isEditing = editingRowId === user.id;

      return isEditing ? (
        <EditableCell
          defaultValue={user.email}
          onSave={(val) =>
            handleEdit(user.id, { fullName: user.fullName, email: val })
          }
        />
      ) : (
        <div className="w-full text-left">{user.email}</div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "admin",
    header: () => <div className="text-center">Admin</div>,
    cell: ({ row }) => {
      const admin = row.getValue("admin");
      return (
        <div className="flex justify-center items-center min-w-[100px]">
          {admin ? (
            <Check className="text-green-500 w-5 h-5" />
          ) : (
            <X className="text-red-500 w-5 h-5" />
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      const isEditing = editingRowId === user.id;

      return (
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className=" flex gap-2">
               <button
              className="text-green-500"
              onClick={() => {
                setEditingRowId(null);
              }}
            >
              Save
            </button>
            <button
              className="text-red-500"
              onClick={() => {
                setEditingRowId(null);
              }}
            >
              Cancel
            </button>
            </div>
            
           
          ) : (
            <>
              <button
                className="text-blue-600"
                onClick={() => {
                  setEditingRowId(user.id);
                }}
              >
                <Pencil className="w-5 h-5 text-blue-primary" />
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(user.id)}
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </>
          )}
        </div>
      );
    },
  },
];
