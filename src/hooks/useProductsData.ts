
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById, fetchProductsByCategory, fetchProductsByTag } from '@/services/productService';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductsByTag = (tag: string) => {
  return useQuery({
    queryKey: ['products', 'tag', tag],
    queryFn: () => fetchProductsByTag(tag),
    enabled: !!tag,
    staleTime: 5 * 60 * 1000,
  });
};
