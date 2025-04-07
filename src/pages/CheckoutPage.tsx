
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import CheckoutForm from '@/components/checkout/CheckoutForm';

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  // If cart is empty, redirect to cart page
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600 mb-8">
            Please complete your order by filling out the information below.
          </p>
          
          <CheckoutForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
