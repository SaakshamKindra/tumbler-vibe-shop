
import { supabase } from '@/integrations/supabase/client';
import { Product, CartItem } from '@/types';
import { 
  DatabaseCart, 
  DatabaseProduct, 
  DatabaseProductImage,
  DatabaseUserProfile, 
  DatabaseOrder, 
  DatabaseOrderItem,
  DatabaseReview,
  convertDatabaseProductToFrontend
} from '@/types/supabase';

// User related functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Cart related functions
export const getUserCart = async (): Promise<CartItem[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];
  
  const { data: cartData, error } = await supabase
    .from('cart')
    .select(`
      id,
      quantity,
      customization_data,
      product_id,
      products!cart_product_id_fkey (
        id,
        name,
        price,
        description,
        best_seller,
        is_new,
        rating,
        inventory,
        category_id
      )
    `)
    .eq('user_id', user.id);
    
  if (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
  
  if (!cartData || cartData.length === 0) return [];
  
  // Get product images for each cart item
  const productIds = cartData.map(item => item.product_id);
  
  const { data: imagesData } = await supabase
    .from('product_images')
    .select('product_id, url, display_order')
    .in('product_id', productIds)
    .order('display_order');
  
  const cartItems: CartItem[] = cartData.map((cartItem) => {
    const dbProduct = cartItem.products as DatabaseProduct;
    const productImages = imagesData?.filter(img => img.product_id === cartItem.product_id) || [];
    
    if (!dbProduct) {
      console.warn(`Product not found for cart item: ${cartItem.product_id}`);
      return null;
    }
    
    const product = convertDatabaseProductToFrontend(dbProduct, productImages as DatabaseProductImage[]);
    
    return {
      product,
      quantity: cartItem.quantity || 0,
      color: 'Default',
      customization: cartItem.customization_data || {}
    };
  }).filter(Boolean) as CartItem[];
  
  return cartItems;
};

export const addToCart = async (product: Product, quantity: number, color: string, customization = {}) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be logged in to add to cart');
  }
  
  // Convert frontend product ID to UUID format - we need to find the actual UUID
  const { data: productMapping } = await supabase
    .from('product_id_map')
    .select('uuid_id')
    .eq('legacy_id', product.id)
    .single();
    
  const productId = productMapping?.uuid_id || String(product.id);
  
  // Check if product exists in cart
  const { data: existingItem, error: selectError } = await supabase
    .from('cart')
    .select('id, quantity')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .maybeSingle();
    
  if (selectError) {
    throw selectError;
  }
    
  if (existingItem?.id) {
    // Update quantity
    const { error } = await supabase
      .from('cart')
      .update({ 
        quantity: (existingItem.quantity || 0) + quantity,
        customization_data: customization,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingItem.id);
      
    if (error) throw error;
  } else {
    // Insert new item
    const { error } = await supabase
      .from('cart')
      .insert({
        user_id: user.id,
        product_id: productId,
        quantity,
        customization_data: customization
      });
      
    if (error) throw error;
  }
  
  return true;
};

export const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
  const { error } = await supabase
    .from('cart')
    .update({ quantity })
    .eq('id', cartItemId);
    
  if (error) throw error;
  
  return true;
};

export const removeFromCart = async (cartItemId: string) => {
  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('id', cartItemId);
    
  if (error) throw error;
  
  return true;
};

// Order related functions
export const createOrder = async (orderData: {
  shippingAddress: any;
  items: CartItem[];
  paymentMethod: string;
  totalAmount: number;
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be logged in to create order');
  }
  
  // Start a transaction
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_amount: orderData.totalAmount,
      shipping_address: orderData.shippingAddress,
      payment_method: orderData.paymentMethod,
      status: 'pending'
    })
    .select('id')
    .single();
    
  if (orderError) throw orderError;
  
  if (!order?.id) {
    throw new Error('Failed to create order');
  }
  
  // Convert product IDs for order items
  const orderItems = await Promise.all(
    orderData.items.map(async (item) => {
      // Find the UUID for this product
      const { data: productMapping } = await supabase
        .from('product_id_map')
        .select('uuid_id')
        .eq('legacy_id', item.product.id)
        .single();
        
      const productId = productMapping?.uuid_id || String(item.product.id);
      
      return {
        order_id: order.id,
        product_id: productId,
        quantity: item.quantity,
        unit_price: item.product.price,
        customization_data: item.customization || {}
      };
    })
  );
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);
    
  if (itemsError) throw itemsError;
  
  // Clear the user's cart
  const { error: clearCartError } = await supabase
    .from('cart')
    .delete()
    .eq('user_id', user.id);
    
  if (clearCartError) throw clearCartError;
  
  return order;
};

export const getUserOrders = async (): Promise<DatabaseOrder[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];
  
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      id,
      user_id,
      total_amount,
      status,
      created_at,
      updated_at,
      payment_status,
      payment_method,
      shipping_address
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return (orders as DatabaseOrder[]) || [];
};

export const getOrderDetails = async (orderId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  // Get order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(`
      id,
      user_id,
      total_amount,
      status,
      created_at,
      updated_at,
      payment_status,
      payment_method,
      shipping_address
    `)
    .eq('id', orderId)
    .eq('user_id', user.id)
    .single();
    
  if (orderError) {
    console.error('Error fetching order:', orderError);
    return null;
  }
  
  // Get order items with product details
  const { data: orderItems, error: itemsError } = await supabase
    .from('order_items')
    .select(`
      id,
      order_id,
      product_id,
      quantity,
      unit_price,
      customization_data,
      created_at,
      products!order_items_product_id_fkey (
        id,
        name
      )
    `)
    .eq('order_id', orderId);
    
  if (itemsError) {
    console.error('Error fetching order items:', itemsError);
    return null;
  }
  
  // Get product images for order items
  if (orderItems && orderItems.length > 0) {
    const productIds = orderItems.map(item => item.product_id);
    
    const { data: imagesData } = await supabase
      .from('product_images')
      .select('product_id, url')
      .in('product_id', productIds)
      .eq('display_order', 0);
    
    const enrichedItems = orderItems.map(item => ({
      ...item,
      products: {
        id: item.product_id,
        name: (item.products as any)?.name || 'Unknown Product',
        image_url: imagesData?.find(img => img.product_id === item.product_id)?.url || ''
      }
    }));
    
    return {
      ...(order as DatabaseOrder),
      items: enrichedItems as DatabaseOrderItem[]
    };
  }
  
  return {
    ...(order as DatabaseOrder),
    items: []
  };
};

// Review related functions
export const addProductReview = async (productId: string, orderId: string, rating: number, comment: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be logged in to add review');
  }
  
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      user_id: user.id,
      product_id: productId,
      order_id: orderId,
      rating,
      comment
    })
    .select('id')
    .single();
    
  if (error) throw error;
  
  return data;
};

export const getProductReviews = async (productId: string) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      id,
      rating,
      comment,
      created_at,
      user_id,
      user_profiles!reviews_user_id_fkey (
        id,
        first_name,
        last_name
      )
    `)
    .eq('product_id', productId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
  
  return data || [];
};

// Admin functions
export const isUserAdmin = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();
    
  if (error || !data) return false;
  
  const profile = data as DatabaseUserProfile;
  
  return profile?.role === 'admin';
};

export const getAllOrders = async (): Promise<DatabaseOrder[]> => {
  const isAdmin = await isUserAdmin();
  
  if (!isAdmin) {
    throw new Error('Unauthorized access');
  }
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      user_id,
      total_amount,
      status,
      created_at,
      updated_at,
      payment_status,
      payment_method,
      shipping_address,
      user_profiles!orders_user_id_fkey (
        id,
        first_name,
        last_name,
        email
      )
    `)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  
  return (data as DatabaseOrder[]) || [];
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const isAdmin = await isUserAdmin();
  
  if (!isAdmin) {
    throw new Error('Unauthorized access');
  }
  
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);
    
  if (error) throw error;
  
  return true;
};
