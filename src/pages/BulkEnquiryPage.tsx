
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const BulkEnquiryPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    orderType: '',
    quantity: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, orderType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Enquiry Submitted",
        description: "We've received your enquiry and will get back to you soon.",
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        orderType: '',
        quantity: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">Bulk Enquiry</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">Our Bulk Order Services</h2>
            <p className="text-muted-foreground mb-6">
              At Aromas of Kannauj, we offer special pricing and services for bulk orders. Whether you're planning a corporate event, wedding favors, or retail distribution, we have solutions to meet your needs.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="mr-4 bg-primary/10 p-3 rounded-full text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div>
                  <h3 className="font-medium">Corporate Gifting</h3>
                  <p className="text-sm text-muted-foreground">Impress clients and reward employees with premium fragrance gifts.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-primary/10 p-3 rounded-full text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
                </div>
                <div>
                  <h3 className="font-medium">Wholesale Distribution</h3>
                  <p className="text-sm text-muted-foreground">Partner with us to retail our premium fragrances in your store.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-primary/10 p-3 rounded-full text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <h3 className="font-medium">Event Planning</h3>
                  <p className="text-sm text-muted-foreground">Create memorable wedding favors or event gifts with custom fragrances.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 bg-primary/10 p-3 rounded-full text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                </div>
                <div>
                  <h3 className="font-medium">Custom Branding</h3>
                  <p className="text-sm text-muted-foreground">Add your logo or custom message to create bespoke branded gifts.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 p-6 rounded-lg">
              <h3 className="font-medium mb-2">Bulk Order Benefits</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Volume discounts starting at orders of 10+ units
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Custom packaging and branding options
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Dedicated account manager for large orders
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Sample testing before full order commitment
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium mb-6">Submit Your Enquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Your Name" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Your Email" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="Your Phone Number" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">Company/Organization</label>
                <Input 
                  id="company" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  placeholder="Your Company or Organization" 
                />
              </div>
              
              <div>
                <label htmlFor="orderType" className="block text-sm font-medium mb-1">Order Type</label>
                <Select value={formData.orderType} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select order type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate Gifting</SelectItem>
                    <SelectItem value="wholesale">Wholesale/Retail</SelectItem>
                    <SelectItem value="wedding">Wedding Favors</SelectItem>
                    <SelectItem value="event">Event Gifts</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium mb-1">Estimated Quantity</label>
                <Input 
                  id="quantity" 
                  name="quantity" 
                  value={formData.quantity} 
                  onChange={handleChange} 
                  placeholder="Approximate number of units" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Additional Information</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Please share details about your requirements, timeline, and any other information that might help us assist you better." 
                  rows={4} 
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                A member of our team will contact you within 1-2 business days to discuss your requirements.
              </p>
            </form>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <h2 className="text-2xl font-serif font-bold mb-4">Prefer to talk?</h2>
          <p className="text-muted-foreground mb-6">
            Contact our bulk order specialists directly:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:+91-7310826966" className="inline-flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 px-6 py-3 rounded-md transition-colors">
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +91-7310826966
            </a>
            <a href="mailto:bulk@aromasofkannauj.com" className="inline-flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 px-6 py-3 rounded-md transition-colors">
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              bulk@aromasofkannauj.com
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BulkEnquiryPage;
