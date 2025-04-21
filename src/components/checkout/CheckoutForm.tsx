import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { toast } from "sonner";

import ContactInformationCard from './ContactInformationCard';
import ShippingAddressCard from './ShippingAddressCard';
import ShippingMethodCard from './ShippingMethodCard';
import PaymentMethodCard from './PaymentMethodCard';
import OrderSummary from './OrderSummary';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const CheckoutForm = () => {
  const { subtotal, totalItems, cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [shippingMethod, setShippingMethod] = useState('standard');
  const shipping = shippingMethod === 'express' ? 150 : (subtotal > 1800 ? 0 : 99);
  const tax = subtotal * 0.18;
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
    country: 'India',
    phone: '',
    saveAddress: true,
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
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      const formattedPhone = digits.length > 5 
        ? `${digits.slice(0, 5)} ${digits.slice(5)}` 
        : digits;
      setFormData(prev => ({
        ...prev,
        phone: formattedPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
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
    if (name === 'shippingMethod') setShippingMethod(value);
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
    const requiredFields = [
      'email', 'firstName', 'lastName', 'address1', 
      'city', 'state', 'zipCode', 'phone'
    ];
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = 'This field is required';
      }
    });
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (formData.zipCode && !/^\d{6}$/.test(formData.zipCode)) {
      errors.zipCode = 'Please enter a valid 6-digit PIN code';
    }
    if (formData.phone) {
      const digits = formData.phone.replace(/\D/g, '');
      if (digits.length !== 10) {
        errors.phone = 'Please enter a valid 10-digit phone number';
      }
    }
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardName) errors.cardName = 'Please enter the name on your card';
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
  
  const generatePaymentQR = () => {
    return `/lovable-uploads/5d27e79d-f656-417f-8e99-c4f9178dd09a.png`;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    setProcessing(true);
    const orderDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    const order = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      orderDate: orderDate.toISOString(),
      deliveryDate: deliveryDate.toISOString(),
      items: [...cart],
      shippingDetails: { ...formData },
      shippingMethod,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod: formData.paymentMethod
    };
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([order, ...existingOrders]));
    setTimeout(() => {
      setProcessing(false);
      toast.success("Your order has been placed. Thank you for ordering with us!");
      clearCart();
      setTimeout(() => { navigate('/orders'); }, 4000);
    }, 2000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <ContactInformationCard 
              email={formData.email}
              onChange={handleChange}
              error={formErrors.email}
            />
            <ShippingAddressCard
              formData={formData}
              formErrors={formErrors}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              setFormData={setFormData}
            />
            <ShippingMethodCard
              shippingMethod={shippingMethod}
              subtotal={subtotal}
              onChange={handleSelectChange}
            />
            <PaymentMethodCard
              formData={formData}
              formErrors={formErrors}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              generatePaymentQR={generatePaymentQR}
            />
          </div>
          <OrderSummary
            cart={cart}
            totalItems={totalItems}
            subtotal={subtotal}
            shipping={shipping}
            shippingMethod={shippingMethod}
            tax={tax}
            total={total}
            processing={processing}
          />
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
