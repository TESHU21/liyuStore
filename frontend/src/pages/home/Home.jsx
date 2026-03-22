import React, { Suspense } from "react";
import Hero from "./components/Hero";
import { Helmet } from "react-helmet-async";
import HeroImage from "../../assets/Hero4.webp";
import HeroMobileImage from "../../assets/Hero.webp";

const TopTrending = React.lazy(() => import("./components/TopTrending"));

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

        <link rel="preload" as="image" href={HeroImage} fetchPriority="high" />
        <link
          rel="preload"
          as="image"
          href={HeroMobileImage}
          fetchPriority="high"
        />
      </Helmet>
      <div>
        <Hero />
        <Suspense fallback={null}>
          <TopTrending />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
