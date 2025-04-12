
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ChevronLeft, Truck } from 'lucide-react';

const OrdersPage = () => {
  const navigate = useNavigate();
  
  // Get orders from localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="mr-2"
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Go Back
            </Button>
            <h1 className="text-3xl font-bold text-brand-brown">Your Orders</h1>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
              <p className="text-gray-500 mb-8">
                You haven't placed any orders yet.
              </p>
              <Button asChild className="bg-brand-teal hover:bg-brand-teal/90">
                <a href="/products">
                  Start Shopping
                </a>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-bold text-brand-brown">Order #{order.orderId}</h2>
                      <p className="text-sm text-gray-500">Placed on {new Date(order.orderDate).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div className="flex items-center bg-brand-cream rounded-full px-3 py-1">
                      <Truck className="w-4 h-4 mr-1 text-brand-terracotta" />
                      <span className="text-sm font-medium">Arriving by {new Date(order.deliveryDate).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <h3 className="font-medium mb-3">Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item: any, itemIndex: number) => (
                        <div key={itemIndex} className="flex items-center">
                          <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 mr-4">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-brand-brown">{item.product.name}</h4>
                            <p className="text-sm text-gray-500">Color: {item.color} • Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="font-medium mb-3">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₹{order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>{order.shippingMethod === 'express' ? 'Express Shipping' : 'Shipping'}</span>
                        <span>{order.shippingMethod === 'express' ? '₹150.00' : 'Free'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>₹{order.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-100">
                        <span>Total</span>
                        <span>₹{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <h3 className="font-medium mb-3">Shipping Details</h3>
                    <p className="text-sm text-gray-700">
                      {order.shipping.firstName} {order.shipping.lastName}<br />
                      {order.shipping.address1}<br />
                      {order.shipping.address2 && `${order.shipping.address2}<br />`}
                      {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}<br />
                      {order.shipping.country}<br />
                      {order.shipping.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrdersPage;
