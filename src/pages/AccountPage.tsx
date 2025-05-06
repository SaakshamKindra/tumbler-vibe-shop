
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SignOutDialog from '@/components/account/SignOutDialog';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, Package, Heart, CreditCard, Settings, Mail, Lock, LogOut } from 'lucide-react';
import { toast } from "sonner";

const AccountPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  
  useEffect(() => {
    // Check if user is logged in from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setFirstName(parsedData.firstName);
      setLastName(parsedData.lastName);
      setEmail(parsedData.email);
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const emailInput = (document.getElementById('email') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('password') as HTMLInputElement).value;
    
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.email === emailInput) {
        toast.success("Successfully logged in!");
        setFirstName(parsedData.firstName);
        setLastName(parsedData.lastName);
        setEmail(parsedData.email);
        setIsLoggedIn(true);
      } else {
        toast.error("Invalid email or password");
      }
    } else {
      toast.error("No account found. Please sign up.");
    }
  };
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const firstNameInput = (document.getElementById('first-name') as HTMLInputElement).value;
    const lastNameInput = (document.getElementById('last-name') as HTMLInputElement).value;
    const emailInput = (document.getElementById('signup-email') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('signup-password') as HTMLInputElement).value;
    const confirmPasswordInput = (document.getElementById('confirm-password') as HTMLInputElement).value;
    
    if (passwordInput !== confirmPasswordInput) {
      toast.error("Passwords do not match!");
      return;
    }
    
    const userData = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      email: emailInput,
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    setFirstName(firstNameInput);
    setLastName(lastNameInput);
    setEmail(emailInput);
    
    toast.success("Account created successfully!");
    setIsLoggedIn(true);
    
    setShowWelcomeDialog(true);
  };
  
  const handleSignout = () => {
    // Don't actually remove user data, just notify and hide account content
    toast.info("You have been logged out");
    setIsLoggedIn(false);
    setShowSignOutDialog(false);
  };

  const navigateToTab = (tab: string) => {
    if (tab === 'orders') {
      navigate('/empty-orders');
    } else if (tab === 'wishlist') {
      navigate('/wishlist');
    } else {
      setActiveTab(tab);
    }
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
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-500" />
                    </div>
                    <CardTitle>{firstName} {lastName}</CardTitle>
                    <CardDescription>{email}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 py-4">
                    <Tabs 
                      defaultValue={activeTab} 
                      value={activeTab}
                      onValueChange={navigateToTab}
                      className="w-full"
                    >
                      <div className="flex flex-col space-y-1 w-full">
                        <Button 
                          variant="ghost" 
                          className="justify-start pl-3 font-normal"
                          onClick={() => navigateToTab('orders')}
                        >
                          <Package className="h-4 w-4 mr-2" /> Orders
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          className="justify-start pl-3 font-normal"
                          onClick={() => navigateToTab('wishlist')}
                        >
                          <Heart className="h-4 w-4 mr-2" /> Wishlist
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          className="justify-start pl-3 font-normal"
                          onClick={() => navigateToTab('settings')}
                        >
                          <Settings className="h-4 w-4 mr-2" /> Account Settings
                        </Button>

                        <Button 
                          variant="ghost" 
                          className="justify-start pl-3 font-normal text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => setShowSignOutDialog(true)}
                        >
                          <LogOut className="h-4 w-4 mr-2" /> Sign Out
                        </Button>
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-3">
                <Tabs value={activeTab}>
                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>
                          Update your personal information and preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-8">
                          <div>
                            <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="setting-first-name">First Name</Label>
                                <Input id="setting-first-name" defaultValue={firstName} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="setting-last-name">Last Name</Label>
                                <Input id="setting-last-name" defaultValue={lastName} />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="setting-email">Email</Label>
                                <Input id="setting-email" type="email" defaultValue={email} />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="setting-phone">Phone Number</Label>
                                <Input id="setting-phone" placeholder="Enter your phone number" />
                              </div>
                            </div>
                            <Button className="mt-4 bg-brand-terracotta hover:bg-brand-terracotta/90">
                              Save Changes
                            </Button>
                          </div>
                          
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
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="confirm-new-password">Confirm New Password</Label>
                                <Input id="confirm-new-password" type="password" />
                              </div>
                              <Button variant="outline">Change Password</Button>
                            </div>
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
                              <a href="#" className="text-xs text-brand-terracotta hover:underline">
                                Forgot password?
                              </a>
                            </div>
                            <Input id="password" type="password" required />
                          </div>
                          <Button type="submit" className="w-full bg-brand-terracotta hover:bg-brand-terracotta/90">
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
                              <a href="/terms-of-service" className="text-brand-terracotta hover:underline">Terms of Service</a>
                              {' '}and{' '}
                              <a href="/privacy-policy" className="text-brand-terracotta hover:underline">Privacy Policy</a>
                            </label>
                          </div>
                          <Button type="submit" className="w-full bg-brand-terracotta hover:bg-brand-terracotta/90">
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
      
      <Dialog open={showWelcomeDialog} onOpenChange={setShowWelcomeDialog}>
        <DialogContent className="bg-gradient-to-br from-brand-terracotta/20 to-brand-blue/10 border-4 border-white/70">
          <DialogHeader>
            <DialogTitle className="text-3xl font-display text-center mb-2">
              <span className="bg-gradient-to-r from-brand-terracotta to-brand-blue text-gradient">
                Welcome, {firstName}!
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-xl text-brand-brown mb-4">
              Thanks for joining ASA artisans!
            </p>
            <p className="text-brand-brown/80 mb-6">
              We're thrilled to have you as part of our community. 
              Explore our collection and find your perfect tumbler.
            </p>
            <Button 
              onClick={() => setShowWelcomeDialog(false)}
              className="bg-brand-terracotta hover:bg-brand-terracotta/90"
            >
              Start Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign Out Confirmation Dialog */}
      <SignOutDialog 
        open={showSignOutDialog}
        onOpenChange={setShowSignOutDialog}
        onConfirm={handleSignout}
      />
    </div>
  );
};

export default AccountPage;
