
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StarIcon } from 'lucide-react';
import { toast } from 'sonner';

const Feedbacks = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Check for logged in user
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setLoggedInUser(userData);
      setUserName(userData.firstName + ' ' + userData.lastName);
      setEmail(userData.email);
    }

    // Load any saved feedbacks
    const savedFeedbacks = localStorage.getItem('feedbacks');
    if (savedFeedbacks) {
      setFeedbacks(JSON.parse(savedFeedbacks));
    }
  }, []);

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userName || !email || !feedback) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const newFeedback = {
      id: Date.now(),
      name: userName,
      email,
      rating,
      feedback,
      date: new Date().toLocaleDateString()
    };
    
    const updatedFeedbacks = [...feedbacks, newFeedback];
    setFeedbacks(updatedFeedbacks);
    
    // Save to local storage
    localStorage.setItem('feedbacks', JSON.stringify(updatedFeedbacks));
    
    // Reset form
    setFeedback('');
    setRating(5);
    
    // Show successful submission message
    toast.success(`Thank you ${loggedInUser ? loggedInUser.firstName : userName.split(' ')[0]} for your feedback!`, {
      duration: 5000,
      style: {
        background: 'linear-gradient(to right, #F9FAFB, #F3F4F6)',
        border: '1px solid #E5E7EB',
        color: '#111827',
      },
      description: 'Your feedback helps us improve our products and services.',
      icon: '👍',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Customer Feedback</h1>
          <p className="text-gray-600 mb-8">
            We value your opinion! Share your thoughts on our products and services.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feedback Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Feedback</CardTitle>
                  <CardDescription>Tell us about your experience with our products</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        required 
                        readOnly={!!loggedInUser}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        readOnly={!!loggedInUser}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="focus:outline-none"
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            onClick={() => handleStarClick(star)}
                          >
                            <StarIcon 
                              className={`h-8 w-8 ${
                                (hoveredStar || rating) >= star 
                                  ? 'text-yellow-400 fill-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="feedback">Your Feedback</Label>
                      <Textarea
                        id="feedback"
                        rows={5}
                        placeholder="Tell us what you liked or what we could improve..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-brand-terracotta hover:bg-brand-terracotta/90">
                      Submit Feedback
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Feedbacks */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Recent Feedbacks</h2>
              
              {feedbacks.length > 0 ? (
                <div className="space-y-4">
                  {feedbacks.slice().reverse().slice(0, 5).map((item) => (
                    <Card key={item.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <CardDescription>{item.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{item.feedback}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No feedbacks yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Feedbacks;
