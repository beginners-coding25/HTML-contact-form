import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation functions
  const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };

  const validateFullName = (name: string): string | undefined => {
    if (!name.trim()) return 'Full name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    if (name.trim().length > 50) return 'Name must be less than 50 characters';
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone) return undefined; // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) return 'Message is required';
    if (message.trim().length < 10) return 'Message must be at least 10 characters';
    if (message.trim().length > 500) return 'Message must be less than 500 characters';
    return undefined;
  };

  const validateForm = (): FormErrors => {
    return {
      fullName: validateFullName(formData.fullName),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      message: validateMessage(formData.message)
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      message: true
    });

    const formErrors = validateForm();
    setErrors(formErrors);

    // Check if there are any errors
    const hasErrors = Object.values(formErrors).some(error => error !== undefined);
    
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: ''
        });
        setErrors({});
        setTouched({});
      }, 4000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });

    // Validate field on blur
    let error: string | undefined;
    switch (name) {
      case 'fullName':
        error = validateFullName(formData.fullName);
        break;
      case 'email':
        error = validateEmail(formData.email);
        break;
      case 'phone':
        error = validatePhone(formData.phone);
        break;
      case 'message':
        error = validateMessage(formData.message);
        break;
    }

    setErrors({
      ...errors,
      [name]: error
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
              onBlur={handleBlur}
              placeholder="Enter your full name"
              className={`bg-form-input border-form-border focus:border-form-border-focus focus:ring-form-border-focus transition-all duration-200 ${
                touched.fullName && errors.fullName ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''
              }`}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              aria-invalid={touched.fullName && errors.fullName ? 'true' : 'false'}
            />
            {touched.fullName && errors.fullName && (
              <div className="flex items-center gap-2 text-sm text-destructive" id="fullName-error">
                <AlertCircle className="w-4 h-4" />
                {errors.fullName}
              </div>
            )}
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
              onBlur={handleBlur}
              placeholder="Enter your email address"
              className={`bg-form-input border-form-border focus:border-form-border-focus focus:ring-form-border-focus transition-all duration-200 ${
                touched.email && errors.email ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''
              }`}
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={touched.email && errors.email ? 'true' : 'false'}
            />
            {touched.email && errors.email && (
              <div className="flex items-center gap-2 text-sm text-destructive" id="email-error">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </div>
            )}
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
              onBlur={handleBlur}
              placeholder="Enter your phone number (optional)"
              className={`bg-form-input border-form-border focus:border-form-border-focus focus:ring-form-border-focus transition-all duration-200 ${
                touched.phone && errors.phone ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''
              }`}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              aria-invalid={touched.phone && errors.phone ? 'true' : 'false'}
            />
            {touched.phone && errors.phone && (
              <div className="flex items-center gap-2 text-sm text-destructive" id="phone-error">
                <AlertCircle className="w-4 h-4" />
                {errors.phone}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label 
              htmlFor="message" 
              className="text-sm font-medium text-form-label"
            >
              Message * <span className="text-xs text-form-label">({formData.message.length}/500)</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your message here..."
              className={`min-h-[120px] bg-form-input border-form-border focus:border-form-border-focus focus:ring-form-border-focus transition-all duration-200 resize-none ${
                touched.message && errors.message ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''
              }`}
              aria-describedby={errors.message ? "message-error" : undefined}
              aria-invalid={touched.message && errors.message ? 'true' : 'false'}
              maxLength={500}
            />
            {touched.message && errors.message && (
              <div className="flex items-center gap-2 text-sm text-destructive" id="message-error">
                <AlertCircle className="w-4 h-4" />
                {errors.message}
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:scale-[1.02] disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
            size="lg"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;