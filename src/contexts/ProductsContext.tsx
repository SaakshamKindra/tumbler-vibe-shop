
import React, { createContext, useContext, ReactNode } from 'react';
import { ProductsContextType, Product } from '@/types';
import { 
  products, 
  getFeaturedProducts, 
  getNewArrivals, 
  getBestSellers,
  getProductById,
  getProductsByCategory,
  getProductsByTag
} from '@/data/products';

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  const getProduct = (id: number): Product | undefined => {
    return getProductById(id);
  };

  const value: ProductsContextType = {
    products,
    featuredProducts,
    newArrivals,
    bestSellers,
    getProduct,
    getProductsByCategory,
    getProductsByTag
  };

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
