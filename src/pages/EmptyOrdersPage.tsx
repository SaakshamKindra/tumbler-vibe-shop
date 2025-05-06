
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const EmptyOrdersPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
          
          <div className="text-center py-12 max-w-md mx-auto">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/3d72aab9-98a9-4467-9d9d-8064545fb15f.png" 
                alt="Empty cart" 
                className="w-48 h-auto mx-auto"
              />
            </div>
            <p className="text-xl font-display mb-6 italic text-brand-brown">
              "Your shopping cart is empty.<br />
              Please add something soon, carts have feelings too."
            </p>
            <Button 
              onClick={() => navigate('/products')}
              className="bg-brand-terracotta hover:bg-brand-terracotta/90 mt-4"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmptyOrdersPage;
