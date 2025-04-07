
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image Column */}
          <div className={`relative transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-lg z-10 relative">
                <img
                  src="/placeholder.svg"
                  alt="VibeTumbler Manufacturing Process"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-lg bg-brand-teal/20 z-0"></div>
              <div className="absolute -top-6 -left-6 h-32 w-32 rounded-lg bg-brand-blue/10 z-0"></div>
            </div>
          </div>

          {/* Right: Content Column */}
          <div className={`transition-all duration-1000 delay-300 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Crafted with Precision & <span className="text-brand-teal">Passion</span>
            </h2>
            
            <p className="text-gray-600 mb-6">
              At VibeTumbler, we're dedicated to creating premium drinkware that enhances your everyday experiences. Our journey began with a simple idea: to create tumblers that not only keep your beverages at the perfect temperature but also look stunning while doing it.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Premium Materials</h3>
                <p className="text-gray-600 text-sm">
                  We use only the highest quality 18/8 stainless steel and advanced insulation technology.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Eco-Friendly</h3>
                <p className="text-gray-600 text-sm">
                  Our products are designed to reduce single-use plastic waste and last for years.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Rigorous Testing</h3>
                <p className="text-gray-600 text-sm">
                  Every product undergoes extensive quality testing to ensure performance.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Innovative Design</h3>
                <p className="text-gray-600 text-sm">
                  Form meets function with our thoughtfully designed products for everyday use.
                </p>
              </div>
            </div>
            
            <Button asChild className="bg-brand-blue hover:bg-brand-blue/90">
              <Link to="/about" className="inline-flex items-center">
                Learn More About Our Story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
