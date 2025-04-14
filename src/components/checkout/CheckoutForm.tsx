import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface FormData {
  email: string;
  zip: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data));
  };
  
  return (
    <Card className="w-full max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            type="email" 
            id="email" 
            {...register("email", { required: "Email is required" })} 
            className="w-full"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="zip">Zip Code</Label>
          <Input 
            type="text" 
            id="zip" 
            {...register("zip", { required: "Zip code is required" })} 
            className="w-full"
          />
          {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>}
        </div>
        
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input 
            type="text" 
            id="cardNumber" 
            {...register("cardNumber", { required: "Card number is required" })} 
            className="w-full"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input 
              type="text" 
              id="expiryDate" 
              placeholder="MM/YY"
              {...register("expiryDate", { required: "Expiry date is required" })} 
              className="w-full"
            />
            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>}
          </div>
          
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input 
              type="text" 
              id="cvv" 
              {...register("cvv", { required: "CVV is required" })} 
              className="w-full"
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal/90">
          Complete Order
        </Button>
      </form>
    </Card>
  );
};

export default CheckoutForm;
