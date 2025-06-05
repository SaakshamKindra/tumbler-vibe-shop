
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '@/services/productService';
import { Product } from '@/types';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      await ProductService.ensureDataMigrated();
      return ProductService.getAllProducts();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductService.getProductByLegacyId(id),
    enabled: !!id,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      await ProductService.ensureDataMigrated();
      return ProductService.getFeaturedProducts();
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => ProductService.getProductsByCategory(category),
    enabled: !!category,
  });
};
