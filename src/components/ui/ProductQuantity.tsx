
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';

interface ProductQuantityProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onChange: (quantity: number) => void;
  max?: number;
}

const ProductQuantity = ({
  quantity,
  onDecrease,
  onIncrease,
  onChange,
  max = 99
}: ProductQuantityProps) => {
  const [value, setValue] = useState(quantity.toString());

  useEffect(() => {
    setValue(quantity.toString());
  }, [quantity]);

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Allow only numbers and empty string (for backspace)
    if (newValue === '' || /^\d+$/.test(newValue)) {
      setValue(newValue);
      
      // Convert to number and update if valid
      const numValue = parseInt(newValue, 10);
      if (!isNaN(numValue) && numValue > 0 && numValue <= max) {
        onChange(numValue);
      }
    }
  };

  const handleBlur = () => {
    // If empty or invalid, reset to current quantity
    if (value === '' || isNaN(parseInt(value, 10)) || parseInt(value, 10) <= 0) {
      setValue(quantity.toString());
    } else {
      const numValue = Math.min(parseInt(value, 10), max);
      setValue(numValue.toString());
      onChange(numValue);
    }
  };

  return (
    <div className="flex items-center border border-gray-200 rounded">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none border-r border-gray-200"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <MinusIcon className="h-3 w-3" />
      </Button>
      
      <input
        type="text"
        value={value}
        onChange={handleManualChange}
        onBlur={handleBlur}
        className="w-10 h-8 text-center text-sm border-0 focus:outline-none focus:ring-0"
        aria-label="Quantity"
      />
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none border-l border-gray-200"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <PlusIcon className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default ProductQuantity;
