import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye ,Clock,Check} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns = ({ handleConfirm, handleEdit, handleDelete }) => [
  {
    accessorKey: "firstName",
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
    accessorKey: "date",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => (
      <div className="text-center min-w-[100px]">{row.getValue("date")}</div>
    ),
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
  {
    accessorKey: "status",
    header: () => <div className="text-center">Payment</div>,
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
    accessorKey: "delivered",
    header: () => <div className="text-center">Delivered</div>,
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
    id: "detail",
    header: () => <div className="text-center"></div>,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2 min-w-[120px]">
        <Button size="icon" variant="ghost" onClick={() => handleViewDetail(row.original)}>
          <Eye className="h-4 w-4 text-green-600" />
        </Button>
      
      </div>
    ),
  },
];
