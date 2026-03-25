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

const UserProfileMenu = ({ user }) => {
  const fullName = user ? `${user.fullName} ` : "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex gap-3 h-[38px]  justify-between items-center">
          <div className="flex gap-[8px] items-center ">
            <p className="font-inter text-base leading-6">
              {/* Full name for md+ screens */}
              <span className="hidden md:inline">{fullName}</span>

              {/* Initials inside circle for mobile */}
              <span className="inline md:hidden">
                <span className="inline-flex items-center justify-center w-8 h-8 p-2 rounded-full bg-purple-600 text-white font-semibold">
                  {fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </span>
            </p>
          </div>
          <ChevronDown size={24} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 border-t-0 mt-0 rounded-t-none -ml-4">
        <DropdownMenuGroup className="flex py-[4px] flex-col gap-2">
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
              to="/update-profile"
              className="flex items-center justify-between w-full"
            >
              Profile
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

export default UserProfileMenu;
