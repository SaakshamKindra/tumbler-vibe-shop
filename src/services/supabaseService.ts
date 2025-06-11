
import { supabase } from '@/integrations/supabase/client';
import { Product, CartItem } from '@/types';

// User related functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Cart related functions
export const getUserCart = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];
  
  const { data, error } = await supabase
    .from('cart')
    .select(`
      id,
      quantity,
      customization_data,
      products:product_id (
        id, 
        name, 
        price,
        description,
        image_url
      )
    `)
    .eq('user_id', user.id);
    
  if (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
  
  // Transform the data to match your existing CartItem format
  return data.map(item => ({
    product: {
      id: item.products.id,
      name: item.products.name,
      price: parseFloat(item.products.price),
      description: item.products.description,
      images: [item.products.image_url],
      // Add other required fields with defaults
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
      category: '',
      tags: [],
      isNew: false,
      bestSeller: false,
      rating: 0,
      inventory: 0
    },
    quantity: item.quantity,
    color: 'Default',
    customization: item.customization_data
  }));
};

export const addToCart = async (product: Product, quantity: number, color: string, customization = {}) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be logged in to add to cart');
  }
  
  // Check if product exists in cart
  const { data: existingItem } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', user.id)
    .eq('product_id', product.id)
    .single();
    
  if (existingItem) {
    // Update quantity
    const { error } = await supabase
      .from('cart')
      .update({ 
        quantity: existingItem.quantity + quantity,
        customization_data: customization,
        updated_at: new Date()
      })
      .eq('id', existingItem.id);
      
    if (error) throw error;
  } else {
    // Insert new item
    const { error } = await supabase
      .from('cart')
      .insert({
        user_id: user.id,
        product_id: product.id,
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
    .select()
    .single();
    
  if (orderError) throw orderError;
  
  // Insert order items
  const orderItems = orderData.items.map(item => ({
    order_id: order.id,
    product_id: item.product.id,
    quantity: item.quantity,
    unit_price: item.product.price,
    customization_data: item.customization || {}
  }));
  
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

export const getUserOrders = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];
  
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      id,
      total_amount,
      status,
      created_at,
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
  
  return orders;
};

export const getOrderDetails = async (orderId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  // Get order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(`
      id,
      total_amount,
      status,
      created_at,
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
  
  // Get order items
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select(`
      id,
      quantity,
      unit_price,
      customization_data,
      products:product_id (
        id,
        name,
        image_url
      )
    `)
    .eq('order_id', orderId);
    
  if (itemsError) {
    console.error('Error fetching order items:', itemsError);
    return null;
  }
  
  return {
    ...order,
    items
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
    .select()
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
      user_profiles:user_id (
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
  
  return data;
};

// Admin functions
export const isUserAdmin = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return false;
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', user.id)
    .single();
    
  if (error || !data) return false;
  
  return data.role === 'admin';
};

export const getAllOrders = async () => {
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
      payment_status,
      shipping_address,
      user_profiles:user_id (
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
  
  return data;
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
