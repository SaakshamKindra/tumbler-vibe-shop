
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type Props = {
  shippingMethod: string;
  subtotal: number;
  onChange: (name: string, value: string) => void;
};

const ShippingMethodCard: React.FC<Props> = ({ shippingMethod, subtotal, onChange }) => (
  <Card>
    <CardHeader>
      <CardTitle>Shipping Method</CardTitle>
      <CardDescription>
        Choose how you want your order delivered.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between border rounded-md p-4 cursor-pointer hover:border-brand-teal">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="shipping-standard"
              name="shippingMethod"
              value="standard"
              checked={shippingMethod === 'standard'}
              onChange={(e) => onChange('shippingMethod', e.target.value)}
              className="text-brand-teal"
            />
            <div>
              <Label htmlFor="shipping-standard" className="font-medium cursor-pointer">
                Standard Shipping (3-5 business days)
              </Label>
              <p className="text-sm text-gray-500">
                Free for orders over ₹1800
              </p>
            </div>
          </div>
          <span className="font-medium">
            {subtotal > 1800 ? 'FREE' : '₹99.00'}
          </span>
        </div>
        
        <div className="flex items-center justify-between border rounded-md p-4 cursor-pointer hover:border-brand-teal">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="shipping-express"
              name="shippingMethod"
              value="express"
              checked={shippingMethod === 'express'}
              onChange={(e) => onChange('shippingMethod', e.target.value)}
              className="text-brand-teal"
            />
            <div>
              <Label htmlFor="shipping-express" className="font-medium cursor-pointer">
                Express Shipping (1-2 business days)
              </Label>
              <p className="text-sm text-gray-500">
                Faster delivery for your order
              </p>
            </div>
          </div>
          <span className="font-medium">₹150.00</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ShippingMethodCard;
