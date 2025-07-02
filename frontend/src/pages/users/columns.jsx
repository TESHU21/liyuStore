import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash2, Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = ({  handleEdit, handleDelete }) => [

  {
    accessorKey: "id",
    header: () => <div className="text-left ">Id</div>,
    cell: ({ row }) => (
      // The size property in the column definition controls the width in TanStack Table.
      // Keeping the Tailwind class here as well, but 'size' is primary.
      <div className="w-[150px] mr-10 text-left">{row.original.id}</div>
    ),
    // Added size property to explicitly set column width to 800 units
    size: 200,
  },
  {
    accessorKey: "fullName",
    header: () => <div className="text-left ">Full Name</div>,
    cell: ({ row }) => (
      // The size property in the column definition controls the width in TanStack Table.
      // Keeping the Tailwind class here as well, but 'size' is primary.
      <div className="w-[150px] mr-10 text-left">{row.original.fullName}</div>
    ),
    // Added size property to explicitly set column width to 800 units
    size: 200,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left ">Email</div>,
    cell: ({ row }) => (
      // The size property in the column definition controls the width in TanStack Table.
      // Keeping the Tailwind class here as well, but 'size' is primary.
      <div className="w-[150px] mr-10 text-left">{row.original.email}</div>
    ),
    // Added size property to explicitly set column width to 800 units
    size: 200,
  },
  {
    accessorKey: "admin",
    header: () => <div className="text-left ">Email</div>,
    cell: ({ row }) => (
      // The size property in the column definition controls the width in TanStack Table.
      // Keeping the Tailwind class here as well, but 'size' is primary.
      <div className="w-[150px] mr-10 text-left">{row.original.admin}</div>
    ),
    // Added size property to explicitly set column width to 800 units
    size: 200,
  },

  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      const isPaid = status === "Paid";
      return (
        <div className="flex justify-center min-w-[100px]">
          <Badge variant={isPaid ? "success" : "secondary"}>
            {isPaid ? (
              <>
                Paid <Check className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                Pending <Clock className="ml-1 w-4 h-4" />
              </>
            )}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 min-w-[120px]">
        
        <Button size="icon" variant="ghost" onClick={() => handleEdit(row.original)}>
          <Pencil className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => handleDelete(row.original.id)}>
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </div>
    ),
  },
];
