
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  specifications: {
    capacity: string;
    material: string;
    dimensions: string;
    weight: string;
    insulation: string;
    lidType: string;
  };
  colors: {
    name: string;
    hex: string;
    available: boolean;
  }[];
  images: string[];
  category: string;
  tags: string[];
  isNew: boolean;
  bestSeller: boolean;
  rating: number;
  inventory: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
}

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, color: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

export type ProductsContextType = {
  products: Product[];
  featuredProducts: Product[];
  newArrivals: Product[];
  bestSellers: Product[];
  getProduct: (id: number) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getProductsByTag: (tag: string) => Product[];
};

export interface CustomerAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface CheckoutFormData extends CustomerAddress {
  email: string;
  saveAddress: boolean;
  shippingMethod: string;
  paymentMethod: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}
