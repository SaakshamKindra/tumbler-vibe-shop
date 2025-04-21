
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Props = {
  cart: any[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  shippingMethod: string;
  tax: number;
  total: number;
  processing: boolean;
};

const OrderSummary: React.FC<Props> = ({
  cart, totalItems, subtotal, shipping, shippingMethod, tax, total, processing
}) => (
  <div className="lg:col-span-4">
    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>
      <Accordion type="single" collapsible defaultValue="items">
        <AccordionItem value="items">
          <AccordionTrigger className="text-sm font-medium">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in cart
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 mt-2">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.color}`} className="flex gap-2">
                  <div className="w-12 h-12 bg-white rounded border">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.color} - Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="font-medium text-sm">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="space-y-3 my-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">
            {shippingMethod === 'express' ? 'Express Shipping' : 'Shipping'}
          </span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Estimated Tax</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">₹{total.toFixed(2)}</span>
        </div>
      </div>
      <Button 
        type="submit"
        className="w-full bg-brand-teal hover:bg-brand-teal/90"
        disabled={processing || totalItems === 0}
      >
        {processing ? "Processing..." : "Complete Order"}
      </Button>
      <div className="mt-4 flex justify-between">
        <Link to="/cart" className="text-sm text-brand-teal hover:underline">
          Return to cart
        </Link>
        <Link to="/orders" className="text-sm text-brand-teal hover:underline">
          Your Orders
        </Link>
      </div>
      <p className="text-xs text-gray-500 mt-4 text-center">
        By completing your purchase, you agree to our{' '}
        <a href="/terms-of-service" className="text-brand-teal hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy-policy" className="text-brand-teal hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  </div>
);

export default OrderSummary;
