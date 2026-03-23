import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "@/layout/Layout";
import Home from "@/pages/home/Home";

// Optimized lazy loading with prefetching
const Shop = React.lazy(() => import("@/pages/shop/Shop"));
const ShopDetail = React.lazy(
  () => import("@/pages/shop/user/detail/ShopDetail"),
);
const Cart = React.lazy(() => import("@/pages/cart/Cart"));
const Favourite = React.lazy(() => import("@/pages/favourite/Favourite"));
const Login = React.lazy(() => import("@/pages/auth/login/Login"));
const Checkout = React.lazy(() => import("@/pages/checkout/Checkout"));
const CreateProduct = React.lazy(
  () => import("@/pages/shop/admin/ProductFormPage"),
);
const Orders = React.lazy(() => import("@/pages/orders/Orders"));
const Profile = React.lazy(() => import("@/pages/profile/Profile"));
const CategoryManager = React.lazy(
  () => import("@/pages/catagory/CategoryManager"),
);
const OrdersDetail = React.lazy(
  () => import("@/pages/orders/components/OrdersDetail"),
);
const UpdateUserProfile = React.lazy(
  () => import("@/pages/profile/user/UpdateUserProfile"),
);
const User = React.lazy(() => import("@/pages/users/User"));

// Optimized Loader Components
const FullPageLoader = () => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-l-blue-400 rounded-full animate-spin animation-delay-150"></div>
    </div>
    <div className="mt-4 text-center">
      <p className="text-gray-600 font-medium">Loading...</p>
      <p className="text-gray-400 text-sm">Preparing your experience</p>
    </div>
  </div>
);

const PageLoader = () => (
  <div className="flex flex-col justify-center items-center h-[60vh]">
    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    <p className="mt-3 text-gray-600 text-sm">Loading page...</p>
  </div>
);

const ContentLoader = () => (
  <div className="flex justify-center items-center py-8">
    <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route
          path="shop"
          element={
            <Suspense fallback={<PageLoader />}>
              <Shop />
            </Suspense>
          }
        />

        <Route
          path="shop/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <ShopDetail />
            </Suspense>
          }
        />

        <Route
          path="cart"
          element={
            <Suspense fallback={<PageLoader />}>
              <Cart />
            </Suspense>
          }
        />

        <Route
          path="favourite"
          element={
            <Suspense fallback={<PageLoader />}>
              <Favourite />
            </Suspense>
          }
        />

        <Route
          path="checkout"
          element={
            <Suspense fallback={<PageLoader />}>
              <Checkout />
            </Suspense>
          }
        />

        <Route
          path="product"
          element={
            <Suspense fallback={<PageLoader />}>
              <CreateProduct />
            </Suspense>
          }
        />

        <Route
          path="profile"
          element={
            <Suspense fallback={<PageLoader />}>
              <Profile />
            </Suspense>
          }
        />

        <Route
          path="category"
          element={
            <Suspense fallback={<PageLoader />}>
              <CategoryManager />
            </Suspense>
          }
        />

        <Route
          path="orders"
          element={
            <Suspense fallback={<PageLoader />}>
              <Orders />
            </Suspense>
          }
        />

        <Route
          path="orders/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <OrdersDetail />
            </Suspense>
          }
        />

        <Route
          path="update-profile"
          element={
            <Suspense fallback={<PageLoader />}>
              <UpdateUserProfile />
            </Suspense>
          }
        />

        <Route
          path="user"
          element={
            <Suspense fallback={<PageLoader />}>
              <User />
            </Suspense>
          }
        />
      </Route>

      <Route
        path="login"
        element={
          <Suspense fallback={<FullPageLoader />}>
            <Login />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
