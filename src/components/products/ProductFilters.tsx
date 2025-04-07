
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { X } from 'lucide-react';

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  features: string[];
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  categories: string[];
  availableColors: { name: string; hex: string }[];
  features: string[];
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

const ProductFilters = ({ 
  onFilterChange, 
  categories, 
  availableColors, 
  features,
  isMobile = false,
  onCloseMobile
}: ProductFiltersProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      
      updateFilters({
        categories: newCategories,
        priceRange,
        colors: selectedColors,
        features: selectedFeatures
      });
      
      return newCategories;
    });
  };

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
    
    updateFilters({
      categories: selectedCategories,
      priceRange: newRange,
      colors: selectedColors,
      features: selectedFeatures
    });
  };

  const handleColorChange = (color: string) => {
    setSelectedColors(prev => {
      const newColors = prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color];
      
      updateFilters({
        categories: selectedCategories,
        priceRange,
        colors: newColors,
        features: selectedFeatures
      });
      
      return newColors;
    });
  };

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures(prev => {
      const newFeatures = prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature];
      
      updateFilters({
        categories: selectedCategories,
        priceRange,
        colors: selectedColors,
        features: newFeatures
      });
      
      return newFeatures;
    });
  };

  const updateFilters = (filters: FilterOptions) => {
    onFilterChange(filters);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setSelectedColors([]);
    setSelectedFeatures([]);
    
    updateFilters({
      categories: [],
      priceRange: [0, 100],
      colors: [],
      features: []
    });
  };

  const hasActiveFilters = () => {
    return (
      selectedCategories.length > 0 ||
      priceRange[0] > 0 ||
      priceRange[1] < 100 ||
      selectedColors.length > 0 ||
      selectedFeatures.length > 0
    );
  };

  return (
    <div className={`bg-white ${isMobile ? 'p-4' : 'pr-6'}`}>
      {isMobile && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b">
          <h2 className="text-lg font-bold">Filters</h2>
          <Button variant="ghost" size="sm" onClick={onCloseMobile}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {hasActiveFilters() && (
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">Active filters</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-sm text-brand-teal hover:text-brand-teal/80"
          >
            Clear all
          </Button>
        </div>
      )}

      <Accordion type="multiple" defaultValue={["categories", "price", "color"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="font-semibold text-brand-dark">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm text-gray-700">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="font-semibold text-brand-dark">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-1">
              <Slider 
                defaultValue={[0, 100]} 
                max={100} 
                step={1} 
                value={priceRange}
                onValueChange={handlePriceChange}
                className="my-4"
              />
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">${priceRange[0]}</span>
                <span className="text-sm text-gray-600">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="font-semibold text-brand-dark">
            Colors
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 py-1">
              {availableColors.map(color => (
                <div 
                  key={color.name} 
                  className={`cursor-pointer rounded-full w-8 h-8 flex items-center justify-center border-2 ${
                    selectedColors.includes(color.name) 
                      ? 'border-brand-teal' 
                      : 'border-transparent hover:border-gray-200'
                  }`}
                  onClick={() => handleColorChange(color.name)}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColors.includes(color.name) && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger className="font-semibold text-brand-dark">
            Features
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {features.map(feature => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`feature-${feature}`} 
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={() => handleFeatureChange(feature)}
                  />
                  <Label htmlFor={`feature-${feature}`} className="text-sm text-gray-700">
                    {feature}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilters;
