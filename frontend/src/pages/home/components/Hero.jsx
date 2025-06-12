import React from 'react'
import HeroImage from "../../../assets/Hero.jpg"
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

const Hero = () => {
  return (
    <div
      className='
        relative w-full h-[727px] 
        bg-cover bg-center 
        flex items-center                 // Vertically center content
        text-white px-6 md:px-16 
        overflow-hidden
      '
      style={{
        backgroundImage: `url(${HeroImage})`
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 opacity-40 z-0"
        style={{
          background: 'linear-gradient(to right, #120606, #120606)',
        }}
      ></div>

      {/* Text Content */}
      <div className="z-10 flex flex-col items-start max-w-[600px]">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
          Next-Gen <br />
          Mobility
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          Power, performance, and style—experience the future of smartphones today
        </p>
        <Button
          className="h-[48px] px-6 gap-2 text-base md:text-lg font-semibold
                     bg-white text-purple-800 hover:bg-gray-100
                     transition-colors duration-200"
        >
          Shop Now <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

export default Hero
