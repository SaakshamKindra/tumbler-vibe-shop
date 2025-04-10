
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const AdCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,
      src: "/lovable-uploads/682b13e5-fc99-44ee-ac08-3cf12b6fd6a0.png",
      alt: "Premium Glass Tumblers"
    },
    {
      id: 2,
      src: "/lovable-uploads/90727131-3103-40cd-91d9-1d1a6076f407.png",
      alt: "Handle Mugs"
    },
    {
      id: 3,
      src: "/lovable-uploads/969ae606-a018-4743-8fb1-9f01eb1cde5c.png",
      alt: "Glass Tumblers"
    },
    {
      id: 4,
      src: "/lovable-uploads/5c2d8766-8f41-45ad-9ac6-d9459dcfc4e3.png",
      alt: "Tumbler Collection"
    }
  ];

  useEffect(() => {
    // Set up automatic slideshow with 3-second intervals
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg p-7 bg-transparent border-4 border-white/70">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className={index === activeIndex ? "block" : "hidden"}>
              <div className="relative h-[350px] md:h-[450px] lg:h-[550px] w-full overflow-hidden rounded-lg flex items-center justify-center">
                <img 
                  src={slide.src} 
                  alt={slide.alt}
                  className="w-[90%] h-[90%] object-contain transform rotate-45 transition-all duration-500" 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Indicator dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeIndex === index ? "bg-brand-terracotta" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default AdCarousel;
