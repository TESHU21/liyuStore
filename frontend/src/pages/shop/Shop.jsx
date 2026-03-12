import React from "react";
import ShopUser from "./user/ShopUser";
import { useSelector } from "react-redux";
import ProductAdmin from "../../pages/shop/admin/ProductAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet-async";
import Loader from "@/components/Loader";

const Shop = () => {
  const user = useSelector((state) => state?.auth.user);

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
