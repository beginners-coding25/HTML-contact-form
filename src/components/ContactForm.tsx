import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.message) {
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-success-background border-success">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-success mb-2">Message Sent Successfully!</h3>
          <p className="text-form-label">Thank you for your message. We'll get back to you soon.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-form-background border-form-border shadow-lg">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-3xl font-bold tracking-tight">Get In Touch</CardTitle>
        <CardDescription className="text-lg text-form-label mt-2">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="space-y-2">
            <Label 
              htmlFor="fullName" 
              className="text-sm font-medium text-form-label"
            >
              Full Name *
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="bg-form-input border-form-border focus:border-form-border-focus focus:ring-form-border-focus transition-all duration-200"
              aria-describedby="fullName-error"
            />
          </div>

          <div className="space-y-2">
            <Label 
              htmlFor="email" 
              className="text-sm font-medium text-form-label"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="bg-form-input border-form-border focus:border-form-border-focus focus:ring-form-border-focus transition-all duration-200"
              aria-describedby="email-error"
            />
          </div>

          <div className="space-y-2">
            <Label 
              htmlFor="phone" 
              className="text-sm font-medium text-form-label"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number (optional)"
              className="bg-form-input border-form-border focus:border-form-border-focus focus:ring-form-border-focus transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <Label 
              htmlFor="message" 
              className="text-sm font-medium text-form-label"
            >
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message here..."
              className="min-h-[120px] bg-form-input border-form-border focus:border-form-border-focus focus:ring-form-border-focus transition-all duration-200 resize-none"
              aria-describedby="message-error"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:scale-[1.02]"
            size="lg"
          >
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;