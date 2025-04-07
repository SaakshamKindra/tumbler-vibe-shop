
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="border-b border-gray-700 pb-8 mb-8">
          <div className="max-w-xl mx-auto text-center">
            <h4 className="text-2xl font-bold mb-2">Join our community</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to get special offers, free giveaways, and amazing deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border-gray-700 focus:border-brand-teal text-white"
              />
              <Button className="bg-brand-teal hover:bg-brand-teal/90 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h5 className="text-lg font-bold mb-4">VibeTumbler</h5>
            <p className="text-gray-400 mb-4">
              Creating premium drinkware that keeps your beverages at the perfect temperature while making a statement with our stylish designs.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-brand-teal transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-brand-teal transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-400 hover:text-brand-teal transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h5 className="text-lg font-bold mb-4">Shop</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-brand-teal transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=tumblers" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Tumblers
                </Link>
              </li>
              <li>
                <Link to="/products?category=premium" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Premium Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=kids" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Kids Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=specialty" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Specialty Tumblers
                </Link>
              </li>
              <li>
                <Link to="/products?tag=new" className="text-gray-400 hover:text-brand-teal transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="text-lg font-bold mb-4">Customer Service</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/customer-service" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/customer-service#faq" className="text-gray-400 hover:text-brand-teal transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/customer-service#shipping" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/customer-service#returns" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/customer-service#warranty" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Warranty
                </Link>
              </li>
              <li>
                <Link to="/customer-service#track" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-lg font-bold mb-4">Company</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-brand-teal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-brand-teal transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:info@vibetumbler.com" className="text-gray-400 hover:text-brand-teal transition-colors flex items-center gap-2">
                  <Mail size={16} /> info@vibetumbler.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm pt-6 border-t border-gray-800">
          <p>© {new Date().getFullYear()} VibeTumbler. All rights reserved.</p>
          <p className="mt-1">
            Designed for optimal hydration and style.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
