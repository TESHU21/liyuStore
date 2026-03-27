import React from "react";
import ShopUser from "./user/ShopUser";
import ProductAdmin from "../../pages/shop/admin/ProductAdmin";
import { Helmet } from "react-helmet-async";

const Shop = () => {
  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;
  console.log("User", userObj);

  return (
    <>
      <Helmet>
        <title>Shop | Liyu Mart</title>
        <meta
          name="description"
          content="Browse a wide variety of quality products at Liyu Mart. Find deals on electronics, fashion, and more."
        />
      </Helmet>
      <div>{userObj?.isAdmin ? <ProductAdmin /> : <ShopUser />}</div>
    </>
  );
};

export default Shop;
