import React from "react";
import PageHeader from "@/components/PageHeader";
import { headers } from "./components/data";
import { useSelector } from "react-redux";
import CartItem from "./components/CartItem";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useGetCurrentUserProfileQuery } from "@/store/api/authApi";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const token = localStorage.getItem("token");
  const { data: profileData } = useGetCurrentUserProfileQuery(undefined, {
    skip: !token,
  });
  const user = profileData?.user || profileData;
  // ⛔ Protect Cart Page for Admins
  if (user?.isAdmin) {
    // return <Navigate to="/" replace />;
    // Or you can show a message instead:
    return (
      <p className="text-center py-20 text-lg font-semibold text-red-500">
        Admins cannot access the cart.
      </p>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart | Liyu Mart</title>
        <meta
          name="description"
          content="View and manage the items in your cart. Ready to checkout on Liyu Mart?"
        />
      </Helmet>
      <div className=" pb-20">
        <PageHeader header={headers} />
        <div className=" pt-4 px-4 md:pt-10">
          {cart.length > 0 ? (
            <div>
              {cart.map((item) => (
                <CartItem key={item._id} cart={item} />
              ))}
              <div className="max-w-4xl mx-auto">
                <div className="text-lg font-medium mb-2">
                  Items : {totalQuantity}
                </div>
                <div className="text-xl font-semibold mb-6">
                  Total : ${totalPrice.toLocaleString()}
                </div>

                <button
                  className="bg-blue-primary md:w-1/2 text-white px-6 py-3 rounded-md hover:bg-blue-primary mx-auto"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to checkout
                </button>
              </div>
            </div>
          ) : (
            <p className="text-center">No Products Added To Cart</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
