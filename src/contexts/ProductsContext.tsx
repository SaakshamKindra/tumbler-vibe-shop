
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { ProductsContextType, Product } from '@/types';
import { products } from '@/data/products';
import { ProductService } from '@/services/productService';
import staticProducts from '@/data/staticProducts';

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        await ProductService.ensureDataMigrated();
        const allProducts = await ProductService.getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to static data if database fails
        setProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const featuredProducts = products.filter(product => product.bestSeller || product.isNew).slice(0, 4);
  const newArrivals = products.filter(product => product.isNew);
  const bestSellers = products.filter(product => product.bestSeller);

  const getProduct = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  };

  const getProductsByTag = (tag: string): Product[] => {
    return products.filter(product => 
      product.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  };

  const value = {
    products,
    featuredProducts,
    newArrivals,
    bestSellers,
    getProduct,
    getProductsByCategory,
    getProductsByTag,
    loading
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  
  return context;
};
