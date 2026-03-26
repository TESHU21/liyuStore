import React from "react";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Logout from "../../auth/logout/Logout";

const AdminProfileMenu = ({ user }) => {
  const adminLabel = user?.fullName || "Admin";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex gap-3 h-[38px]  justify-between items-center">
          <div className="flex gap-[8px] items-center ">
            {/* <p className=' flex w-[40px] h-[40px] bg-blue-primary rounded-full  items-center justify-center text-white leading-6 text-base'>
              {profileInitial}
            </p> */}
            <p className=" font-inter text-base leading-6">{adminLabel}</p>
          </div>
          <ChevronDown size={24} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 border-t-0 mt-0 rounded-t-none -ml-4">
        <DropdownMenuGroup className="flex py-[4px] flex-col gap-2">
          <DropdownMenuItem asChild>
            <NavLink
              to="/shop"
              className="flex items-center justify-between w-full"
            >
              Products
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink
              to="/category"
              className="flex items-center justify-between w-full"
            >
              Catagory
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink
              to="/orders"
              className="flex items-center justify-between w-full"
            >
              Orders
            </NavLink>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <NavLink
              to="/user"
              className="flex items-center justify-between w-full"
            >
              Users
            </NavLink>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <hr className="my-2 border-gray-400" />

        <DropdownMenuItem asChild>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminProfileMenu;
