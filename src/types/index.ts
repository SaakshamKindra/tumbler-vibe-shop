
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  specifications: ProductSpecifications;
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

interface BaseSpecifications {
  material: string;
  dimensions: string;
  weight: string;
}

export type ProductSpecifications = BaseSpecifications & (
  | { capacity: string; insulation: string; lidType: string }
  | { display: string; batteryLife: string; waterResistance: string; connectivity: string }
  | { powerOutput: string; batteryLife: string; connectivity: string; waterResistance: string }
  | { brightness: string; batteryLife: string; waterResistance: string }
  | { driverSize: string; batteryLife: string; connectivity: string; noiseCancelation: string }
  | { capacity: string }
  | { videoResolution: string; waterResistance: string; batteryLife: string; connectivity: string }
  | { brightness: string; resolution: string; batteryLife: string; connectivity: string }
  | { display: string; batteryLife: string; waterResistance: string; connectivity: string }
  | { videoResolution: string; flightTime: string; range: string; connectivity: string }
);
