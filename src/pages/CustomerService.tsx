import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Search, Truck, RotateCcw, ShieldCheck, MailIcon } from 'lucide-react';
import { toast } from "sonner";

const CustomerService = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setFormSubmitted(true);
    toast.success("Your message has been sent! We'll get back to you soon.");
  };
  
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      toast.info(`Tracking information for ${trackingNumber} will be sent to your email`);
    } else {
      toast.error("Please enter a valid tracking number");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Customer Service</h1>
          <p className="text-gray-600 mb-8">
            We're here to help with any questions or concerns you may have.
          </p>
          
          <Tabs defaultValue="contact">
            <TabsList className="mb-8">
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Delivery</TabsTrigger>
              <TabsTrigger value="returns">Returns & Exchanges</TabsTrigger>
              <TabsTrigger value="track">Track Order</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                  
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MailIcon className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                      <p className="text-gray-600 mb-4">
                        Your message has been sent successfully. Our team will get back to you within 24 hours.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setFormSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          rows={5} 
                          placeholder="How can we help you?" 
                          required 
                        />
                      </div>
                      
                      <Button type="submit" className="bg-brand-teal hover:bg-brand-teal/90">
                        Send Message
                      </Button>
                    </form>
                  )}
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-brand-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MailIcon className="h-5 w-5 text-brand-teal" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Email Us</h3>
                        <p className="text-gray-600 mb-1">For general inquiries:</p>
                        <a 
                          href="mailto:saakshamkindra@gmail.com" 
                          className="text-brand-teal hover:underline"
                        >
                          saakshamkindra@gmail.com
                        </a>
                        <p className="text-gray-600 mt-2 mb-1">For order support:</p>
                        <a 
                          href="mailto:saakshamkindra@gmail.com" 
                          className="text-brand-teal hover:underline"
                        >
                          saakshamkindra@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg 
                          className="h-5 w-5 text-brand-blue" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Call Us</h3>
                        <p className="text-gray-600 mb-1">Customer Service:</p>
                        <a 
                          href="tel:7417862083" 
                          className="text-brand-teal hover:underline"
                        >
                          7417862083
                        </a>
                        <p className="text-gray-600 text-sm mt-1">
                          Monday-Friday: 9am-6pm IST<br />
                          Saturday: 10am-4pm IST<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-brand-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg 
                          className="h-5 w-5 text-brand-purple" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Our Location</h3>
                        <p className="text-gray-600">
                          ASA Artisans Headquarters<br />
                          123 Hydration Avenue<br />
                          Tumblerville, CA 90210<br />
                          India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faq" id="faq">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="q1" className="border rounded-lg p-2">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      How long will my tumbler keep drinks hot or cold?
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 px-2 text-gray-600">
                      Our standard tumblers keep drinks cold for up to 24 hours and hot for up to 12 hours. 
                      Our premium Summit Series tumblers offer even better insulation, keeping drinks cold for 
                      up to 48 hours and hot for up to 24 hours. Actual times may vary based on external temperature conditions.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q2" className="border rounded-lg p-2">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      Are your tumblers dishwasher safe?
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 px-2 text-gray-600">
                      Most of our tumbler lids are dishwasher safe (top rack only). 
                      For the tumbler body, we recommend hand washing to preserve the finish and insulation properties. 
                      Use warm, soapy water and a non-abrasive sponge for best results.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q3" className="border rounded-lg p-2">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      What is your warranty policy?
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 px-2 text-gray-600">
                      All of our tumblers come with a limited lifetime warranty against manufacturing defects. 
                      This covers issues with insulation, seals, and materials under normal use. 
                      The warranty does not cover damage from drops, misuse, or normal wear and tear. 
                      If you believe your tumbler has a manufacturing defect, please contact our customer service team.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q4" className="border rounded-lg p-2">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      Can I put my tumbler in the freezer?
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 px-2 text-gray-600">
                      We do not recommend placing your tumbler in the freezer. Due to the vacuum insulation, 
                      freezing won't make your drinks any colder and could potentially damage the seal. 
                      Instead, fill your tumbler with ice before adding your cold beverage for optimal cooling.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q5" className="border rounded-lg p-2">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      How do I clean stains or odors from my tumbler?
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 px-2 text-gray-600">
                      For stubborn stains or odors, we recommend using a mixture of baking soda and water. 
                      Create a paste, apply it to the affected areas, let it sit for a few hours, then rinse thoroughly. 
                      For coffee or tea stains, a solution of vinegar and water can be effective. 
                      Always rinse thoroughly after cleaning.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="q6" className="border rounded-lg p-2">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline">
                      Are replacement lids available for purchase?
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 px-2 text-gray-600">
                      Yes, we offer replacement lids for all of our tumbler models. 
                      You can find them in the "Accessories" section of our website. 
                      Be sure to select the correct model and size when ordering a replacement lid.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">
                    Can't find the answer you're looking for?
                  </p>
                  <Button 
                    onClick={() => document.querySelector('[data-value="contact"]')?.dispatchEvent(new Event('click'))}
                    className="bg-brand-teal hover:bg-brand-teal/90"
                  >
                    Contact Our Support Team
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" id="shipping">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Shipping & Delivery</h2>
                
                <div className="space-y-8">
                  <div className="bg-gray-50 dark:bg-secondary p-6 rounded-lg">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Truck className="h-6 w-6 text-brand-teal" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Shipping Methods</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium">Standard Shipping</h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              Free for orders over ₹1,800, otherwise ₹99<br />
                              Delivery in 3-5 business days
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium">Express Shipping</h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              ₹150 for all orders<br />
                              Delivery in 1-2 business days
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium">International Shipping</h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              Available to select countries<br />
                              Rates and delivery times vary by location
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Shipping Policy Details</h3>
                    <div className="space-y-4">
                      <p>
                        All orders are processed within 1-2 business days. Orders placed after 12 PM ET 
                        may not be processed until the next business day. Business days are Monday through 
                        Friday, excluding federal holidays.
                      </p>
                      
                      <h4 className="font-medium">Order Tracking</h4>
                      <p>
                        Once your order ships, you will receive a shipping confirmation email with a tracking 
                        number. You can track your order by entering this number in the "Track Order" tab above 
                        or by clicking the tracking link in your shipping confirmation email.
                      </p>
                      
                      <h4 className="font-medium">Shipping Restrictions</h4>
                      <p>
                        We currently ship to all 50 United States, Canada, and select international destinations. 
                        Some restrictions may apply for international shipping due to customs regulations.
                      </p>
                      
                      <h4 className="font-medium">Delivery Issues</h4>
                      <p>
                        If there are any issues with your delivery (damaged package, missing items, etc.), 
                        please contact our customer service team within 7 days of receiving your order. 
                        We'll work with you to resolve any problems as quickly as possible.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="returns" id="returns">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Returns & Exchanges</h2>
                
                <div className="space-y-8">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <RotateCcw className="h-6 w-6 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Return Policy Highlights</h3>
                        <ul className="space-y-2 list-disc list-inside text-gray-600">
                          <li>30-day return window from date of delivery</li>
                          <li>Free returns for all orders within the United States</li>
                          <li>Products must be unused and in original packaging</li>
                          <li>Refunds processed to original payment method</li>
                          <li>Exchanges available for different colors or models</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <ShieldCheck className="h-6 w-6 text-brand-purple" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Warranty Information</h3>
                        <p className="text-gray-600 mb-3">
                          All VibeTumbler products come with a limited lifetime warranty against 
                          manufacturing defects, including:
                        </p>
                        <ul className="space-y-2 list-disc list-inside text-gray-600">
                          <li>Issues with vacuum insulation performance</li>
                          <li>Seal failures (not due to misuse)</li>
                          <li>Defects in materials or workmanship</li>
                        </ul>
                        <p className="text-gray-600 mt-3">
                          The warranty does not cover damage from drops, normal wear and tear, 
                          improper use, or cosmetic damage that doesn't affect function.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">How to Initiate a Return or Exchange</h3>
                    <ol className="space-y-4 list-decimal list-inside">
                      <li>
                        <span className="font-medium">Contact Customer Service</span>
                        <p className="ml-6 text-gray-600">
                          Email support@vibetumbler.com or call 1-800-TUMBLER (1-800-886-2537) to request a return authorization.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Receive Return Instructions</span>
                        <p className="ml-6 text-gray-600">
                          We'll email you a prepaid return shipping label (for US customers) and detailed instructions.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Package Your Return</span>
                        <p className="ml-6 text-gray-600">
                          Place the item(s) in the original packaging if possible, including all accessories.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Ship Your Return</span>
                        <p className="ml-6 text-gray-600">
                          Attach the shipping label to your package and drop it off at any authorized carrier location.
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Refund or Exchange Processing</span>
                        <p className="ml-6 text-gray-600">
                          Once we receive and inspect your return, refunds will be processed within 5-7 business days.
                          For exchanges, your new item will be shipped once the returned item is received.
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="track" id="track">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Track Your Order</h2>
                
                <div className="bg-gray-50 p-8 rounded-lg">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center">
                      <Search className="h-8 w-8 text-brand-teal" />
                    </div>
                  </div>
                  
                  <form onSubmit={handleTrackOrder} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tracking-number">Tracking Number or Order ID</Label>
                      <Input 
                        id="tracking-number" 
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Enter your tracking number or order ID"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-brand-teal hover:bg-brand-teal/90">
                      Track Order
                    </Button>
                  </form>
                  
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    You can find your tracking number in your shipping confirmation email.
                  </p>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">
                    Having trouble finding your order?
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => document.querySelector('[data-value="contact"]')?.dispatchEvent(new Event('click'))}
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomerService;
