
// Supabase specific types

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type UserRole = 'user' | 'admin';

export interface SupabaseProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  customization_options: Record<string, any> | null;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  customization_data: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  products?: SupabaseProduct;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: OrderStatus;
  shipping_address: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
  };
  payment_method: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  user_profiles?: UserProfile;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  customization_data: Record<string, any> | null;
  created_at: string;
  products?: SupabaseProduct;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  order_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  user_profiles?: {
    first_name: string | null;
    last_name: string | null;
  };
}
