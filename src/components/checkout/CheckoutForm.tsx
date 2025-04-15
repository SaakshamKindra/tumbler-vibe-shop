
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

interface FormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  paymentMethod: 'creditCard' | 'upi';
}

const CheckoutForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>();
  const { clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = React.useState<'creditCard' | 'upi'>('creditCard');

  // Calculate shipping and total
  const shipping = subtotal > 1800 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pincode = e.target.value;
    if (pincode.length === 6) {
      // Add your pincode mapping logic here
      // For example:
      if (pincode === "400001") {
        setValue('state', "Maharashtra");
        setValue('city', "Mumbai");
      }
      // Add more pincode mappings as needed
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                {...register("email", { required: true })}
              />
            </div>
            
            {/* Shipping Information */}
            <h3 className="text-xl font-semibold mt-6">Shipping Information</h3>
            
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                {...register("fullName", { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                {...register("address", { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input 
                id="pincode" 
                {...register("pincode", { required: true })}
                onChange={handlePincodeChange}
              />
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <select 
                className="w-full p-2 border rounded-md"
                {...register("state", { required: true })}
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                {...register("city", { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                {...register("phone", { required: true })}
              />
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Payment Method</h3>
            
            <div className="flex gap-4 mb-4">
              <Button
                type="button"
                variant={selectedPayment === 'creditCard' ? 'default' : 'outline'}
                onClick={() => setSelectedPayment('creditCard')}
              >
                Credit Card
              </Button>
              <Button
                type="button"
                variant={selectedPayment === 'upi' ? 'default' : 'outline'}
                onClick={() => setSelectedPayment('upi')}
              >
                UPI
              </Button>
            </div>

            {selectedPayment === 'creditCard' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" type="password" placeholder="123" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p>Scan this QR for the payment</p>
                <img 
                  src="/lovable-uploads/db125437-c4b2-4908-a685-3a2cff342af3.png" 
                  alt="UPI QR Code" 
                  className="w-48 h-48 mx-auto"
                />
              </div>
            )}

            {/* Order Summary */}
            <div className="mt-8 pt-4 border-t">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6">
              Complete Order
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CheckoutForm;
