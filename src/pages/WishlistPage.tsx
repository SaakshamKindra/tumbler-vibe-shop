
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const WishlistPage = () => {
  const navigate = useNavigate();
  
  // In a real implementation, we would fetch wishlist items from localStorage or context
  const wishlistItems = []; // This would normally contain the items
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
          
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="mb-6">
                <img 
                  src="/lovable-uploads/b7f7c9c6-de6d-43c6-b1a7-2420f34d81fa.png" 
                  alt="Empty wishlist" 
                  className="w-48 h-auto mx-auto"
                />
              </div>
              <p className="text-xl font-display mb-6 italic text-brand-brown">
                "Your wishlist is lonely and looking for love.<br />
                Add products to your wishlist, review them anytime and easily move to cart."
              </p>
              <Button 
                onClick={() => navigate('/products')}
                className="bg-brand-terracotta hover:bg-brand-terracotta/90 mt-4"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* This would render wishlist items if there were any */}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
