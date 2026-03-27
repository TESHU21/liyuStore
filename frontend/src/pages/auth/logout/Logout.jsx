import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/store/api/authApi";
import { baseApi } from "@/store/api/baseApi";
import { clearCart } from "@/store/cartSlice";
import { clearFavorites } from "@/store/favoriteSlice";
import { closeModal } from "@/store/uiSlice";

const Logout = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutUser] = useLogoutUserMutation();

  const handleLogOut = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
      // ignore server errors; still clear client auth
    } finally {
      localStorage.clear();
      dispatch(clearCart());
      dispatch(clearFavorites());
      dispatch(closeModal());
      dispatch(baseApi.util.resetApiState());
      window.dispatchEvent(new Event("auth:changed"));
      navigate("/");
    }
  };
  return (
    <Button
      ref={ref}
      className=" border-none bg-transparent text-black hover:bg-transparent ml-0 p-0 m-0 text-normal cursor-pointer"
      onClick={handleLogOut}
    >
      Logout
    </Button>
  );
});

export default Logout;
