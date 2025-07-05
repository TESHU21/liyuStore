import React ,{useEffect} from 'react'
import { ProductCardHome } from './ProductCardHome';
import { Truck,PackageCheck,Gem } from 'lucide-react';
import {fetchTopProducts} from "../../../store/productSlice"
import { useSelector,useDispatch } from 'react-redux';

const TopTrending = () => {
  const dispatch=useDispatch()
    useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(fetchTopProducts()).unwrap();
     
    };

    fetchData();
  }, [dispatch]);
    const top_products = useSelector((state) => state.products.top_products);
  
  
  
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
      {top_products && top_products?.map((product) => (
        <ProductCardHome
          key={product._id} 
          // Essential for list rendering in React
          product={product}
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