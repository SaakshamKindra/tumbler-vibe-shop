
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import ProductQuantity from '@/components/ui/ProductQuantity';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { product, quantity } = item;
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-200 py-4">
      {/* Product Image */}
      <div className="sm:w-1/4 mb-4 sm:mb-0 flex-shrink-0">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full max-w-[120px] max-h-[120px] sm:max-w-none sm:max-h-none object-cover rounded-md"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="sm:w-3/4 sm:pl-6 flex flex-col sm:flex-row flex-grow">
        <div className="flex-grow">
          <div className="flex justify-between">
            <Link to={`/product/${product.id}`} className="block">
              <h3 className="font-semibold text-gray-800 hover:text-brand-teal transition-colors">
                {product.name}
              </h3>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-6 w-6 text-gray-400 hover:text-red-500 sm:hidden"
              aria-label="Remove item"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-1 text-sm text-gray-500">
            {product.specifications.capacity}
          </div>

          <div className="mt-4 sm:mt-auto flex items-center justify-between">
            <ProductQuantity
              quantity={quantity}
              onDecrease={() => handleQuantityChange(quantity - 1)}
              onIncrease={() => handleQuantityChange(quantity + 1)}
              onChange={handleQuantityChange}
              max={product.inventory}
            />

            <div className="font-semibold text-gray-900">
              ₹{(product.price * quantity).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Remove Button (Desktop) */}
        <div className="hidden sm:block ml-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            aria-label="Remove item"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
