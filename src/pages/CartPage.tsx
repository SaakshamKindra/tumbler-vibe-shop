
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { cart, clearCart, totalItems } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild className="bg-brand-teal hover:bg-brand-teal/90">
                <Link to="/products">
                  Start Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">
                      Cart Items ({totalItems})
                    </h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearCart}
                      className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                    >
                      Clear Cart
                    </Button>
                  </div>
                  
                  <div className="divide-y">
                    {cart.map(item => (
                      <CartItem key={`${item.product.id}-${item.color}`} item={item} />
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-between items-center">
                    <Link 
                      to="/products" 
                      className="text-brand-teal hover:text-brand-teal/80 flex items-center"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                      Continue Shopping
                    </Link>
                    
                    <Button asChild className="bg-brand-teal hover:bg-brand-teal/90">
                      <Link to="/checkout">
                        Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <CartSummary />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
