
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const AdCarousel = () => {
  const [autoplay, setAutoplay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      src: "/lovable-uploads/5c2d8766-8f41-45ad-9ac6-d9459dcfc4e3.png",
      alt: "Tumbler Collection - Glass Tumblers"
    },
    {
      id: 2,
      src: "/lovable-uploads/607a5add-9ba3-43cb-af38-976d4d0e18a4.png",
      alt: "Tumbler Collection - Holiday Glass Mugs"
    },
    {
      id: 3,
      src: "/lovable-uploads/682b13e5-fc99-44ee-ac08-3cf12b6fd6a0.png",
      alt: "Tumbler Collection - Premium Glass Tumblers"
    },
    {
      id: 4,
      src: "/lovable-uploads/b9a90ec9-c2be-4358-9678-7685c06473aa.png",
      alt: "Tumbler Collection - Handle Mugs"
    }
  ];

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay, slides.length]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <Carousel className="w-full"
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
        value={currentSlide}
        onValueChange={setCurrentSlide}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-lg">
                <img 
                  src={slide.src} 
                  alt={slide.alt}
                  className="w-full h-full object-contain bg-white rounded-lg" 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-brand-terracotta" : "bg-gray-300"
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
