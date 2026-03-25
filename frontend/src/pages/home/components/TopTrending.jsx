import React from "react";
import { ProductCardHome } from "./ProductCardHome";
import { Truck, PackageCheck, Gem } from "lucide-react";
import { useGetTopProductsQuery } from "@/store/api/productsApi";
import Loader from "@/components/Loader";

const TopTrending = () => {
  const { data, isLoading, isFetching, isError, error } =
    useGetTopProductsQuery(undefined, {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    });
  const top_products = data || [];
  // placing to center if it is less than 2
  const isFew = top_products.length <= 2;

  if (
    !top_products ||
    !Array.isArray(top_products) ||
    top_products.length === 0
  ) {
    return (
      <div className="text-center py-12 text-gray-500">
        No trending products available
      </div>
    );
  }

  const features = [
    {
      icon: Truck, // Placeholder icon (you'd replace with an actual SVG/component)
      title: "Fast & free shipping",
      description:
        "Every single order ships for free. No minimums, no tiers, no fine print whatsoever.",
    },
    {
      icon: PackageCheck, // Placeholder icon
      title: "Innovative, User-Centric Design",
      description:
        "Our cutting-edge designs prioritize performance, portability, and seamless integration into your lifestyle.",
    },
    {
      icon: Gem, // Placeholder icon
      title: "Durable, High-Quality Materials",
      description:
        "We use premium aluminum, high-resolution OLED displays, and durable batteries for superior quality.",
    },
  ];
  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader />
      </div>
    );
  }

  if (!top_products || top_products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No trending products available
      </div>
    );
  }

  return (
    <div>
      <div className="my-10 md:my-[86px]">
        <h1 className="font-inter font-bold text-center md:text-[42px] leading-6 ">
          Top Trending Products
        </h1>
        <p className=" md:text-center text-justify mt-6  px-6 md:px-[310px]">
          Discover the latest must-have items that are taking the market by
          storm. Stay ahead with our curated collection of trending products
          designed to elevate your lifestyle.
        </p>
      </div>
      {/* Top Trending */}

      <div
        className={
          isFew
            ? "flex w-full items-center justify-center gap-6 px-10 md:px-[38px]"
            : "grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-[38px]"
        }
      >
        {/* Adjust padding and gap as needed */}
        {top_products &&
          top_products?.map((product) => (
            <div
              key={product._id}
              className="w-[240px] md:w-[300px] lg:w-[340px]"
            >
              <ProductCardHome product={product} />
            </div>
          ))}
      </div>

      <section className=" bg-[#01589A] text-white mt-6 md:mt-[86px] py-6 md:py-[42px] px-6 md:px-[40px]">
        {/* Main Heading */}
        <h2 className=" md:text-[42px]  md:w-[958px] mb-12 md:mb-16 leading-8">
          We're tackling the biggest challenges in laptops and electronic
          products.
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 ">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-4">
              {/* Icon */}
              <div className="text-4xl flex  mb-4">
                {" "}
                {/* Adjust text-4xl for icon size */}
                {/* If using Lucide React or similar: <feature.Icon className="w-10 h-10" /> */}
                <feature.icon className="w-[55px] h-[55px]" />
              </div>
              {/* Title */}
              <h3 className="text-xl  tefont-semibold mb-2">{feature.title}</h3>
              {/* Description */}
              <p className="text-gray-300 text-base text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopTrending;
