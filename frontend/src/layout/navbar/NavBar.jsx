import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../components/ui/button";
import { LogIn, AlignJustify, X, Home } from "lucide-react";
import {
  House,
  ShoppingBag,
  ShoppingCart,
  Heart,
  User,
  BarChart3,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/store/uiSlice";
import ProfileMenu from "@/pages/profile/ProfileMenu";
import LiyuStore from "../../assets/Liyu Mart.webp";
import { useGetCurrentUserProfileQuery } from "@/store/api/authApi";

const NavBar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const favourite = useSelector((state) => state.favourite.favorites);
  const cartItemCount = cart.length;
  const favouriteItemCount = favourite.length;

  const [menuVisiblity, setMenuVisibility] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    const syncToken = () => setToken(localStorage.getItem("token"));
    window.addEventListener("auth:changed", syncToken);
    window.addEventListener("storage", syncToken);
    return () => {
      window.removeEventListener("auth:changed", syncToken);
      window.removeEventListener("storage", syncToken);
    };
  }, []);

  const { data: profileData } = useGetCurrentUserProfileQuery(undefined, {
    skip: !token,
  });
  const user = profileData?.user || profileData;
  const menuRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisibility(!menuVisiblity);
      }
    };

    if (menuVisiblity) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuVisiblity]);

  const handleClick = () => {
    setMenuVisibility(!menuVisiblity);
  };
  // Function for Desktop NavLink classes
  const getDesktopNavLinkClasses = ({ isActive }) =>
    `relative flex items-center justify-center  gap-2 group pb-2 transition-colors duration-200 ease-in-out ${
      isActive ? "text-blue-800" : "text-gray-700 hover:text-blue-primary"
    }
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-blue-600 after:transition-all after:duration-300 after:ease-in-out
    ${isActive ? "after:w-full" : "group-hover:after:w-full after:w-0"}
    `;

  // Function for Mobile NavLink classes (includes w-fit to constrain line length)
  const getMobileNavLinkClasses = ({ isActive }) =>
    `relative  flex gap-2 group pb-1 transition-colors duration-200 ease-in-out block w-fit ${
      // Added w-fit here
      isActive ? "text-blue-800" : "text-gray-700 hover:text-blue-primary"
    }
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:bg-blue-primary after:transition-all after:duration-300 after:ease-in-out
    ${isActive ? "after:w-full" : "group-hover:after:w-full after:w-0"}
    `;
  return (
    <div
      className="relative  shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
      ref={menuRef}
    >
      {/* Desktop Menu */}
      <div className=" hidden md:flex  justify-between md:px-10  h-[80px] items-center bg-white ">
        <div className=" flex items-center gap-8   ">
          <div className=" flex gap-[2.72px] items-center">
            <span className="font-lusitana text-[19px] font-bold leading-[100%] text-blue-primary  capitalize ">
              <img
                src={LiyuStore}
                alt="Liyu Mart Logo"
                loading="lazy"
                className="w-full h-10 object-cover"
              />
            </span>
          </div>
          <div className="flex gap-8 ml-[342px]">
            <NavLink to="/" className={getDesktopNavLinkClasses}>
              <span>
                <Home size={24} />
              </span>
              Home
            </NavLink>
            <NavLink to="/shop" className={getDesktopNavLinkClasses}>
              {" "}
              <ShoppingBag size={24} /> <span>Shop</span>
            </NavLink>

            <NavLink to="/cart" className={getDesktopNavLinkClasses}>
              <span>
                <ShoppingCart size={24} />
              </span>
              Cart
              {cartItemCount > 0 && (
                <span className="   flex  items-center justify-center  bg-blue-primary w-5 h-5 text-white text-xs font-bold px-1  rounded-full">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
            <NavLink to="/favourite" className={getDesktopNavLinkClasses}>
              {" "}
              <span>
                <Heart size={24} />
              </span>
              Favourite
              {favouriteItemCount > 0 && (
                <span className=" flex items-center justify-center  w-5 h-5  bg-blue-primary text-white text-xs font-bold px-1  rounded-full">
                  {favouriteItemCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
        {user ? (
          <div>
            <ProfileMenu />
          </div>
        ) : (
          <div className=" flex ">
            <Button
              className="py-3 px-2  bg-white  hover:bg-white text-base leading-6 font-semibold text-black border-0 md:shadow-none rounded-md  cursor-pointer"
              onClick={() => dispatch(openModal("login"))}
            >
              {" "}
              <span className="ml-3">
                <LogIn size={24} />
              </span>
              Login
            </Button>
            <Button
              className="py-3 px-2 bg-white text-black text-base leading-6 font-semibold rounded-md border-0 cursor-pointer shadow-none hover:bg-white"
              onClick={() => dispatch(openModal("signup"))}
            >
              <User size={24} /> <span className=""> Register</span>
            </Button>
          </div>
        )}
      </div>
      {/* Mobile Menu */}
      <div
        className="md:hidden flex justify-between items-center 
p-4 border-b"
      >
        {/* Left: Hamburger/Close Icon */}
        <div onClick={handleClick} className="cursor-pointer">
          {menuVisiblity ? (
            <X size={24} className="" />
          ) : (
            <AlignJustify size={24} />
          )}
        </div>

        {/* Center: Logo */}
        <div className=" flex gap-[2.72px] items-center">
          <span className="font-lusitana text-[19px] font-bold leading-[100%] text-blue-primary  capitalize ">
            <img
              src={LiyuStore}
              alt="Liyu Mart Logo"
              loading="lazy"
              width={100}
              height={50}
              className="w-full h-10 object-cover"
            />
          </span>
        </div>

        {/* Right: Profile Menu or Auth Buttons */}
        <div>
          {user ? (
            <ProfileMenu />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                className="py-2 px-3 bg-white hover:bg-white text-sm font-semibold text-black shadow-none border-0 rounded-md"
                onClick={() => dispatch(openModal("login"))}
              >
                <LogIn size={20} className="mr-1" />
                Login
              </Button>
              <Button
                className="py-2 px-3 bg-white text-black text-sm font-semibold rounded-md border-0 shadow-none hover:bg-white"
                onClick={() => dispatch(openModal("signup"))}
              >
                <User size={20} className="mr-1" />
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
      {menuVisiblity && (
        <div className="md:hidden fixed top-0 left-0 w-[270px] h-screen z-50 bg-white shadow-lg pt-16 px-6">
          <div
            className="absolute top-4 right-6 cursor-pointer"
            onClick={handleClick}
          >
            <X size={24} className=" text-red-600" />
          </div>
          <ul className="flex flex-col gap-5 text-base font-medium">
            <li>
              <NavLink to="/" className={getMobileNavLinkClasses}>
                <Home size={20} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" className={getMobileNavLinkClasses}>
                <ShoppingBag size={20} /> Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={getMobileNavLinkClasses}>
                <span>
                  <ShoppingCart size={24} />
                </span>
                Cart
                {cartItemCount > 0 && (
                  <span className="   flex  items-center justify-center  bg-blue-primary w-5 h-5 text-white text-xs font-bold px-1  rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to="/favourite" className={getMobileNavLinkClasses}>
                {" "}
                <span>
                  <Heart size={24} />
                </span>
                Favourite
                {favouriteItemCount > 0 && (
                  <span className=" flex items-center justify-center  w-5 h-5  bg-blue-primary text-white text-xs font-bold px-1  rounded-full">
                    {favouriteItemCount}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
