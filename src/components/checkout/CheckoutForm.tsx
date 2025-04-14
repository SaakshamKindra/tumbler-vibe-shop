import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  paymentMethod: 'creditCard',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
};

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear error when the user types
    setErrors(prevState => ({ ...prevState, [name]: '' }));
  };
  
  const validateForm = () => {
    let newErrors = {};
    
    // Required fields validation
    ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zip', 'paymentMethod'].forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // ZIP code validation (basic format)
    if (formData.zip && !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = 'Invalid ZIP code format';
    }
    
    // Payment details validation (simplified)
    if (formData.paymentMethod === 'creditCard') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    
    // Process the order
    toast.success("Processing your order...");
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success("Payment successful!");
      toast({
        title: "Your order has been placed",
        description: "Thank you for ordering from us",
        duration: 4000,
      });
      
      // Reset form and redirect to orders page
      setTimeout(() => {
        clearCart();
        setFormData(initialFormData);
        navigate('/orders');
      }, 4000);
    }, 2000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-brand-brown">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-4"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      {/* Shipping Address */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-brand-brown">Shipping Address</h3>
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mb-4"
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          <div>
            <Input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full"
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
          <div>
            <Input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              className="w-full"
            />
            {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
          </div>
        </div>
      </div>
      
      {/* Payment Information */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-brand-brown">Payment Information</h3>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={formData.paymentMethod === 'creditCard'}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Credit Card</span>
          </label>
        </div>
        {formData.paymentMethod === 'creditCard' && (
          <div className="space-y-4">
            <Input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full"
            />
            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full"
              />
              {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
              <Input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                className="w-full"
              />
              {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
            </div>
          </div>
        )}
      </div>
      
      {/* Submit Button */}
      <div>
        <Button className="w-full bg-brand-terracotta hover:bg-brand-terracotta/90 text-white">
          Complete Order
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;
