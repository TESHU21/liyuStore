import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = ({  handleEdit, handleDelete,editingRowId, setEditingRowId, editedValues, setEditedValues }) => [

  {
    accessorKey: "id",
    header: () => <div className="text-left ">Id</div>,
    cell: ({ row }) => (
      
      <div className="w-[150px] mr-10 text-left">{row.original.id}</div>
    ),
    size: 200,
  },
  {
    accessorKey: "fullName",
    header: () => <div className="text-left ">Full Name</div>,
    cell: ({ row }) => {
      const user = row.original;
      const isEditing = editingRowId === user.id;
      
      return isEditing ? (
        <input
          value={editedValues.fullName || ""}
          onChange={(e) => setEditedValues((prev) => ({ ...prev, fullName: e.target.value }))}
          className="border p-1"
        />
      ) : (
        user.fullName
      );
      
     
    },
    // Added size property to explicitly set column width to 800 units
    size: 200,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left ">Email</div>,
    cell: ({ row }) => {
      const user = row.original;
      const isEditing = editingRowId === user.id;
      return isEditing ? (
        <input
          value={editedValues.email || ""}
          onChange={(e) => setEditedValues((prev) => ({ ...prev, email: e.target.value }))}
          className="border p-1"
        />
      ) : (
        user.email
      );
     
      
    },
    // Added size property to explicitly set column width to 800 units
    size: 200,
  },


  {
    accessorKey: "admin",
    header: () => <div className="text-center">Admin</div>,
    cell: ({ row }) => {
      const admin = row.getValue("admin");
      return (
        <div className="flex justify-center min-w-[100px]">
            {admin ? (
              <>
                 <Check className="ml-1  text-green-500 w-5 h-5" />
              </>
            ) : (
              <>
                 <X className="ml-1 w-5 h-5 text-red-500 "  />
              </>
            )}
         
        </div>
      );
    },
  },
   {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const isEditing = editingRowId === user.id;

      return isEditing ? (
        <div className="flex gap-2">
          <button
            className="text-green-600"
            onClick={() => handleEdit(user.id, editedValues)}
          >
            Save
          </button>
          <button
            className="text-gray-500"
            onClick={() => {
              setEditingRowId(null);
              setEditedValues({});
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            className="text-blue-600"
            onClick={() => {
              setEditingRowId(user.id);
              setEditedValues({ fullName: user.fullName, email: user.email });
            }}
          >
            Edit
          </button>
          <button className="text-red-600" onClick={() => handleDelete(user.id)}>
            Delete
          </button>
        </div>
      );
    },
  },
 
];
