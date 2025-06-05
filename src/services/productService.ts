
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

export class ProductService {
  // Fetch all products with their related data
  static async getAllProducts(): Promise<Product[]> {
    const { data: productsData, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name),
        product_specifications(*),
        product_colors(*),
        product_images(*),
        product_features(*),
        product_tags(tags(name))
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    if (!productsData) return [];

    // Transform database products to match frontend Product interface
    return productsData.map(this.transformDatabaseProduct);
  }

  // Get product by legacy ID (for backward compatibility)
  static async getProductByLegacyId(legacyId: number): Promise<Product | null> {
    const { data: mapping } = await supabase
      .from('product_id_map')
      .select('uuid_id')
      .eq('legacy_id', legacyId)
      .single();

    if (!mapping) return null;

    return this.getProductByUuid(mapping.uuid_id);
  }

  // Get product by UUID
  static async getProductByUuid(uuid: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name),
        product_specifications(*),
        product_colors(*),
        product_images(*),
        product_features(*),
        product_tags(tags(name))
      `)
      .eq('id', uuid)
      .single();

    if (error || !data) return null;

    return this.transformDatabaseProduct(data);
  }

  // Get featured products
  static async getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories(name),
        product_specifications(*),
        product_colors(*),
        product_images(*),
        product_features(*),
        product_tags(tags(name))
      `)
      .or('best_seller.eq.true,is_new.eq.true')
      .limit(4);

    if (error) throw error;

    return data?.map(this.transformDatabaseProduct) || [];
  }

  // Get products by category
  static async getProductsByCategory(categoryName: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories!inner(name),
        product_specifications(*),
        product_colors(*),
        product_images(*),
        product_features(*),
        product_tags(tags(name))
      `)
      .eq('categories.name', categoryName);

    if (error) throw error;

    return data?.map(this.transformDatabaseProduct) || [];
  }

  // Transform database product to frontend Product interface
  private static transformDatabaseProduct(dbProduct: any): Product {
    // Get legacy ID from mapping or generate one
    const legacyId = ProductService.getLegacyIdFromUuid(dbProduct.id);

    return {
      id: legacyId,
      name: dbProduct.name || '',
      price: dbProduct.price || 0,
      description: dbProduct.description || '',
      features: dbProduct.product_features?.map((f: any) => f.feature) || [],
      specifications: {
        capacity: dbProduct.product_specifications?.[0]?.capacity || '',
        material: dbProduct.product_specifications?.[0]?.material || '',
        dimensions: dbProduct.product_specifications?.[0]?.dimensions || '',
        weight: dbProduct.product_specifications?.[0]?.weight || '',
        insulation: dbProduct.product_specifications?.[0]?.insulation || '',
        lidType: dbProduct.product_specifications?.[0]?.lid_type || ''
      },
      colors: dbProduct.product_colors?.map((c: any) => ({
        name: c.name,
        hex: c.hex,
        available: c.available
      })) || [],
      images: dbProduct.product_images?.map((img: any) => img.url) || [],
      category: dbProduct.categories?.name || '',
      tags: dbProduct.product_tags?.map((pt: any) => pt.tags?.name).filter(Boolean) || [],
      isNew: dbProduct.is_new || false,
      bestSeller: dbProduct.best_seller || false,
      rating: dbProduct.rating || 4.5,
      inventory: dbProduct.inventory || 0
    };
  }

  // Helper to maintain legacy ID compatibility
  private static getLegacyIdFromUuid(uuid: string): number {
    // This is a simple hash function to create consistent legacy IDs
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
      const char = uuid.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % 10000 + 1; // Ensure positive number between 1-10000
  }

  // Run migration if needed
  static async ensureDataMigrated(): Promise<void> {
    const { data: hasData } = await supabase
      .from('products')
      .select('id')
      .limit(1)
      .single();

    if (!hasData) {
      const { DataMigrationService } = await import('./dataMigrationService');
      await DataMigrationService.migrateAllData();
    }
  }
}
