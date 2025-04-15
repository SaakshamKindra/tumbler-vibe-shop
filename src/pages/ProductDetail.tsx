
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useProducts } from '@/contexts/ProductsContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Heart, Star, ChevronRight, CircleCheck, Truck } from 'lucide-react';
import ProductQuantity from '@/components/ui/ProductQuantity';
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id, 10) : 0;
  const { getProduct, products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const product = getProduct(numericId);
  
  const defaultColor = product?.colors.find(color => color.available)?.name || product?.colors[0]?.name || '';
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6 text-gray-600">
            Sorry, the product you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            onClick={() => navigate('/products')}
            className="bg-brand-teal hover:bg-brand-teal/90"
          >
            Browse All Products
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity, defaultColor);
  };
  
  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(prev => !prev);
    
    if (!isLiked) {
      toast.success("Added to liked products", {
        position: "top-right",
        style: { background: '#fff9f3', border: '1px solid #ffcdb2', color: '#e07a5f' },
        icon: <Heart className="h-5 w-5 text-red-600 fill-red-600" />,
      });
    } else {
      toast.info("Removed from liked products", {
        position: "top-right",
        style: { background: '#f5f7fa', border: '1px solid #e2e8f0', color: '#64748b' },
        icon: <Heart className="h-5 w-5" />,
      });
    }
  };
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-500 mb-8">
            <a href="/" className="hover:text-brand-teal transition-colors">Home</a>
            <ChevronRight className="h-3 w-3 inline mx-1" />
            <a href="/products" className="hover:text-brand-teal transition-colors">Shop</a>
            <ChevronRight className="h-3 w-3 inline mx-1" />
            <a href={`/products?category=${product.category}`} className="hover:text-brand-teal transition-colors">
              {product.category}
            </a>
            <ChevronRight className="h-3 w-3 inline mx-1" />
            <span className="text-gray-700">{product.name}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="bg-gray-50 rounded-xl overflow-hidden mb-4">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                      index === activeImageIndex ? 'border-brand-teal' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                {product.isNew && (
                  <span className="inline-block bg-brand-purple text-white text-xs font-bold px-2 py-1 rounded mr-2">
                    NEW
                  </span>
                )}
                {product.bestSeller && (
                  <span className="inline-block bg-brand-teal text-white text-xs font-bold px-2 py-1 rounded">
                    BESTSELLER
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{product.price.toFixed(2)}
                </span>
                
                <div className="flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">{product.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="sm:w-1/3">
                  <h3 className="font-semibold mb-2">Quantity</h3>
                  <ProductQuantity
                    quantity={quantity}
                    onDecrease={() => setQuantity(prev => Math.max(1, prev - 1))}
                    onIncrease={() => setQuantity(prev => Math.min(product?.inventory || 0, prev + 1))}
                    onChange={setQuantity}
                    max={product?.inventory || 0}
                  />
                </div>
                
                <div className="sm:w-2/3">
                  <h3 className="font-semibold mb-2">Total: ₹{product ? (product.price * quantity).toFixed(2) : '0.00'}</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart()}
                      className="flex-grow bg-brand-teal hover:bg-brand-teal/90 text-white"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className={`border-gray-300 transition-all duration-300 ${isLiked ? 'scale-110' : ''}`}
                      aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                      onClick={handleToggleLike}
                    >
                      <Heart 
                        className={`h-4 w-4 transition-colors duration-300 ${
                          isLiked ? 'text-red-600 fill-red-600' : 'text-gray-400'
                        }`} 
                      />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-8">
                <div className="flex items-center text-sm text-gray-600">
                  <CircleCheck className="h-4 w-4 text-green-500 mr-2" />
                  <span>In stock: {product.inventory} units available</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Free shipping on orders over ₹1,800</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CircleCheck className="h-4 w-4 text-gray-500 mr-2" />
                  <span>30-day easy returns</span>
                </div>
              </div>
              
              <Tabs defaultValue="features">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
                </TabsList>
                
                <TabsContent value="features" className="pt-4">
                  <ul className="space-y-2">
                    {product.features && product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CircleCheck className="h-5 w-5 text-brand-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {(!product.features || product.features.length === 0) && (
                      <li className="text-gray-500">No features available for this product.</li>
                    )}
                  </ul>
                </TabsContent>
                
                <TabsContent value="specifications" className="pt-4">
                  <div className="space-y-2">
                    {product.specifications.capacity && (
                      <div className="grid grid-cols-2 border-b border-gray-100 py-2">
                        <span className="font-medium text-gray-600">Capacity</span>
                        <span>{product.specifications.capacity}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 border-b border-gray-100 py-2">
                      <span className="font-medium text-gray-600">Material</span>
                      <span>{product.specifications.material}</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 py-2">
                      <span className="font-medium text-gray-600">Dimensions</span>
                      <span>{product.specifications.dimensions}</span>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-100 py-2">
                      <span className="font-medium text-gray-600">Weight</span>
                      <span>{product.specifications.weight}</span>
                    </div>
                    {product.specifications.insulation && (
                      <div className="grid grid-cols-2 border-b border-gray-100 py-2">
                        <span className="font-medium text-gray-600">Insulation</span>
                        <span>{product.specifications.insulation}</span>
                      </div>
                    )}
                    {product.specifications.lidType && (
                      <div className="grid grid-cols-2 border-b border-gray-100 py-2">
                        <span className="font-medium text-gray-600">Lid Type</span>
                        <span>{product.specifications.lidType}</span>
                      </div>
                    )}
                    {product.specifications.display && (
                      <div className="grid grid-cols-2 border-b border-gray-100 py-2">
                        <span className="font-medium text-gray-600">Display</span>
                        <span>{product.specifications.display}</span>
                      </div>
                    )}
                    {product.specifications.batteryLife && (
                      <div className="grid grid-cols-2 border-b border-gray-100 py-2">
                        <span className="font-medium text-gray-600">Battery Life</span>
                        <span>{product.specifications.batteryLife}</span>
                      </div>
                    )}
                    {product.specifications.waterResistance && (
                      <div className="grid grid-cols-2 border-b border-gray-100 py-2">
                        <span className="font-medium text-gray-600">Water Resistance</span>
                        <span>{product.specifications.waterResistance}</span>
                      </div>
                    )}
                    {product.specifications.connectivity && (
                      <div className="grid grid-cols-2 border-b border-gray-100 py-2">
                        <span className="font-medium text-gray-600">Connectivity</span>
                        <span>{product.specifications.connectivity}</span>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="shipping" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">Shipping Information</h4>
                      <p className="text-gray-600 text-sm">
                        We offer free standard shipping on all orders over ₹1,800. Orders under ₹1,800 have a flat shipping rate of ₹99. 
                        Standard shipping typically takes 3-5 business days. Express shipping is available for ₹150 and takes 1-2 business days.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-1">Return Policy</h4>
                      <p className="text-gray-600 text-sm">
                        We stand behind our products with a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, 
                        you can return it within 30 days for a full refund or exchange. Items must be unused and in their original packaging.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-1">Warranty</h4>
                      <p className="text-gray-600 text-sm">
                        All of our tumblers come with a limited 1-year warranty against manufacturing defects. 
                        This warranty does not cover damage from normal wear and tear or misuse.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {relatedProducts.length > 0 && (
            <div className="my-16">
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <div 
                    key={relatedProduct.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <a href={`/product/${relatedProduct.id}`}>
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-40 object-cover mb-4 rounded"
                      />
                      <h3 className="font-semibold text-gray-800 mb-1">{relatedProduct.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">₹{relatedProduct.price.toFixed(2)}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-gray-500 ml-1">{relatedProduct.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
