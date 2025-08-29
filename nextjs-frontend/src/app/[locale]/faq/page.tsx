
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function FAQPage() {
  const t = useTranslations('faq');

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is MorningAI?',
          answer: 'MorningAI is a comprehensive SaaS platform designed to manage, monitor, and optimize AI agents across your organization. It provides centralized control, real-time analytics, and automated billing for AI operations.'
        },
        {
          question: 'How does the multi-tenant architecture work?',
          answer: 'Our multi-tenant architecture provides secure isolation between different organizations or departments. Each tenant has its own data space, user management, and billing, while sharing the underlying infrastructure for cost efficiency.'
        },
        {
          question: 'What types of AI agents can I manage?',
          answer: 'MorningAI supports various types of AI agents including chatbots, data processing agents, machine learning models, and custom AI workflows. Our platform is designed to be agent-agnostic and can integrate with most AI frameworks.'
        }
      ]
    },
    {
      category: 'Pricing & Billing',
      questions: [
        {
          question: 'How does the pricing work?',
          answer: 'We offer flexible pricing based on the number of AI agents, usage volume, and features required. Our plans start from $29/month for small teams and scale up to enterprise solutions with custom pricing.'
        },
        {
          question: 'Is there a free trial?',
          answer: 'Yes, we offer a 14-day free trial for all plans. No credit card required to start. You can explore all features and see how MorningAI fits your needs before committing.'
        },
        {
          question: 'Can I change my plan anytime?',
          answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we provide prorated billing for upgrades.'
        }
      ]
    },
    {
      category: 'Security & Compliance',
      questions: [
        {
          question: 'How secure is my data?',
          answer: 'We implement enterprise-grade security including end-to-end encryption, SOC 2 compliance, and regular security audits. Your data is isolated in secure tenants with role-based access controls.'
        },
        {
          question: 'Do you support GDPR compliance?',
          answer: 'Yes, MorningAI is fully GDPR compliant. We provide data portability, right to deletion, and comprehensive audit trails. We also support HIPAA and other industry-specific compliance requirements.'
        },
        {
          question: 'Where is my data stored?',
          answer: 'Data is stored in secure, geographically distributed data centers. You can choose your preferred region for data residency to meet local compliance requirements.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'What APIs do you provide?',
          answer: 'We offer comprehensive RESTful APIs for all platform functions including agent management, monitoring, billing, and user management. We also provide webhooks for real-time notifications and SDKs for popular programming languages.'
        },
        {
          question: 'How do I integrate with existing systems?',
          answer: 'MorningAI provides multiple integration options including REST APIs, webhooks, and pre-built connectors for popular platforms. Our technical team can assist with custom integrations if needed.'
        },
        {
          question: 'What support do you offer?',
          answer: 'We provide 24/7 support for enterprise customers, priority support for professional plans, and email support for all users. We also offer comprehensive documentation, tutorials, and community forums.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-bg-primary to-bg-secondary">
      {/* Header */}
      <header className="border-b border-border-primary bg-bg-primary/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-text-primary">MorningAI</h1>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="hero text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Find answers to common questions about MorningAI's features, pricing, 
            security, and technical capabilities.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  {category.category}
                </h2>
                
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <Card key={faqIndex} className="group">
                      <CardHeader>
                        <CardTitle className="text-lg text-text-primary">
                          {faq.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-text-secondary leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 px-4 bg-bg-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Our support team is here to help you get the most out of MorningAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Contact Support
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
            <Button variant="ghost" size="lg">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

