
import { Json } from '@/integrations/supabase/types';

// Database interfaces (match actual Supabase schema)
export interface DatabaseCart {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  customization_data: Json;
  created_at: string;
  updated_at: string;
}

export interface DatabaseProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  best_seller: boolean;
  is_new: boolean;
  rating: number;
  inventory: number;
  category_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DatabaseProductImage {
  id: string;
  product_id: string;
  url: string;
  display_order: number;
}

export interface DatabaseUserProfile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrder {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: Json;
  payment_method: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  customization_data: Json;
  created_at: string;
}

export interface DatabaseReview {
  id: string;
  user_id: string;
  product_id: string;
  order_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
}

// Helper function to convert database product to frontend format
export const convertDatabaseProductToFrontend = (
  dbProduct: DatabaseProduct,
  images: DatabaseProductImage[] = []
) => ({
  id: parseInt(dbProduct.id.split('-')[0], 16) % 1000000, // Convert UUID to number for frontend compatibility
  name: dbProduct.name,
  price: dbProduct.price,
  description: dbProduct.description,
  features: [],
  specifications: {
    capacity: '',
    material: '',
    dimensions: '',
    weight: '',
    insulation: '',
    lidType: ''
  },
  colors: [{ name: 'Default', hex: '#000000', available: true }],
  images: images.map(img => img.url),
  category: '',
  tags: [],
  isNew: dbProduct.is_new,
  bestSeller: dbProduct.best_seller,
  rating: Number(dbProduct.rating),
  inventory: dbProduct.inventory
});
