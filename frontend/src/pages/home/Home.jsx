import React from "react";
import Hero from "./components/Hero";
import TopTrending from "./components/TopTrending";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Liyu Mart – Your Unique Shopping Hub</title>
        <meta
          name="description"
          content="Shop unique, high-quality products with Liyu Mart. Explore categories, discounts, and a smooth experience."
        />
        <meta
          name="keywords"
          content="Liyu Mart, online store, unique products, Ethiopian mart, quality shopping"
        />
        <meta name="author" content="LiyuStore Team" />
      </Helmet>
      <div>
        <Hero />
        <TopTrending />
      </div>
    </>
  );
};

export default Home;
