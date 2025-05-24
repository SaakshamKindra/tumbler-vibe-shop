
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

export interface DatabaseProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  is_new: boolean;
  best_seller: boolean;
  rating: number;
  inventory: number;
  categories: { name: string } | null;
  product_specifications: {
    capacity: string | null;
    material: string | null;
    dimensions: string | null;
    weight: string | null;
    insulation: string | null;
    lid_type: string | null;
  }[];
  product_colors: {
    name: string;
    hex: string;
    available: boolean;
  }[];
  product_images: {
    url: string;
    display_order: number;
  }[];
  product_features: {
    feature: string;
  }[];
  product_tags: {
    tags: { name: string };
  }[];
  product_id_map: {
    legacy_id: number;
  }[];
}

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      description,
      is_new,
      best_seller,
      rating,
      inventory,
      categories (name),
      product_specifications (
        capacity,
        material,
        dimensions,
        weight,
        insulation,
        lid_type
      ),
      product_colors (
        name,
        hex,
        available
      ),
      product_images (
        url,
        display_order
      ),
      product_features (
        feature
      ),
      product_tags (
        tags (name)
      ),
      product_id_map (
        legacy_id
      )
    `)
    .order('name');

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return transformDatabaseProducts(data || []);
};

export const fetchProductById = async (id: number): Promise<Product | null> => {
  // First get the UUID from the legacy ID
  const { data: idMap, error: idError } = await supabase
    .from('product_id_map')
    .select('uuid_id')
    .eq('legacy_id', id)
    .single();

  if (idError || !idMap) {
    console.error('Error fetching product ID mapping:', idError);
    return null;
  }

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      description,
      is_new,
      best_seller,
      rating,
      inventory,
      categories (name),
      product_specifications (
        capacity,
        material,
        dimensions,
        weight,
        insulation,
        lid_type
      ),
      product_colors (
        name,
        hex,
        available
      ),
      product_images (
        url,
        display_order
      ),
      product_features (
        feature
      ),
      product_tags (
        tags (name)
      ),
      product_id_map (
        legacy_id
      )
    `)
    .eq('id', idMap.uuid_id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  const transformed = transformDatabaseProducts([data]);
  return transformed[0] || null;
};

const transformDatabaseProducts = (dbProducts: DatabaseProduct[]): Product[] => {
  return dbProducts.map(dbProduct => {
    // Get the first specification (should only be one per product)
    const spec = dbProduct.product_specifications?.[0] || {
      capacity: null,
      material: null,
      dimensions: null,
      weight: null,
      insulation: null,
      lid_type: null
    };
    
    // Sort images by display order
    const sortedImages = (dbProduct.product_images || [])
      .sort((a, b) => a.display_order - b.display_order)
      .map(img => img.url);
    
    // Extract tags
    const tags = (dbProduct.product_tags || []).map(pt => pt.tags.name);
    
    // Extract features
    const features = (dbProduct.product_features || []).map(pf => pf.feature);
    
    // Get legacy ID
    const legacyId = dbProduct.product_id_map?.[0]?.legacy_id || 0;

    // Ensure colors array exists
    const colors = dbProduct.product_colors || [];

    return {
      id: legacyId,
      name: dbProduct.name,
      price: dbProduct.price / 100, // Convert from cents to dollars
      description: dbProduct.description,
      features,
      specifications: {
        capacity: spec.capacity || '',
        material: spec.material || '',
        dimensions: spec.dimensions || '',
        weight: spec.weight || '',
        insulation: spec.insulation || '',
        lidType: spec.lid_type || ''
      },
      colors,
      images: sortedImages,
      category: dbProduct.categories?.name || '',
      tags,
      isNew: dbProduct.is_new,
      bestSeller: dbProduct.best_seller,
      rating: dbProduct.rating,
      inventory: dbProduct.inventory
    };
  });
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      description,
      is_new,
      best_seller,
      rating,
      inventory,
      categories!inner (name),
      product_specifications (
        capacity,
        material,
        dimensions,
        weight,
        insulation,
        lid_type
      ),
      product_colors (
        name,
        hex,
        available
      ),
      product_images (
        url,
        display_order
      ),
      product_features (
        feature
      ),
      product_tags (
        tags (name)
      ),
      product_id_map (
        legacy_id
      )
    `)
    .eq('categories.name', category);

  if (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }

  return transformDatabaseProducts(data || []);
};

export const fetchProductsByTag = async (tag: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      price,
      description,
      is_new,
      best_seller,
      rating,
      inventory,
      categories (name),
      product_specifications (
        capacity,
        material,
        dimensions,
        weight,
        insulation,
        lid_type
      ),
      product_colors (
        name,
        hex,
        available
      ),
      product_images (
        url,
        display_order
      ),
      product_features (
        feature
      ),
      product_tags!inner (
        tags!inner (name)
      ),
      product_id_map (
        legacy_id
      )
    `)
    .eq('product_tags.tags.name', tag);

  if (error) {
    console.error('Error fetching products by tag:', error);
    throw error;
  }

  return transformDatabaseProducts(data || []);
};
