import React from "react";
import ShopUser from "./user/ShopUser";
import ProductAdmin from "../../pages/shop/admin/ProductAdmin";
import { Helmet } from "react-helmet-async";
import { useGetCurrentUserProfileQuery } from "@/store/api/authApi";

const Shop = () => {
  const token = localStorage.getItem("token");
  const { data: profileData } = useGetCurrentUserProfileQuery(undefined, {
    skip: !token,
  });
  const user = profileData?.user || profileData;

  return (
    <>
      <Helmet>
        <title>Shop | Liyu Mart</title>
        <meta
          name="description"
          content="Browse a wide variety of quality products at Liyu Mart. Find deals on electronics, fashion, and more."
        />
      </Helmet>
      <div>{user?.isAdmin ? <ProductAdmin /> : <ShopUser />}</div>
    </>
  );
};

export default Shop;
