
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-brand-dark">
              <span className="text-brand-teal">Vibe</span>Tumbler
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium hover:text-brand-teal transition-colors ${
                location.pathname === '/' ? 'text-brand-teal' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`font-medium hover:text-brand-teal transition-colors ${
                location.pathname.includes('/products') ? 'text-brand-teal' : 'text-gray-700'
              }`}
            >
              Shop
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="font-medium text-gray-700 hover:text-brand-teal transition-colors">
                  Collections
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/products?category=tumblers" className="w-full">Tumblers</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/products?category=premium" className="w-full">Premium</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/products?category=kids" className="w-full">Kids</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/products?category=specialty" className="w-full">Specialty</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/customer-service"
              className={`font-medium hover:text-brand-teal transition-colors ${
                location.pathname === '/customer-service' ? 'text-brand-teal' : 'text-gray-700'
              }`}
            >
              Customer Service
            </Link>
          </nav>

          {/* Desktop Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/account">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-50 animate-fade-in">
          <nav className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <Link
              to="/"
              className={`font-medium py-2 hover:text-brand-teal transition-colors ${
                location.pathname === '/' ? 'text-brand-teal' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`font-medium py-2 hover:text-brand-teal transition-colors ${
                location.pathname.includes('/products') ? 'text-brand-teal' : 'text-gray-700'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/products?category=tumblers"
              className="font-medium py-2 text-gray-700 hover:text-brand-teal transition-colors pl-4"
            >
              Tumblers
            </Link>
            <Link
              to="/products?category=premium" 
              className="font-medium py-2 text-gray-700 hover:text-brand-teal transition-colors pl-4"
            >
              Premium
            </Link>
            <Link
              to="/products?category=kids"
              className="font-medium py-2 text-gray-700 hover:text-brand-teal transition-colors pl-4"
            >
              Kids
            </Link>
            <Link
              to="/products?category=specialty"
              className="font-medium py-2 text-gray-700 hover:text-brand-teal transition-colors pl-4"
            >
              Specialty
            </Link>
            <Link
              to="/customer-service"
              className={`font-medium py-2 hover:text-brand-teal transition-colors ${
                location.pathname === '/customer-service' ? 'text-brand-teal' : 'text-gray-700'
              }`}
            >
              Customer Service
            </Link>
            <Link
              to="/account"
              className={`font-medium py-2 hover:text-brand-teal transition-colors ${
                location.pathname === '/account' ? 'text-brand-teal' : 'text-gray-700'
              }`}
            >
              My Account
            </Link>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Search className="h-4 w-4" />
              Search Products
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
