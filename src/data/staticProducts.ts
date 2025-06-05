
import { Product } from '@/types';

// Fallback static products data - this is used as a backup if database fails
const staticProducts: Product[] = [
  {
    id: 1,
    name: "Arctic Explorer Tumbler",
    price: 1400,
    description: "Keep your drinks ice cold for up to 24 hours or hot for up to 12 hours with our premium vacuum-insulated Arctic Explorer tumbler.",
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
      "/lovable-uploads/5a7e70d9-2b15-4a5f-8316-c4ce15c95bf8.png",
      "/lovable-uploads/2795299f-3085-4dc2-8073-92bc7b6db911.png",
      "/lovable-uploads/5c2d8766-8f41-45ad-9ac6-d9459dcfc4e3.png"
    ],
    category: "Premium",
    tags: ["Outdoor", "Travel", "Bestseller", "Insulated"],
    isNew: false,
    bestSeller: true,
    rating: 4.8,
    inventory: 250
  }
];

export default staticProducts;
