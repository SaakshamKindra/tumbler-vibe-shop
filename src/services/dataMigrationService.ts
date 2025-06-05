
import { supabase } from '@/integrations/supabase/client';
import { products } from '@/data/products';

export class DataMigrationService {
  static async migrateAllData() {
    console.log('Starting data migration...');
    
    try {
      // First, get or create categories
      const categoryMap = await this.migrateCategories();
      
      // Then, get or create tags
      const tagMap = await this.migrateTags();
      
      // Finally, migrate products with all their related data
      await this.migrateProducts(categoryMap, tagMap);
      
      console.log('Data migration completed successfully!');
    } catch (error) {
      console.error('Data migration failed:', error);
      throw error;
    }
  }

  private static async migrateCategories() {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    const categoryMap: Record<string, string> = {};
    
    for (const categoryName of uniqueCategories) {
      const { data: existingCategory } = await supabase
        .from('categories')
        .select('id, name')
        .eq('name', categoryName)
        .single();
      
      if (existingCategory) {
        categoryMap[categoryName] = existingCategory.id;
      } else {
        const { data: newCategory, error } = await supabase
          .from('categories')
          .insert({
            name: categoryName
          })
          .select('id')
          .single();
        
        if (error) throw error;
        categoryMap[categoryName] = newCategory.id;
      }
    }
    
    return categoryMap;
  }

  private static async migrateTags() {
    const allTags = [...new Set(products.flatMap(p => p.tags))];
    const tagMap: Record<string, string> = {};
    
    for (const tagName of allTags) {
      const { data: existingTag } = await supabase
        .from('tags')
        .select('id, name')
        .eq('name', tagName)
        .single();
      
      if (existingTag) {
        tagMap[tagName] = existingTag.id;
      } else {
        const { data: newTag, error } = await supabase
          .from('tags')
          .insert({
            name: tagName
          })
          .select('id')
          .single();
        
        if (error) throw error;
        tagMap[tagName] = newTag.id;
      }
    }
    
    return tagMap;
  }

  private static async migrateProducts(categoryMap: Record<string, string>, tagMap: Record<string, string>) {
    for (const product of products) {
      try {
        // Check if product already exists using legacy ID mapping
        const { data: existingMapping } = await supabase
          .from('product_id_map')
          .select('uuid_id')
          .eq('legacy_id', product.id)
          .single();
        
        if (existingMapping) {
          console.log(`Product ${product.name} already migrated, skipping...`);
          continue;
        }

        // Create main product record
        const { data: newProduct, error: productError } = await supabase
          .from('products')
          .insert({
            name: product.name,
            description: product.description,
            price: product.price,
            category_id: categoryMap[product.category],
            is_new: product.isNew,
            best_seller: product.bestSeller,
            rating: product.rating,
            inventory: product.inventory
          })
          .select('id')
          .single();
        
        if (productError) throw productError;
        
        const productId = newProduct.id;
        
        // Create legacy ID mapping
        await supabase
          .from('product_id_map')
          .insert({
            legacy_id: product.id,
            uuid_id: productId
          });
        
        // Create product specifications
        await supabase
          .from('product_specifications')
          .insert({
            product_id: productId,
            capacity: product.specifications.capacity,
            material: product.specifications.material,
            dimensions: product.specifications.dimensions,
            weight: product.specifications.weight,
            insulation: product.specifications.insulation,
            lid_type: product.specifications.lidType
          });
        
        // Create product features
        for (let i = 0; i < product.features.length; i++) {
          await supabase
            .from('product_features')
            .insert({
              product_id: productId,
              feature: product.features[i]
            });
        }
        
        // Create product colors
        for (let i = 0; i < product.colors.length; i++) {
          await supabase
            .from('product_colors')
            .insert({
              product_id: productId,
              name: product.colors[i].name,
              hex: product.colors[i].hex,
              available: product.colors[i].available
            });
        }
        
        // Create product images
        for (let i = 0; i < product.images.length; i++) {
          await supabase
            .from('product_images')
            .insert({
              product_id: productId,
              url: product.images[i],
              display_order: i
            });
        }
        
        // Create product tags
        for (const tagName of product.tags) {
          if (tagMap[tagName]) {
            await supabase
              .from('product_tags')
              .insert({
                product_id: productId,
                tag_id: tagMap[tagName]
              });
          }
        }
        
        console.log(`Successfully migrated product: ${product.name}`);
        
      } catch (error) {
        console.error(`Failed to migrate product ${product.name}:`, error);
      }
    }
  }
}
