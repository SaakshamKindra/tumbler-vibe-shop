
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { User, Package, Heart, CreditCard, Settings, Mail, Lock } from 'lucide-react';
import { toast } from "sonner";

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    toast.success("Successfully logged in!");
    setIsLoggedIn(true);
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup
    toast.success("Account created successfully!");
    setIsLoggedIn(true);
  };
  
  const handleSignout = () => {
    // Simulate logout
    toast.info("You have been logged out");
    setIsLoggedIn(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">
            {isLoggedIn ? 'My Account' : 'Account'}
          </h1>
          
          {isLoggedIn ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-500" />
                    </div>
                    <CardTitle>John Doe</CardTitle>
                    <CardDescription>john.doe@example.com</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="orders" className="w-full">
                      <TabsList className="grid grid-cols-1 w-full">
                        <TabsTrigger value="orders" className="flex items-center justify-start pl-2 mb-1">
                          <Package className="h-4 w-4 mr-2" /> Orders
                        </TabsTrigger>
                        <TabsTrigger value="wishlist" className="flex items-center justify-start pl-2 mb-1">
                          <Heart className="h-4 w-4 mr-2" /> Wishlist
                        </TabsTrigger>
                        <TabsTrigger value="addresses" className="flex items-center justify-start pl-2 mb-1">
                          <CreditCard className="h-4 w-4 mr-2" /> Addresses
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center justify-start pl-2 mb-1">
                          <Settings className="h-4 w-4 mr-2" /> Account Settings
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Button 
                      variant="outline" 
                      className="w-full mt-6"
                      onClick={handleSignout}
                    >
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="orders">
                  <TabsContent value="orders">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Orders</CardTitle>
                        <CardDescription>
                          View and track your recent orders
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-12">
                          <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-semibold">No orders yet</h3>
                          <p className="text-gray-500 mb-4">
                            You haven't placed any orders yet.
                          </p>
                          <Button asChild>
                            <a href="/products">Start Shopping</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="wishlist">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Wishlist</CardTitle>
                        <CardDescription>
                          Products you've saved for later
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-12">
                          <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
                          <p className="text-gray-500 mb-4">
                            Save your favorite products for later.
                          </p>
                          <Button asChild>
                            <a href="/products">Explore Products</a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="addresses">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Addresses</CardTitle>
                        <CardDescription>
                          Manage your saved addresses
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-12">
                          <CreditCard className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-semibold">No addresses saved</h3>
                          <p className="text-gray-500 mb-4">
                            Add addresses to make checkout faster.
                          </p>
                          <Button>Add New Address</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>
                          Update your personal information and preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center">
                              <Mail className="h-5 w-5 mr-2" /> Email Preferences
                            </h3>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id="email-orders"
                                  className="mr-2"
                                  defaultChecked
                                />
                                <Label htmlFor="email-orders">Order confirmations and updates</Label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id="email-promos"
                                  className="mr-2"
                                  defaultChecked
                                />
                                <Label htmlFor="email-promos">Promotions and new products</Label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id="email-feedback"
                                  className="mr-2"
                                  defaultChecked
                                />
                                <Label htmlFor="email-feedback">Product review requests</Label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center">
                              <Lock className="h-5 w-5 mr-2" /> Password
                            </h3>
                            <Button variant="outline">Change Password</Button>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-lg mb-4">Account Actions</h3>
                            <Button variant="destructive">Delete Account</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <Tabs defaultValue="login">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Card>
                    <CardHeader>
                      <CardTitle>Login to Your Account</CardTitle>
                      <CardDescription>
                        Enter your email and password to access your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="yourname@example.com" required />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="password">Password</Label>
                              <a href="#" className="text-xs text-brand-teal hover:underline">
                                Forgot password?
                              </a>
                            </div>
                            <Input id="password" type="password" required />
                          </div>
                          <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal/90">
                            Login
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="signup">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create an Account</CardTitle>
                      <CardDescription>
                        Sign up to track orders and save your favorite products
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSignup}>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="first-name">First Name</Label>
                              <Input id="first-name" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="last-name">Last Name</Label>
                              <Input id="last-name" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-email">Email</Label>
                            <Input id="signup-email" type="email" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-password">Password</Label>
                            <Input id="signup-password" type="password" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" required />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="terms" className="rounded" required />
                            <label htmlFor="terms" className="text-sm text-gray-500">
                              I agree to the{' '}
                              <a href="/terms-of-service" className="text-brand-teal hover:underline">Terms of Service</a>
                              {' '}and{' '}
                              <a href="/privacy-policy" className="text-brand-teal hover:underline">Privacy Policy</a>
                            </label>
                          </div>
                          <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal/90">
                            Create Account
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
