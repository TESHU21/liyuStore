import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye ,Clock,Check} from "lucide-react";

export const columns = ({ handleViewDetail }) => [
  {
    accessorKey: "firstName",
    header: () => <div className="text-left">Product Image</div>,
    cell: ({ row }) => {
      const {  image } = row.original;
      return (
        <div className="flex items-center gap-3 ">
          
           <img src={image} alt=""  className=" w-32 h-24  object-cover" />
    
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-left ">Id</div>,
    cell: ({ row }) => (
     
      <div className="md:w-[150px] mr-10 text-left">{row.original.id}</div>
    ),
    size: 200,
  },
 
  {
    accessorKey: "date",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => (
      <div className="text-center md:min-w-[100px]">{row.getValue("date")}</div>
    ),
  },
    {
    accessorKey: "total",
    header: () => <div className="text-left ">Total</div>,
    cell: ({ row }) => (
      
      <div className="md:w-[150px] md:mr-10 text-left">{row.original.total}</div>
    ),
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
               <div className="p-2 bg-green-600">Completed</div>
              </>
            ) : (
              <>
                 <div className="p-2 bg-[#F7E9EA]">Pending</div>

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
      const delivered = row.getValue("delivered");
            const isDelivered = delivered === "Delivered";

      return (
        <div className="flex justify-center md:min-w-[100px]">
          <Badge variant={isDelivered? "success" : "secondary"}>
            {isDelivered? (
                <>
               <div className="p-2 bg-green-600">Delivered</div>
              </>
            ) : (
              <>
                 <div className="p-2 bg-[#F7E9EA]">Pending</div>

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
      <div className="flex justify-center gap-2 md:min-w-[120px]">
        <Button size="icon" variant="ghost" onClick={() => handleViewDetail(row.original)}>
          <Eye className="h-4 w-4 text-green-600" />
        </Button>
      
      </div>
    ),
  },
];
