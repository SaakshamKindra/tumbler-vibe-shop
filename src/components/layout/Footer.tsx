
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-beige text-brand-brown">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-bold mb-4">About ASA artisans</h3>
            <p className="text-brand-brown/80 mb-4 text-sm">
              Craft your hydration journey with our premium, customizable tumblers designed to keep your drinks at the perfect temperature all day long.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.instagram.com/asaartisangifts?igsh=MW5sbjV4d21yazlqcA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-brown/70 hover:text-brand-teal transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Shop */}
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-brand-brown/80 text-sm">
              <li>
                <Link to="/products" className="hover:text-brand-teal transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?tag=bestseller" className="hover:text-brand-teal transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/products?tag=new" className="hover:text-brand-teal transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products?category=Tumbler" className="hover:text-brand-teal transition-colors">
                  Tumblers
                </Link>
              </li>
              <li>
                <Link to="/products?category=Bottle" className="hover:text-brand-teal transition-colors">
                  Water Bottles
                </Link>
              </li>
              <li>
                <Link to="/products?tag=Accessories" className="hover:text-brand-teal transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-brand-brown/80 text-sm">
              <li>
                <Link to="/customer-service" className="hover:text-brand-teal transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/customer-service?tab=faq" className="hover:text-brand-teal transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/customer-service?tab=shipping" className="hover:text-brand-teal transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/customer-service?tab=returns" className="hover:text-brand-teal transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-brand-teal transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-brand-teal transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-brand-brown/80 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 flex-shrink-0 text-brand-teal" />
                <span>
                  ASA artisans Headquarters<br />
                  Aligarh<br />
                  India 202001
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0 text-brand-teal" />
                <a 
                  href="mailto:saakshamkindra@gmail.com" 
                  className="hover:text-brand-teal transition-colors"
                >
                  saakshamkindra@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0 text-brand-teal" />
                <a 
                  href="tel:+917417862083" 
                  className="hover:text-brand-teal transition-colors"
                >
                  +91 741 786 2083
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-brown/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-brown/70 text-sm mb-4 md:mb-0">
            &copy; {currentYear} ASA artisans. All rights reserved.
          </p>
          <div className="text-sm text-brand-brown/70">
            <a href="/privacy-policy" className="hover:text-brand-teal transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
