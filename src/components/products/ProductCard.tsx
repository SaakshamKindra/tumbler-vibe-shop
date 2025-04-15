
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const defaultColor = product.colors.find(color => color.available)?.name || product.colors[0].name;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, defaultColor);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="product-image-container">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-brand-purple text-white text-xs font-bold px-2 py-1 rounded">
                NEW
              </span>
            )}
            {product.bestSeller && (
              <span className="bg-brand-terracotta text-white text-xs font-bold px-2 py-1 rounded">
                BESTSELLER
              </span>
            )}
          </div>
          
          {/* Quick Actions */}
          <div 
            className={`absolute bottom-2 right-2 flex gap-2 transition-all duration-300 transform ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <Button 
              size="icon" 
              variant="secondary" 
              className="w-8 h-8 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 shadow-sm"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-4 w-4 text-gray-800" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="w-8 h-8 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 shadow-sm"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4 text-gray-800" />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 group-hover:text-brand-terracotta transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center mt-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">{product.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
