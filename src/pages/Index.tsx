import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import AboutSection from '@/components/home/AboutSection';
import { Button } from '@/components/ui/button';
import { Mail, ShieldCheck, TruckIcon, HeartHandshake } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Featured Products */}
        <FeaturedProducts />
        
        {/* Features Highlight */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TruckIcon className="h-6 w-6 text-brand-teal" />
                </div>
                <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
                <p className="text-gray-600 text-sm">
                  On all orders over ₹1,800 within India.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="font-bold text-lg mb-2">1 yr Warranty</h3>
                <p className="text-gray-600 text-sm">
                  Our tumblers are built to last and come with a warranty guarantee.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartHandshake className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="font-bold text-lg mb-2">Satisfaction Guaranteed</h3>
                <p className="text-gray-600 text-sm">
                  Try risk-free with our 30-day money-back guarantee.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-brand-teal" />
                </div>
                <h3 className="font-bold text-lg mb-2">Customer Support</h3>
                <p className="text-gray-600 text-sm">
                  Our team is available 7 days a week to help with any questions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <AboutSection />
        
        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-brand-blue to-brand-teal">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#8B4513]">
              Join Our Community
            </h2>
            <p className="text-[#8B4513] mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive deals, new product announcements, and hydration tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-md flex-grow text-gray-900 outline-none border-2 border-transparent focus:border-white"
              />
              <Button className="bg-white text-brand-teal hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
