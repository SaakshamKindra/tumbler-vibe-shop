
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold text-brand-brown font-display">
                <span className="text-brand-terracotta">ASA</span> artisans
              </h2>
            </Link>
            <p className="text-gray-600 mb-4">
              Elevate your hydration experience with our premium collection of artisanal tumblers, designed for both style and functionality.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/asaartisangifts?igsh=MW5sbjV4d21yazlqcA=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-brand-terracotta transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-brand-brown">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Premium" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                  Premium Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=Tumblers" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                  Tumblers
                </Link>
              </li>
              <li>
                <Link to="/products?category=Kids" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                  Kids Collection
                </Link>
              </li>
              <li>
                <Link to="/products?category=Glass%20Tumblers" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                  Glass Tumblers
                </Link>
              </li>
              <li>
                <Link to="/feedbacks" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                  Feedbacks
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-brand-brown">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/customer-service#shipping" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/customer-service#returns" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/customer-service#faq" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/customer-service#contact" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/feedbacks" className="text-gray-600 hover:text-brand-terracotta transition-colors">
                  Submit Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-brand-brown">Contact Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Customer Service: <a href="tel:7417862083" className="hover:text-brand-terracotta">ASA Artisans (7417862083)</a></li>
              <li>Email: <a href="mailto:saakshamkindra@gmail.com" className="hover:text-brand-terracotta">saakshamkindra@gmail.com</a></li>
              <li>Hours: Monday - Friday, 9AM - 5PM IST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ASA artisans. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:text-brand-terracotta transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-brand-terracotta transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
