
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const AdCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);

  const slides = [
    {
      id: 1,
      src: "/lovable-uploads/e233bebb-81ab-4eba-910b-f8c81d42b828.png", // 1st uploaded image
      alt: "Premium Tumblers"
    },
    {
      id: 2,
      src: "/lovable-uploads/849c045d-093f-478e-baec-469bf2986971.png", // 2nd uploaded image
      alt: "Snowman Tumbler"
    },
    {
      id: 3,
      src: "/lovable-uploads/9262f8a6-5668-4425-b1da-fa30b2dce858.png", // 3rd uploaded image
      alt: "Leather Tumbler"
    },
    {
      id: 4,
      src: "/lovable-uploads/8413f5ad-7441-4316-965f-375da55c411a.png", // 4th uploaded image
      alt: "Christmas Tumbler"
    }
  ];

  const handleSlideChange = (newIndex) => {
    setAnimatingOut(true);
    
    setTimeout(() => {
      setActiveIndex(newIndex);
      setAnimatingOut(false);
      setAnimatingIn(true);
      
      setTimeout(() => {
        setAnimatingIn(false);
      }, 500); // Animation duration
    }, 500); // Animation duration
  };

  useEffect(() => {
    // Set up automatic slideshow with 3-second intervals
    const interval = setInterval(() => {
      const newIndex = (activeIndex + 1) % slides.length;
      handleSlideChange(newIndex);
    }, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [activeIndex, slides.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg p-7 bg-transparent border-4 border-white/70">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className={index === activeIndex ? "block" : "hidden"}>
              <div className="relative h-[350px] md:h-[450px] lg:h-[550px] w-full overflow-hidden rounded-lg flex items-center justify-center">
                {/* Blurred background - same image but blurred */}
                <div 
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${slide.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(10px)',
                    opacity: 0.9,
                    transform: 'scale(1.1)' // Slightly larger to avoid blur edges
                  }}
                ></div>
                
                {/* Foreground image */}
                <img 
                  src={slide.src} 
                  alt={slide.alt}
                  className={`w-[90%] h-[90%] object-contain transform rotate-[22.5deg] transition-all duration-500 z-10 relative ${
                    animatingOut && index === activeIndex ? 'animate-slide-out-right' : 
                    animatingIn && index === activeIndex ? 'animate-slide-in-right' : ''
                  }`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Indicator dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
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
