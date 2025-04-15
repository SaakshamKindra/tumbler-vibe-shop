
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

// State and city data (simplified for example purposes)
const stateData = [
  { name: 'Maharashtra', code: 'MH' },
  { name: 'Karnataka', code: 'KA' },
  { name: 'Delhi', code: 'DL' },
  { name: 'Tamil Nadu', code: 'TN' },
  { name: 'Gujarat', code: 'GJ' },
];

const cityData = {
  'MH': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
  'KA': ['Bengaluru', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
  'DL': ['New Delhi', 'Delhi NCR'],
  'TN': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'],
  'GJ': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
};

// Pincode to state and city mapping (simplified)
const pincodeMapping: Record<string, { state: string, city: string }> = {
  '400001': { state: 'MH', city: 'Mumbai' },
  '560001': { state: 'KA', city: 'Bengaluru' },
  '110001': { state: 'DL', city: 'New Delhi' },
  '600001': { state: 'TN', city: 'Chennai' },
  '380001': { state: 'GJ', city: 'Ahmedabad' },
  // Add more mappings as needed
};

interface FormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutForm = () => {
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormData>();
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const { clearCart } = useCart();
  const navigate = useNavigate();
  
  const selectedState = watch('state');
  const pincode = watch('pincode');
  
  // Update cities when state changes
  useEffect(() => {
    if (selectedState) {
      setAvailableCities(cityData[selectedState] || []);
    } else {
      setAvailableCities([]);
    }
  }, [selectedState]);
  
  // Auto-fill state and city based on pincode
  useEffect(() => {
    if (pincode && pincode.length === 6 && pincodeMapping[pincode]) {
      const { state, city } = pincodeMapping[pincode];
      setValue('state', state);
      setValue('city', city);
    }
  }, [pincode, setValue]);
  
  const onSubmit = (data: FormData) => {
    console.log('Form submitted with:', data);
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
            
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                {...register("fullName", { required: "Full name is required" })} 
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })} 
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                {...register("phone", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits"
                  }
                })} 
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                {...register("address", { required: "Address is required" })} 
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input 
                id="pincode" 
                {...register("pincode", { 
                  required: "Pincode is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Pincode must be 6 digits"
                  }
                })} 
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="state">State</Label>
              <Select 
                onValueChange={(value) => setValue('state', value)}
                value={selectedState}
              >
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {stateData.map((state) => (
                    <SelectItem key={state.code} value={state.code}>{state.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
            </div>
            
            <div>
              <Label htmlFor="city">City</Label>
              <Select 
                onValueChange={(value) => setValue('city', value)}
                value={watch('city')}
                disabled={!selectedState}
              >
                <SelectTrigger id="city">
                  <SelectValue placeholder={selectedState ? "Select city" : "Select state first"} />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Payment Information</h3>
            
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input 
                id="cardNumber" 
                {...register("cardNumber", { 
                  required: "Card number is required",
                  pattern: {
                    value: /^[0-9]{16}$/,
                    message: "Please enter a valid 16-digit card number"
                  }
                })} 
                placeholder="1234 5678 9012 3456"
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input 
                  id="expiryDate" 
                  {...register("expiryDate", { 
                    required: "Expiry date is required",
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                      message: "Please use MM/YY format"
                    }
                  })} 
                  placeholder="MM/YY"
                />
                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>}
              </div>
              
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input 
                  id="cvv" 
                  type="password"
                  {...register("cvv", { 
                    required: "CVV is required",
                    pattern: {
                      value: /^[0-9]{3,4}$/,
                      message: "CVV must be 3 or 4 digits"
                    }
                  })} 
                  placeholder="123"
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹1,299.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹99.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹139.96</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹1,537.96</span>
                </div>
              </div>
            </div>
            
            <Button type="submit" className="w-full mt-6 bg-brand-terracotta hover:bg-brand-terracotta/90">
              Complete Order
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default CheckoutForm;
