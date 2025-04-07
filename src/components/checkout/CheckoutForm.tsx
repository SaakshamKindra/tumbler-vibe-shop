
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from "sonner";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { CreditCard, CircleDollarSign } from 'lucide-react';

const CheckoutForm = () => {
  const { subtotal, totalItems, cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    saveAddress: true,
    shippingMethod: 'standard',
    paymentMethod: 'credit-card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = [
      'email', 'firstName', 'lastName', 'address1', 
      'city', 'state', 'zipCode', 'country', 'phone'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Zip code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      errors.zipCode = 'Please enter a valid zip code';
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    // Credit card validation if payment method is credit card
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardName) {
        errors.cardName = 'Please enter the name on your card';
      }
      
      if (!formData.cardNumber) {
        errors.cardNumber = 'Please enter your card number';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!formData.cardExpiry) {
        errors.cardExpiry = 'Please enter the expiration date';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        errors.cardExpiry = 'Please use format MM/YY';
      }
      
      if (!formData.cardCvc) {
        errors.cardCvc = 'Please enter the security code';
      } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
        errors.cardCvc = 'Please enter a valid security code';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/checkout/success', { 
        state: { 
          orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          total: total.toFixed(2),
          email: formData.email
        } 
      });
    }, 2000);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-8 space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  We'll use this information to contact you about your order.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
                <CardDescription>
                  Enter the address where you want your order delivered.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={formErrors.firstName ? "border-red-500" : ""}
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={formErrors.lastName ? "border-red-500" : ""}
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="address1">Street Address</Label>
                  <Input
                    id="address1"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    className={formErrors.address1 ? "border-red-500" : ""}
                  />
                  {formErrors.address1 && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.address1}</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <Label htmlFor="address2">Apartment, Suite, etc. (optional)</Label>
                  <Input
                    id="address2"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={formErrors.city ? "border-red-500" : ""}
                    />
                    {formErrors.city && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(value) => handleSelectChange('state', value)}
                    >
                      <SelectTrigger id="state" className={formErrors.state ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AL">Alabama</SelectItem>
                        <SelectItem value="AK">Alaska</SelectItem>
                        <SelectItem value="AZ">Arizona</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="CO">Colorado</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        {/* Add more states as needed */}
                      </SelectContent>
                    </Select>
                    {formErrors.state && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="zipCode">Zip/Postal Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={formErrors.zipCode ? "border-red-500" : ""}
                    />
                    {formErrors.zipCode && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.zipCode}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select 
                      value={formData.country} 
                      onValueChange={(value) => handleSelectChange('country', value)}
                    >
                      <SelectTrigger id="country" className={formErrors.country ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Mexico">Mexico</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                    {formErrors.country && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      className={formErrors.phone ? "border-red-500" : ""}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center space-x-2">
                  <Checkbox 
                    id="saveAddress" 
                    checked={formData.saveAddress} 
                    onCheckedChange={(checked) => {
                      setFormData(prev => ({
                        ...prev,
                        saveAddress: checked === true
                      }));
                    }}
                  />
                  <Label htmlFor="saveAddress" className="text-sm">
                    Save this address for future orders
                  </Label>
                </div>
              </CardContent>
            </Card>
            
            {/* Shipping Method */}
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
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleChange}
                        className="text-brand-teal"
                      />
                      <div>
                        <Label htmlFor="shipping-standard" className="font-medium cursor-pointer">
                          Standard Shipping (3-5 business days)
                        </Label>
                        <p className="text-sm text-gray-500">
                          Free for orders over $50
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">
                      {subtotal > 50 ? 'FREE' : '$5.99'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between border rounded-md p-4 cursor-pointer hover:border-brand-teal">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="shipping-express"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleChange}
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
                    <span className="font-medium">$12.99</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  All transactions are secure and encrypted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="credit-card" 
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                >
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="credit-card" className="flex items-center justify-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="paypal" className="flex items-center justify-center gap-2">
                      <CircleDollarSign className="h-4 w-4" />
                      PayPal
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="credit-card">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={formErrors.cardName ? "border-red-500" : ""}
                        />
                        {formErrors.cardName && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.cardName}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="1234 5678 9012 3456"
                          className={formErrors.cardNumber ? "border-red-500" : ""}
                        />
                        {formErrors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Expiration Date</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                            className={formErrors.cardExpiry ? "border-red-500" : ""}
                          />
                          {formErrors.cardExpiry && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.cardExpiry}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="cardCvc">Security Code</Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            placeholder="CVC"
                            className={formErrors.cardCvc ? "border-red-500" : ""}
                          />
                          {formErrors.cardCvc && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.cardCvc}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="paypal">
                    <div className="text-center py-8">
                      <p className="mb-4">
                        You'll be redirected to PayPal to complete your purchase securely.
                      </p>
                      <img 
                        src="/placeholder.svg" 
                        alt="PayPal" 
                        className="max-h-10 mx-auto" 
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Order Summary */}
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
                            ${(item.product.price * item.quantity).toFixed(2)}
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
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-brand-teal hover:bg-brand-teal/90"
                disabled={processing || totalItems === 0}
              >
                {processing ? "Processing..." : "Complete Order"}
              </Button>
              
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
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
