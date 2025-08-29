
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

type Props = {
  params: { locale: string };
};

export default function PricingPage({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale);
  
  const t = useTranslations();

  const plans = [
    {
      name: t('pricing.plans.starter.name'),
      price: t('pricing.plans.starter.price'),
      period: t('pricing.plans.starter.period'),
      description: t('pricing.plans.starter.description'),
      features: [
        t('pricing.plans.starter.features.0'),
        t('pricing.plans.starter.features.1'),
        t('pricing.plans.starter.features.2'),
        t('pricing.plans.starter.features.3'),
      ],
      cta: t('pricing.plans.starter.cta'),
      popular: false,
    },
    {
      name: t('pricing.plans.professional.name'),
      price: t('pricing.plans.professional.price'),
      period: t('pricing.plans.professional.period'),
      description: t('pricing.plans.professional.description'),
      features: [
        t('pricing.plans.professional.features.0'),
        t('pricing.plans.professional.features.1'),
        t('pricing.plans.professional.features.2'),
        t('pricing.plans.professional.features.3'),
        t('pricing.plans.professional.features.4'),
      ],
      cta: t('pricing.plans.professional.cta'),
      popular: true,
    },
    {
      name: t('pricing.plans.enterprise.name'),
      price: t('pricing.plans.enterprise.price'),
      period: t('pricing.plans.enterprise.period'),
      description: t('pricing.plans.enterprise.description'),
      features: [
        t('pricing.plans.enterprise.features.0'),
        t('pricing.plans.enterprise.features.1'),
        t('pricing.plans.enterprise.features.2'),
        t('pricing.plans.enterprise.features.3'),
        t('pricing.plans.enterprise.features.4'),
      ],
      cta: t('pricing.plans.enterprise.cta'),
      popular: false,
    },
  ];

  const faqs = [
    {
      question: t('pricing.faq.questions.0.question'),
      answer: t('pricing.faq.questions.0.answer'),
    },
    {
      question: t('pricing.faq.questions.1.question'),
      answer: t('pricing.faq.questions.1.answer'),
    },
    {
      question: t('pricing.faq.questions.2.question'),
      answer: t('pricing.faq.questions.2.answer'),
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            {t('pricing.subtitle')}
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className="text-text-secondary">{t('pricing.monthly')}</span>
            <div className="relative">
              <input
                type="checkbox"
                id="billing-toggle"
                className="sr-only"
              />
              <label
                htmlFor="billing-toggle"
                className="flex items-center cursor-pointer"
              >
                <div className="relative">
                  <div className="block bg-secondary-300 w-14 h-8 rounded-full"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                </div>
              </label>
            </div>
            <span className="text-text-secondary">{t('pricing.yearly')}</span>
            <Badge variant="secondary" className="ml-2">
              {t('pricing.save')}
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative transition-all duration-normal hover:shadow-lg ${
                plan.popular ? 'border-primary-500 shadow-lg scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary-600 text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {t('pricing.plans.professional.popular')}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                  <span className="text-text-secondary">{plan.period}</span>
                </div>
                <CardDescription className="mt-4">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {t('pricing.faq.title')}
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="transition-all duration-normal hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

