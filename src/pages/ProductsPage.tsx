
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters';
import { useProducts } from '@/contexts/ProductsContext';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { Product } from '@/types';

const ProductsPage = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState(true);
  const [filterMobileOpen, setFilterMobileOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Parse URL query parameters
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const tagParam = searchParams.get('tag');
    
    // Apply initial filters from URL parameters
    if (categoryParam) {
      const filtered = products.filter(
        product => product.category.toLowerCase() === categoryParam.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else if (tagParam) {
      const filtered = products.filter(
        product => product.tags.some(tag => tag.toLowerCase() === tagParam.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    
    // Simulate API request time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location.search, products]);
  
  // Extract all categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  // Extract all colors from products
  const availableColors = products.reduce<{ name: string; hex: string }[]>((acc, product) => {
    product.colors.forEach(color => {
      if (!acc.some(c => c.name === color.name)) {
        acc.push({ name: color.name, hex: color.hex });
      }
    });
    return acc;
  }, []);
  
  // Extract common features from products
  const features = [
    "Premium",
    "Tumblers",
    "Kids",
    "Glass Tumblers",
    "Double-wall insulation",
    "Stainless steel",
    "Sweat-free exterior",
    "Dishwasher safe",
    "BPA-free",
    "Leak-proof lid"
  ];
  
  const handleFilterChange = (filters: any) => {
    let filtered = [...products];
    
    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );
    
    // Filter by features (for demo, we're just pretending these match)
    if (filters.features.length > 0) {
      // In a real app, you would check product.features against the selected features
      filtered = filtered.filter(product => 
        filters.features.some((feature: string) => {
          // Special handling for product categories
          if (feature === "Premium" && product.tags.includes("premium")) {
            return true;
          }
          if (feature === "Tumblers" && product.category.includes("Tumbler")) {
            return true;
          }
          if (feature === "Kids" && product.tags.includes("kids")) {
            return true;
          }
          if (feature === "Glass Tumblers" && product.tags.includes("glass")) {
            return true;
          }
          
          // Regular feature filtering
          return product.features.some(f => f.toLowerCase().includes(feature.toLowerCase()));
        })
      );
    }
    
    setFilteredProducts(filtered);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Banner/Header for the collection */}
        <div className="bg-brand-beige py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-brand-brown">
              Our Collection
            </h1>
            <p className="text-brand-brown opacity-80">
              Discover our range of premium tumblers designed to keep your drinks at the perfect temperature.
            </p>
          </div>
        </div>
        
        {/* Products Container */}
        <div className="container mx-auto px-4 py-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Button 
              variant="outline" 
              onClick={() => setFilterMobileOpen(true)}
              className="w-full flex items-center justify-center gap-2 border-brand-terracotta text-brand-brown"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter Products
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <ProductFilters 
                onFilterChange={handleFilterChange}
                categories={categories}
                availableColors={availableColors}
                features={features}
              />
            </div>
            
            {/* Filters - Mobile Drawer */}
            {filterMobileOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
                <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-brand-cream shadow-lg overflow-auto animate-fade-in">
                  <ProductFilters 
                    onFilterChange={handleFilterChange}
                    categories={categories}
                    availableColors={availableColors}
                    features={features}
                    isMobile={true}
                    onCloseMobile={() => setFilterMobileOpen(false)}
                  />
                </div>
              </div>
            )}
            
            {/* Products Grid */}
            <div className="flex-grow">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-brand-brown opacity-80">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-brand-brown opacity-80 hidden sm:inline">Sort by:</span>
                  <select className="border rounded py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-terracotta text-brand-brown border-brand-terracotta bg-brand-cream">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                    <option>Best Selling</option>
                  </select>
                </div>
              </div>
              
              <ProductGrid products={filteredProducts} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
