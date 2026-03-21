import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// 🔥 Lazy imports
const Layout = React.lazy(() => import("@/layout/Layout"));
const Home = React.lazy(() => import("@/pages/home/Home"));
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
const PerformanceDashboard = React.lazy(
  () => import("@/components/PerformanceDashboard"),
);

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:id" element={<ShopDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="favourite" element={<Favourite />} />
          <Route path="detail" element={<ShopDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="product" element={<CreateProduct />} />
          <Route path="profile" element={<Profile />} />
          <Route path="category" element={<CategoryManager />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrdersDetail />} />
          <Route path="update-profile" element={<UpdateUserProfile />} />

          {/* ✅ fixed path */}
          <Route path="user" element={<User />} />

          <Route path="performance" element={<PerformanceDashboard />} />
        </Route>

        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
