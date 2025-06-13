import React from 'react'
import { ProductCard } from './ProductCard';
import { Truck,PackageCheck,Gem } from 'lucide-react';

const TopTrending = () => {
    const products = [
    {
      id: 1,
      title: "Macbook",
      description: "Up to 50% off laptop",
      imageUrl: "/images/macbook.png", // Adjust path to your image
      imageAlt: "Macbook",
      linkHref: "#macbook",
      backgroundColorClass: "", // No specific background for Macbook
    },
    {
      id: 2,
      title: "Iphones",
      description: "Free shipping",
      imageUrl: "/images/iphones.png", // Adjust path to your image
      imageAlt: "Iphones",
      linkHref: "#iphones",
      backgroundColorClass: "bg-blue-50", // Subtle blue background
    },
    {
      id: 3,
      title: "Digital Lens",
      description: "Up to 40% off Camera",
      imageUrl: "/images/digital-lens.png", // Adjust path to your image
      imageAlt: "Digital Lens",
      linkHref: "#digital-lens",
      backgroundColorClass: "", // No specific background for Digital Lens
    },
    {
      id: 4,
      title: "Digital Lens",
      description: "Up to 40% off Camera",
      imageUrl: "/images/digital-lens.png", // Adjust path to your image
      imageAlt: "Digital Lens",
      linkHref: "#digital-lens",
      backgroundColorClass: "", // No specific background for Digital Lens
    },
  ];
  const features = [
    {
      icon: Truck, // Placeholder icon (you'd replace with an actual SVG/component)
      title: 'Fast & free shipping',
      description: 'Every single order ships for free. No minimums, no tiers, no fine print whatsoever.',
    },
    {
      icon: PackageCheck, // Placeholder icon
      title: 'Innovative, User-Centric Design',
      description: 'Our cutting-edge designs prioritize performance, portability, and seamless integration into your lifestyle.',
    },
    {
      icon: Gem, // Placeholder icon
      title: 'Durable, High-Quality Materials',
      description: 'We use premium aluminum, high-resolution OLED displays, and durable batteries for superior quality.',
    },
  ];

  return (
    <div>
        <div className='my-[86px]'>
            <h1 className='font-inter font-bold text-center text-[42px] leading-6 '>Top Trending Products</h1>
            <p className=' text-center mt-6 md:px-[310px]'>Discover the latest must-have items that are taking the market by storm. Stay ahead with our curated collection of trending products designed to elevate your lifestyle.</p>
        </div>
        {/* Top Trending */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:px-[38px]"> {/* Adjust padding and gap as needed */}
      {products.map((product) => (
        <ProductCard
          key={product.id} // Essential for list rendering in React
          title={product.title}
          description={product.description}
          imageUrl={product.imageUrl}
          imageAlt={product.imageAlt}
          linkHref={product.linkHref}
          backgroundColorClass={product.backgroundColorClass}
        />
      ))}
    </div>

        <section className=" bg-[#01589A] text-white mt-[86px] md:py-[42px] md:px-[40px]">
      {/* Main Heading */}
      <h2 className=" md:text-[42px]  md:w-[958px] mb-12 md:mb-16 leading-12">
        We're tackling the biggest challenges in laptops and electronic products.
      </h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            {/* Icon */}
            <div className="text-4xl flex  mb-4"> {/* Adjust text-4xl for icon size */}
              {/* If using Lucide React or similar: <feature.Icon className="w-10 h-10" /> */}
              <feature.icon className='w-[55px] h-[55px]' />
            </div>
            {/* Title */}
            <h3 className="text-xl  tefont-semibold mb-2">{feature.title}</h3>
            {/* Description */}
            <p className="text-gray-300 text-base text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
    </div>
  )
}

export default TopTrending