import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: "Arctic Explorer Tumbler",
    price: 1299,
    inventory: 250,
    description: "Stay hydrated on your next adventure with the Arctic Explorer Tumbler. This durable, insulated tumbler keeps your drinks cold for up to 24 hours and hot for up to 12 hours. Perfect for hiking, camping, or everyday use.",
    images: [
      "/lovable-uploads/01-arctic-explorer-tumbler.webp",
      "/lovable-uploads/01-arctic-explorer-tumbler-1.webp",
      "/lovable-uploads/01-arctic-explorer-tumbler-2.webp",
    ],
    rating: 4.5,
    isNew: true,
    bestSeller: false,
    category: "tumblers",
    tags: ["tumbler", "insulated", "water bottle", "hiking", "camping"],
    colors: [
      { name: "Midnight Black", hex: "#000000", available: true },
      { name: "Glacier White", hex: "#FFFFFF", available: true },
      { name: "Ocean Blue", hex: "#0077BE", available: true },
      { name: "Forest Green", hex: "#228B22", available: false },
    ],
    specifications: {
      material: "Stainless Steel",
      capacity: "32 oz",
      dimensions: "10 x 3.5 inches",
      weight: "1 lb",
    },
  },
  {
    id: 2,
    name: "Solaris Smartwatch",
    price: 4999,
    inventory: 250,
    description: "The Solaris Smartwatch is your ultimate companion for fitness and connectivity. Track your heart rate, steps, and sleep patterns. Receive notifications, control your music, and stay connected on the go.",
    images: [
      "/lovable-uploads/02-solaris-smartwatch.webp",
      "/lovable-uploads/02-solaris-smartwatch-1.webp",
      "/lovable-uploads/02-solaris-smartwatch-2.webp",
    ],
    rating: 4.8,
    isNew: false,
    bestSeller: true,
    category: "smartwatches",
    tags: ["smartwatch", "fitness tracker", "wearable", "health", "technology"],
    colors: [
      { name: "Space Gray", hex: "#808080", available: true },
      { name: "Rose Gold", hex: "#B76E79", available: true },
      { name: "Electric Blue", hex: "#7DF9FF", available: true },
      { name: "Crimson Red", hex: "#DC143C", available: false },
    ],
    specifications: {
      display: "1.4-inch AMOLED",
      batteryLife: "7 days",
      waterResistance: "50m",
      connectivity: "Bluetooth 5.0",
    },
  },
  {
    id: 3,
    name: "Aurora Bluetooth Speaker",
    price: 799,
    inventory: 250,
    description: "Immerse yourself in high-quality audio with the Aurora Bluetooth Speaker. This portable speaker delivers rich, clear sound with deep bass. Perfect for parties, picnics, or relaxing at home.",
    images: [
      "/lovable-uploads/03-aurora-bluetooth-speaker.webp",
      "/lovable-uploads/03-aurora-bluetooth-speaker-1.webp",
      "/lovable-uploads/03-aurora-bluetooth-speaker-2.webp",
    ],
    rating: 4.2,
    isNew: false,
    bestSeller: false,
    category: "speakers",
    tags: ["bluetooth speaker", "portable speaker", "audio", "music", "wireless"],
    colors: [
      { name: "Midnight Black", hex: "#000000", available: true },
      { name: "Silver", hex: "#C0C0C0", available: true },
      { name: "Sunset Orange", hex: "#FF8042", available: true },
      { name: "Lime Green", hex: "#32CD32", available: false },
    ],
    specifications: {
      powerOutput: "10W",
      batteryLife: "10 hours",
      connectivity: "Bluetooth 5.0",
      waterResistance: "IPX5",
    },
  },
  {
    id: 4,
    name: "Emberglow Camping Lantern",
    price: 599,
    inventory: 250,
    description: "Light up your campsite with the Emberglow Camping Lantern. This durable, weather-resistant lantern provides bright, warm light for all your outdoor adventures. Perfect for camping, hiking, or emergency use.",
    images: [
      "/lovable-uploads/04-emberglow-camping-lantern.webp",
      "/lovable-uploads/04-emberglow-camping-lantern-1.webp",
      "/lovable-uploads/04-emberglow-camping-lantern-2.webp",
    ],
    rating: 4.6,
    isNew: true,
    bestSeller: false,
    category: "lanterns",
    tags: ["camping lantern", "outdoor lighting", "hiking", "camping", "emergency"],
    colors: [
      { name: "Forest Green", hex: "#228B22", available: true },
      { name: "Desert Sand", hex: "#F4A460", available: true },
      { name: "Crimson Red", hex: "#DC143C", available: true },
      { name: "Midnight Black", hex: "#000000", available: false },
    ],
    specifications: {
      brightness: "500 lumens",
      batteryLife: "20 hours",
      waterResistance: "IPX4",
      material: "ABS Plastic",
    },
  },
  {
    id: 5,
    name: "Celestial Wireless Headphones",
    price: 2499,
    inventory: 250,
    description: "Experience crystal-clear audio with the Celestial Wireless Headphones. These comfortable, noise-canceling headphones are perfect for travel, work, or relaxing at home.",
    images: [
      "/lovable-uploads/05-celestial-wireless-headphones.webp",
      "/lovable-uploads/05-celestial-wireless-headphones-1.webp",
      "/lovable-uploads/05-celestial-wireless-headphones-2.webp",
    ],
    rating: 4.7,
    isNew: false,
    bestSeller: true,
    category: "headphones",
    tags: ["wireless headphones", "noise-canceling", "audio", "music", "travel"],
    colors: [
      { name: "Space Gray", hex: "#808080", available: true },
      { name: "Rose Gold", hex: "#B76E79", available: true },
      { name: "Sky Blue", hex: "#87CEEB", available: true },
      { name: "Midnight Black", hex: "#000000", available: false },
    ],
    specifications: {
      driverSize: "40mm",
      batteryLife: "30 hours",
      connectivity: "Bluetooth 5.0",
      noiseCancelation: "Active Noise Canceling",
    },
  },
  {
    id: 6,
    name: "Terra Trekking Backpack",
    price: 1799,
    inventory: 250,
    description: "Embark on your next adventure with the Terra Trekking Backpack. This spacious, durable backpack is designed for hiking, camping, and travel. With multiple compartments and weather-resistant materials, it's the perfect companion for any outdoor excursion.",
    images: [
      "/lovable-uploads/06-terra-trekking-backpack.webp",
      "/lovable-uploads/06-terra-trekking-backpack-1.webp",
      "/lovable-uploads/06-terra-trekking-backpack-2.webp",
    ],
    rating: 4.4,
    isNew: true,
    bestSeller: false,
    category: "backpacks",
    tags: ["trekking backpack", "hiking", "camping", "travel", "outdoor"],
    colors: [
      { name: "Forest Green", hex: "#228B22", available: true },
      { name: "Desert Sand", hex: "#F4A460", available: true },
      { name: "Ocean Blue", hex: "#0077BE", available: true },
      { name: "Slate Gray", hex: "#708090", available: false },
    ],
    specifications: {
      capacity: "50L",
      material: "Nylon",
      dimensions: "24 x 14 x 8 inches",
      weight: "3 lbs",
    },
  },
  {
    id: 7,
    name: "Nova Action Camera",
    price: 3499,
    inventory: 250,
    description: "Capture your adventures in stunning detail with the Nova Action Camera. This rugged, waterproof camera is perfect for extreme sports, travel, and everyday use. Record videos in 4K and take high-resolution photos.",
    images: [
      "/lovable-uploads/07-nova-action-camera.webp",
      "/lovable-uploads/07-nova-action-camera-1.webp",
      "/lovable-uploads/07-nova-action-camera-2.webp",
    ],
    rating: 4.9,
    isNew: false,
    bestSeller: true,
    category: "cameras",
    tags: ["action camera", "waterproof", "4k video", "sports", "travel"],
    colors: [
      { name: "Midnight Black", hex: "#000000", available: true },
      { name: "Silver", hex: "#C0C0C0", available: true },
      { name: "Electric Blue", hex: "#7DF9FF", available: true },
      { name: "Crimson Red", hex: "#DC143C", available: false },
    ],
    specifications: {
      videoResolution: "4K",
      waterResistance: "10m",
      batteryLife: "2 hours",
      connectivity: "Wi-Fi",
    },
  },
  {
    id: 8,
    name: "Zenith Portable Projector",
    price: 2999,
    inventory: 250,
    description: "Create a cinematic experience anywhere with the Zenith Portable Projector. This compact, lightweight projector delivers bright, clear images on any surface. Perfect for movies, presentations, or gaming.",
    images: [
      "/lovable-uploads/08-zenith-portable-projector.webp",
      "/lovable-uploads/08-zenith-portable-projector-1.webp",
      "/lovable-uploads/08-zenith-portable-projector-2.webp",
    ],
    rating: 4.3,
    isNew: false,
    bestSeller: false,
    category: "projectors",
    tags: ["portable projector", "home theater", "movies", "gaming", "presentation"],
    colors: [
      { name: "Space Gray", hex: "#808080", available: true },
      { name: "Glacier White", hex: "#FFFFFF", available: true },
      { name: "Midnight Black", hex: "#000000", available: true },
      { name: "Rose Gold", hex: "#B76E79", available: false },
    ],
    specifications: {
      brightness: "200 lumens",
      resolution: "1080p",
      batteryLife: "3 hours",
      connectivity: "HDMI, USB, Wi-Fi",
    },
  },
  {
    id: 9,
    name: "Quantum Fitness Tracker",
    price: 999,
    inventory: 250,
    description: "Achieve your fitness goals with the Quantum Fitness Tracker. This sleek, lightweight tracker monitors your heart rate, steps, and sleep patterns. Stay motivated and track your progress with ease.",
    images: [
      "/lovable-uploads/09-quantum-fitness-tracker.webp",
      "/lovable-uploads/09-quantum-fitness-tracker-1.webp",
      "/lovable-uploads/09-quantum-fitness-tracker-2.webp",
    ],
    rating: 4.6,
    isNew: true,
    bestSeller: false,
    category: "fitness trackers",
    tags: ["fitness tracker", "health", "wearable", "activity tracker", "sports"],
    colors: [
      { name: "Midnight Black", hex: "#000000", available: true },
      { name: "Electric Blue", hex: "#7DF9FF", available: true },
      { name: "Lime Green", hex: "#32CD32", available: true },
      { name: "Crimson Red", hex: "#DC143C", available: false },
    ],
    specifications: {
      display: "0.96-inch OLED",
      batteryLife: "5 days",
      waterResistance: "30m",
      connectivity: "Bluetooth 4.2",
    },
  },
  {
    id: 10,
    name: "Vortex Drone",
    price: 5499,
    inventory: 250,
    description: "Take to the skies with the Vortex Drone. This easy-to-fly drone captures stunning aerial photos and videos. With its advanced features and long battery life, it's perfect for both beginners and experienced pilots.",
    images: [
      "/lovable-uploads/10-vortex-drone.webp",
      "/lovable-uploads/10-vortex-drone-1.webp",
      "/lovable-uploads/10-vortex-drone-2.webp",
    ],
    rating: 4.7,
    isNew: false,
    bestSeller: true,
    category: "drones",
    tags: ["drone", "aerial photography", "video", "remote control", "technology"],
    colors: [
      { name: "Space Gray", hex: "#808080", available: true },
      { name: "Glacier White", hex: "#FFFFFF", available: true },
      { name: "Midnight Black", hex: "#000000", available: true },
      { name: "Electric Blue", hex: "#7DF9FF", available: false },
    ],
    specifications: {
      videoResolution: "4K",
      flightTime: "25 minutes",
      range: "2 km",
      connectivity: "Wi-Fi",
    },
  },
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.bestSeller).slice(0, 4);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew).slice(0, 4);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.bestSeller).slice(0, 4);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductsByTag = (tag: string): Product[] => {
  return products.filter(product => product.tags.includes(tag));
};
