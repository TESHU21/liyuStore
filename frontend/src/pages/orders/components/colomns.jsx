import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye ,Clock,Check} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = () => [
  {
    accessorKey: "Image",
    header: () => <div className="text-left">Learners</div>,
    cell: ({ row }) => {
      const {  image } = row.original;
      return (
        <div className="flex items-center gap-3 min-w-[150px]">
          <Avatar>
            <AvatarImage src={image} />
      
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "product",
    header: () => <div className="text-left ">Product</div>,
    cell: ({ row }) => (
      
      <div className="w-[150px] mr-10 text-left">{row.original.product}</div>
    ),
    size: 200,
  },
 
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">Quantity</div>,
    cell: ({ row }) => (
      <div className="text-center min-w-[100px]">{row.getValue("quantity")}</div>
    ),
  },
    {
    accessorKey: "unitprice",
    header: () => <div className="text-left ">Unit Price</div>,
    cell: ({ row }) => (
      
      <div className="w-[150px] mr-10 text-left">{row.original.unitprice}</div>
    ),
    // Added size property to explicitly set column width to 800 units
    size: 200,
  },
    {
    accessorKey: "total",
    header: () => <div className="text-left ">Total</div>,
    cell: ({ row }) => (
      // The size property in the column definition controls the width in TanStack Table.
      // Keeping the Tailwind class here as well, but 'size' is primary.
      <div className="w-[150px] mr-10 text-left">{row.original.total}</div>
    ),
    // Added size property to explicitly set column width to 800 units
    size: 200,
  },
 

];
