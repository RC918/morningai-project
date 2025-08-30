'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.info.address.title'),
      value: t('contact.info.address.value'),
    },
    {
      icon: Phone,
      title: t('contact.info.phone.title'),
      value: t('contact.info.phone.value'),
    },
    {
      icon: Mail,
      title: t('contact.info.email.title'),
      value: t('contact.info.email.value'),
    },
    {
      icon: Clock,
      title: t('contact.info.hours.title'),
      value: t('contact.info.hours.value'),
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-text-secondary">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="transition-all duration-normal hover:shadow-lg">
            <CardHeader>
              <CardTitle>{t('contact.form.title') || 'Send us a message'}</CardTitle>
              <CardDescription>
                {t('contact.form.description') || 'Fill out the form below and we\'ll get back to you soon.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('contact.form.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-normal focus:ring-2 focus:ring-border-focus"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('contact.form.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-normal focus:ring-2 focus:ring-border-focus"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">{t('contact.form.company')}</Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="transition-all duration-normal focus:ring-2 focus:ring-border-focus"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="transition-all duration-normal focus:ring-2 focus:ring-border-focus"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">{t('contact.form.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="transition-all duration-normal focus:ring-2 focus:ring-border-focus resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </Button>
                
                {submitStatus === 'success' && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-md">
                    <p className="text-success text-sm">{t('contact.form.success')}</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-error/10 border border-error/20 rounded-md">
                    <p className="text-error text-sm">{t('contact.form.error')}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                {t('contact.info.title') || 'Contact Information'}
              </h2>
              <p className="text-text-secondary mb-8">
                {t('contact.info.description') || 'Get in touch with us through any of these channels.'}
              </p>
            </div>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="transition-all duration-normal hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary mb-1">
                          {info.title}
                        </h3>
                        <p className="text-text-secondary">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

