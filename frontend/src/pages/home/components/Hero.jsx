import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles } from "lucide-react";
import HeroImage from "../../../assets/Hero4.webp"; // Or whichever hero image you prefer
import Hero1 from "../../../assets/Hero.webp";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full  h-[650px]  md:h-[727px] overflow-hidden bg-gray-900  ">
      {/* Hero Image */}
      <img
        src={HeroImage}
        alt="Liyu Mart Hero"
        className=" absolute inset-0 w-full h-full object-cover opacity-30 z-0  hidden md:flex  "
        loading="eager"
        decoding="async"
        width={1920}
        height={727}
      />
      {/* Hero Image  Mobile*/}
      <img
        src={Hero1}
        alt="Liyu Mart Hero"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0  md:hidden  "
        loading="eager"
        decoding="async"
        width={750}
        height={650}
      />

      {/* Overlay Text */}
      <div className="relative z-10 max-w-3xl text-white px-10 mt-20  ">
        <div className="mb-4">
          <Sparkles className="text-yellow-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Liyu Mart <br />
          <span className="text-white">Shop Unique</span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-gray-200 ">
          Discover next-gen products, curated for your lifestyle.
        </p>

        <Button
          className="mt-6 h-12 px-6 gap-2 text-lg font-semibold bg-white text-purple-800 hover:bg-gray-100 transition"
          onClick={() => navigate("/shop")}
        >
          Shop Now <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      {/* Info section */}
      <div className=" absolute bottom-7 flex flex-col   md:flex-row justify-center gap-6 md:gap-16 mt-14 w-full  px-4">
        <div className="text-white text-center md:text-left">
          <p className="text-2xl font-bold font-lato">1000+</p>
          <p className="text-sm">Happy Customers</p>
        </div>
        <div className="text-white text-center md:text-left">
          <p className="text-2xl font-bold font-lato">500+</p>
          <p className="text-sm">Unique Products</p>
        </div>
        <div className="text-white text-center md:text-left">
          <p className="text-2xl font-bold font-lato flex justify-center  gap-4 ">
            4.9{" "}
            <span className="text-yellow-400">
              <Sparkles />
            </span>
          </p>
          <p className="text-sm">Customer Rating</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
