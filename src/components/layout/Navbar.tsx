import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Moon, Sun } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-[#2A1B14]/90 backdrop-blur-md shadow-sm py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-brand-brown font-display">
              <span className="text-brand-terracotta">ASA</span> artisans
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium hover:text-brand-terracotta transition-colors ${
                location.pathname === '/' ? 'text-brand-terracotta' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`font-medium hover:text-brand-terracotta transition-colors ${
                location.pathname.includes('/products') ? 'text-brand-terracotta' : 'text-gray-700'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/customer-service"
              className={`font-medium hover:text-brand-terracotta transition-colors ${
                location.pathname === '/customer-service' ? 'text-brand-terracotta' : 'text-gray-700'
              }`}
            >
              Customer Service
            </Link>
          </nav>

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
                  <span className="absolute -top-2 -right-2 bg-brand-terracotta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-[#F5E0C3]" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-3 md:hidden">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-terracotta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 z-50 animate-fade-in">
          <nav className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <Link
              to="/"
              className={`font-medium py-2 hover:text-brand-terracotta transition-colors ${
                location.pathname === '/' ? 'text-brand-terracotta' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`font-medium py-2 hover:text-brand-terracotta transition-colors ${
                location.pathname.includes('/products') ? 'text-brand-terracotta' : 'text-gray-700'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/customer-service"
              className={`font-medium py-2 hover:text-brand-terracotta transition-colors ${
                location.pathname === '/customer-service' ? 'text-brand-terracotta' : 'text-gray-700'
              }`}
            >
              Customer Service
            </Link>
            <Link
              to="/account"
              className={`font-medium py-2 hover:text-brand-terracotta transition-colors ${
                location.pathname === '/account' ? 'text-brand-terracotta' : 'text-gray-700'
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
