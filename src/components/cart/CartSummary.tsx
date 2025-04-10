
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

const CartSummary = () => {
  const { subtotal, totalItems } = useCart();
  const navigate = useNavigate();
  
  // Calculate estimated values for the cart summary
  const shipping = subtotal > 1000 ? 0 : 99; // Free shipping over ₹1000
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping & Handling</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">GST (18%)</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="font-bold">Order Total</span>
          <span className="font-bold">₹{total.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        onClick={handleCheckout}
        className="w-full bg-brand-terracotta hover:bg-brand-terracotta/90 mb-4"
        disabled={totalItems === 0}
      >
        Proceed to Checkout
      </Button>
      
      <Accordion type="single" collapsible className="border-t border-gray-200 pt-4">
        <AccordionItem value="promo">
          <AccordionTrigger className="text-sm font-medium">
            Apply Promo Code
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2 mt-2">
              <Input placeholder="Enter promo code" className="text-sm" />
              <Button variant="outline" size="sm">Apply</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="mt-6 text-xs text-gray-500">
        <p className="mb-2">
          Free shipping on orders over ₹1000. Standard shipping takes 3-5 business days.
        </p>
        <p>
          30-day easy returns. See our <a href="/customer-service#returns" className="text-brand-terracotta hover:underline">return policy</a> for more details.
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
