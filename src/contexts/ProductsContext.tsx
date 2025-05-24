
import React, { createContext, useContext, ReactNode } from 'react';
import { ProductsContextType, Product } from '@/types';
import { useProducts as useProductsQuery } from '@/hooks/useProductsData';

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const { data: products = [], isLoading, error } = useProductsQuery();

  // Helper functions to filter products
  const getFeaturedProducts = (): Product[] => {
    return products.filter(product => product.bestSeller || product.isNew).slice(0, 4);
  };

  const getNewArrivals = (): Product[] => {
    return products.filter(product => product.isNew);
  };

  const getBestSellers = (): Product[] => {
    return products.filter(product => product.bestSeller);
  };

  const getProduct = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  };

  const getProductsByTag = (tag: string): Product[] => {
    return products.filter(product => product.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  };

  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  const value: ProductsContextType = {
    products,
    featuredProducts,
    newArrivals,
    bestSellers,
    getProduct,
    getProductsByCategory,
    getProductsByTag
  };

  // Log loading and error states for debugging
  if (isLoading) {
    console.log('Products loading...');
  }
  
  if (error) {
    console.error('Error loading products:', error);
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  
  return context;
};
