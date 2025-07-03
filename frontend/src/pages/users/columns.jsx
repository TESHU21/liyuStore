import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = ({  handleEdit, handleDelete }) => [

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
    cell: ({ row }) => (
     
      <div className="w-[150px] mr-10 text-left">{row.original.fullName}</div>
    ),
    // Added size property to explicitly set column width to 800 units
    size: 200,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left ">Email</div>,
    cell: ({ row }) => (
     
      <div className="w-[150px] mr-10 text-left">{row.original.email}</div>
    ),
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
    id: "actions",
    header: () => <div className="text-center"></div>,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 min-w-[120px]">
        
        <Button size="icon" className="cursor-pointer" variant="ghost" onClick={() => handleEdit(row.original)}>
          <Pencil className="h-5 w-5 text-blue-primary cursor-pointer" />
        </Button>
        <Button size="icon" className="cursor-pointer" variant="ghost" onClick={() => handleDelete(row.original.id)}>
          <Trash2 className="h-5 w-5 text-red-600 cursor-pointer" />
        </Button>
      </div>
    ),
  },
];
