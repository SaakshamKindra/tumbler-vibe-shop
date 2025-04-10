
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight } from 'lucide-react';
import AdCarousel from './AdCarousel';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a slight delay before animation for better effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-20 min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-brand-teal/5 to-white z-0"></div>

      {/* Animated Circles */}
      <div className="absolute right-0 top-1/4 w-64 h-64 rounded-full bg-brand-teal/10 animate-float z-0"></div>
      <div className="absolute left-10 bottom-1/4 w-40 h-40 rounded-full bg-brand-blue/10 animate-float z-0" style={{ animationDelay: '1s' }}></div>
      <div className="absolute right-1/4 bottom-10 w-24 h-24 rounded-full bg-brand-purple/10 animate-float z-0" style={{ animationDelay: '2s' }}></div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column: Text Content */}
          <div 
            className={`lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 transition-all duration-1000 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <span className="inline-block bg-brand-teal/10 text-brand-teal px-4 py-1 rounded-full text-sm font-medium mb-4">
              Premium Drinkware
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-brand-teal to-brand-blue text-gradient">
                Stay Hydrated
              </span>
              <br /> in Style
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-lg">
              Discover our collection of premium tumblers designed to keep your drinks at the perfect temperature while making a statement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-brand-teal hover:bg-brand-teal/90 text-white">
                <Link to="/products">
                  Shop Now <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/products?tag=bestseller">
                  Explore Bestsellers <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-blue flex items-center justify-center text-white font-bold">K</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-teal flex items-center justify-center text-white font-bold">S</div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-purple flex items-center justify-center text-white font-bold">J</div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">1,000+ 5-star reviews</span> from happy customers
              </p>
            </div>
          </div>

          {/* Right Column: Ad Carousel */}
          <div className="lg:w-1/2 relative">
            <div 
              className={`relative transition-all duration-1000 delay-300 ease-out transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
            >
              <AdCarousel />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
