
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function FeaturesPage() {
  const t = useTranslations('features');

  const features = [
    {
      title: 'AI Agent Management',
      description: 'Centralized control for all your AI agents with real-time monitoring and performance analytics.',
      category: 'Core',
      icon: '🤖'
    },
    {
      title: 'Multi-tenant Architecture',
      description: 'Secure isolation for multiple organizations with customizable permissions and billing.',
      category: 'Enterprise',
      icon: '🏢'
    },
    {
      title: 'Real-time Analytics',
      description: 'Comprehensive dashboards with usage metrics, cost tracking, and performance insights.',
      category: 'Analytics',
      icon: '📊'
    },
    {
      title: 'API Integration',
      description: 'RESTful APIs and webhooks for seamless integration with your existing systems.',
      category: 'Integration',
      icon: '🔗'
    },
    {
      title: 'Role-based Access Control',
      description: 'Granular permissions system with admin, manager, and guest roles.',
      category: 'Security',
      icon: '🔐'
    },
    {
      title: 'Billing & Usage Tracking',
      description: 'Automated billing with detailed usage reports and cost optimization recommendations.',
      category: 'Finance',
      icon: '💰'
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
            Powerful Features for Modern AI Workflows
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Discover the comprehensive suite of tools designed to streamline your AI operations, 
            from agent management to billing automation.
          </p>
          <Button size="lg" className="mr-4">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Everything You Need to Scale AI
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Our platform provides all the essential tools and features to manage, 
              monitor, and optimize your AI infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-normal">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl">{feature.icon}</div>
                    <Badge variant="secondary">{feature.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your AI Operations?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of organizations already using MorningAI to scale their AI initiatives.
          </p>
          <Button size="lg" variant="secondary">
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

