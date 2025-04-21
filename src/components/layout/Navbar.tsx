import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/contexts/ProductsContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { products } = useProducts();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    setIsSearchOpen(false);
    setSearchValue('');
  }, [location]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setSearchValue('');
      }
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const searchWrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchValue('');
      }
    };
    if (isSearchOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  const filteredProducts = searchValue
    ? products.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()))
    : [];

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
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
            >
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
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              Search Products
            </Button>
          </nav>
        </div>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 flex justify-center items-start pt-32">
          <div
            ref={searchWrapperRef}
            className="w-full max-w-xl mx-3 relative animate-fade-in"
          >
            <div className="flex items-center bg-white rounded-full border border-brand-terracotta shadow-xl focus-within:ring-2 focus-within:ring-brand-terracotta px-4 py-2">
              <Search className="h-6 w-6 text-brand-terracotta mr-3" />
              <input
                ref={searchInputRef}
                type="text"
                className="flex-1 bg-transparent border-none text-brand-brown text-lg outline-none placeholder:text-brand-brown/50"
                placeholder="Search for products and queries..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && filteredProducts.length) {
                    navigate(`/product/${filteredProducts[0].id}`);
                    setIsSearchOpen(false);
                    setSearchValue('');
                  }
                }}
              />
              <button
                className="ml-2 p-2 rounded-full hover:bg-brand-beige transition-colors"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchValue('');
                }}
                aria-label="Close search"
                type="button"
              >
                <X className="h-5 w-5 text-brand-brown" />
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-lg mt-3">
              {searchValue ?
                filteredProducts.length > 0 ? (
                  <ul>
                    {filteredProducts.slice(0, 8).map((product) => (
                      <li
                        key={product.id}
                        className="py-2 px-4 rounded hover:bg-brand-beige cursor-pointer flex items-center"
                        onClick={() => {
                          navigate(`/product/${product.id}`);
                          setIsSearchOpen(false);
                          setSearchValue('');
                        }}
                      >
                        <span className="text-brand-brown font-medium">{product.name}</span>
                        <span className="ml-2 text-xs text-brand-terracotta">{product.category}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-brand-brown py-4 text-center opacity-60">
                    No products found.
                  </div>
                )
                : (
                  <div className="text-sm text-brand-brown py-4 text-center opacity-50">Type to search for products...</div>
                )
              }
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
