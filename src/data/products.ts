
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: "Arctic Explorer Tumbler",
    price: 34.99,
    description: "Keep your drinks ice cold for up to 24 hours or hot for up to 12 hours with our premium vacuum-insulated Arctic Explorer tumbler. Perfect for outdoor adventures or everyday use.",
    features: [
      "Double-wall vacuum insulation",
      "18/8 stainless steel construction",
      "Sweat-free exterior",
      "Copper lining for ultimate temperature retention",
      "BPA-free materials",
      "Dishwasher safe lid"
    ],
    specifications: {
      capacity: "30 oz (887 ml)",
      material: "18/8 Stainless Steel",
      dimensions: "3.5\" diameter x 7.5\" height",
      weight: "0.8 lbs",
      insulation: "Double-wall vacuum with copper lining",
      lidType: "Press-in lid with sliding closure"
    },
    colors: [
      { name: "Ocean Blue", hex: "#0369A1", available: true },
      { name: "Forest Green", hex: "#166534", available: true },
      { name: "Cherry Red", hex: "#B91C1C", available: true },
      { name: "Midnight Black", hex: "#1E293B", available: true },
      { name: "Arctic White", hex: "#F8FAFC", available: true }
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    category: "Tumblers",
    tags: ["Outdoor", "Travel", "Bestseller", "Insulated"],
    isNew: false,
    bestSeller: true,
    rating: 4.8,
    inventory: 250
  },
  {
    id: 2,
    name: "Urban Commuter Tumbler",
    price: 29.99,
    description: "Designed for the daily commuter, this sleek tumbler fits perfectly in most cup holders and keeps your morning coffee or tea at the ideal temperature during your commute.",
    features: [
      "Leak-proof flip lid",
      "Non-slip silicone base",
      "Fits standard cup holders",
      "Ergonomic design",
      "Easy one-handed operation",
      "Keeps drinks hot for 6 hours or cold for 12 hours"
    ],
    specifications: {
      capacity: "16 oz (473 ml)",
      material: "18/8 Stainless Steel",
      dimensions: "2.95\" diameter x 6.5\" height",
      weight: "0.6 lbs",
      insulation: "Double-wall vacuum insulation",
      lidType: "Flip-top with silicone seal"
    },
    colors: [
      { name: "Matte Black", hex: "#121212", available: true },
      { name: "Brushed Steel", hex: "#9CA3AF", available: true },
      { name: "Rose Gold", hex: "#FECDD3", available: true },
      { name: "Navy Blue", hex: "#1E3A8A", available: true }
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    category: "Tumblers",
    tags: ["Commuter", "Office", "Travel"],
    isNew: false,
    bestSeller: false,
    rating: 4.5,
    inventory: 175
  },
  {
    id: 3,
    name: "Summit Series Tumbler",
    price: 44.99,
    description: "Our premium Summit Series tumbler is built for extreme conditions. Whether scaling mountains or braving the daily grind, this tumbler provides unparalleled temperature retention.",
    features: [
      "Premium triple-layer insulation",
      "Indestructible powder coating",
      "Impact-resistant construction",
      "Integrated handle",
      "Wide mouth for easy filling with ice",
      "Keeps drinks hot for 24 hours or cold for 48 hours"
    ],
    specifications: {
      capacity: "40 oz (1183 ml)",
      material: "Premium 18/8 Stainless Steel",
      dimensions: "3.75\" diameter x 10.5\" height",
      weight: "1.2 lbs",
      insulation: "Triple-layer vacuum insulation",
      lidType: "Screw-on lid with magnetic slider closure"
    },
    colors: [
      { name: "Glacier White", hex: "#F8FAFC", available: true },
      { name: "Carbon Black", hex: "#0F172A", available: true },
      { name: "Summit Red", hex: "#DC2626", available: true },
      { name: "Alpine Green", hex: "#15803D", available: true },
      { name: "Cobalt Blue", hex: "#1D4ED8", available: true }
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    category: "Premium",
    tags: ["Outdoor", "Extreme", "Premium", "New"],
    isNew: true,
    bestSeller: false,
    rating: 4.9,
    inventory: 120
  },
  {
    id: 4,
    name: "Kids Adventure Tumbler",
    price: 24.99,
    description: "Designed for young explorers, our Kids Adventure Tumbler is durable, leak-proof, and perfectly sized for little hands. BPA-free and built to withstand drops and tumbles.",
    features: [
      "Kid-friendly size and design",
      "Drop-resistant construction",
      "Spill-proof straw lid",
      "Easy-grip sides",
      "Dishwasher safe",
      "Keeps drinks cold for 12 hours"
    ],
    specifications: {
      capacity: "12 oz (355 ml)",
      material: "18/8 Stainless Steel",
      dimensions: "3\" diameter x 5.5\" height",
      weight: "0.5 lbs",
      insulation: "Double-wall vacuum insulation",
      lidType: "Straw lid with silicone spout"
    },
    colors: [
      { name: "Sunshine Yellow", hex: "#EAB308", available: true },
      { name: "Bubblegum Pink", hex: "#EC4899", available: true },
      { name: "Rocket Blue", hex: "#2563EB", available: true },
      { name: "Lime Green", hex: "#65A30D", available: true }
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    category: "Kids",
    tags: ["Kids", "School", "Outdoor"],
    isNew: false,
    bestSeller: true,
    rating: 4.7,
    inventory: 200
  },
  {
    id: 5,
    name: "Coffee Enthusiast Tumbler",
    price: 32.99,
    description: "Specially designed for coffee lovers, with a leak-proof lid that preserves aromas and a ceramic-coated interior that won't impart metallic flavors to your precious brew.",
    features: [
      "Ceramic interior coating",
      "Aroma-preserving lid design",
      "Anti-slip texture",
      "Temperature indicator",
      "Optimal drinking spout design",
      "Keeps coffee hot for 8 hours"
    ],
    specifications: {
      capacity: "20 oz (591 ml)",
      material: "18/8 Stainless Steel with Ceramic Interior",
      dimensions: "3.25\" diameter x 7\" height",
      weight: "0.7 lbs",
      insulation: "Double-wall vacuum with copper layer",
      lidType: "Twist lock lid with sipping port"
    },
    colors: [
      { name: "Espresso Brown", hex: "#44403C", available: true },
      { name: "Cream", hex: "#FAFAF9", available: true },
      { name: "Mocha Swirl", hex: "#78716C", available: true },
      { name: "Cinnamon Red", hex: "#B91C1C", available: true }
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    category: "Specialty",
    tags: ["Coffee", "Hot Drinks", "Premium"],
    isNew: true,
    bestSeller: false,
    rating: 4.6,
    inventory: 150
  },
  {
    id: 6,
    name: "Slim Fit Tumbler",
    price: 27.99,
    description: "Our slimmest profile tumbler designed to fit in any cup holder while still providing excellent insulation. Perfect for those who are always on the move.",
    features: [
      "Ultra-slim design",
      "Fits all standard cup holders",
      "Secure seal lid",
      "Non-slip base",
      "Comfortable grip",
      "Keeps drinks hot for 6 hours or cold for 12 hours"
    ],
    specifications: {
      capacity: "18 oz (532 ml)",
      material: "18/8 Stainless Steel",
      dimensions: "2.75\" diameter x 8\" height",
      weight: "0.6 lbs",
      insulation: "Double-wall vacuum insulation",
      lidType: "Twist-on lid with sliding closure"
    },
    colors: [
      { name: "Silver", hex: "#E5E7EB", available: true },
      { name: "Matte Black", hex: "#1F2937", available: true },
      { name: "Seafoam Green", hex: "#10B981", available: true },
      { name: "Coral", hex: "#F87171", available: true }
    ],
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    category: "Tumblers",
    tags: ["Travel", "Commuter", "Slimline"],
    isNew: false,
    bestSeller: true,
    rating: 4.4,
    inventory: 180
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.bestSeller || product.isNew).slice(0, 4);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getProductsByTag = (tag: string): Product[] => {
  return products.filter(product => product.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
};
