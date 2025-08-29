
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function CasesPage() {
  const t = useTranslations('cases');

  const cases = [
    {
      company: 'TechCorp Solutions',
      industry: 'Technology',
      challenge: 'Managing 50+ AI agents across multiple departments with inconsistent monitoring.',
      solution: 'Implemented MorningAI\'s centralized agent management with real-time analytics.',
      results: '75% reduction in agent downtime, 40% cost savings through optimization.',
      metrics: {
        agents: '50+',
        savings: '40%',
        uptime: '99.9%'
      }
    },
    {
      company: 'Global Finance Inc',
      industry: 'Financial Services',
      challenge: 'Complex multi-tenant requirements with strict compliance and security needs.',
      solution: 'Deployed enterprise-grade RBAC with audit trails and compliance reporting.',
      results: 'Achieved SOC 2 compliance, reduced security incidents by 90%.',
      metrics: {
        tenants: '25',
        compliance: '100%',
        incidents: '-90%'
      }
    },
    {
      company: 'Healthcare Innovations',
      industry: 'Healthcare',
      challenge: 'Scaling AI-powered patient analysis while maintaining data privacy.',
      solution: 'Leveraged secure multi-tenant architecture with HIPAA-compliant data handling.',
      results: 'Processed 1M+ patient records, maintained 100% privacy compliance.',
      metrics: {
        records: '1M+',
        privacy: '100%',
        speed: '10x'
      }
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
            Success Stories from Our Customers
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            See how organizations across industries are transforming their AI operations 
            with MorningAI's comprehensive platform.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="space-y-12">
            {cases.map((caseStudy, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid lg:grid-cols-3 gap-8 p-8">
                  {/* Company Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary mb-2">
                        {caseStudy.company}
                      </h3>
                      <Badge variant="outline">{caseStudy.industry}</Badge>
                    </div>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(caseStudy.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-primary">{value}</div>
                          <div className="text-sm text-text-tertiary capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-text-primary mb-2">Challenge</h4>
                      <p className="text-text-secondary">{caseStudy.challenge}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-text-primary mb-2">Solution</h4>
                      <p className="text-text-secondary">{caseStudy.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-text-primary mb-2">Results</h4>
                      <p className="text-text-secondary">{caseStudy.results}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-bg-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-12">
            Trusted by Industry Leaders
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-text-secondary">Organizations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-text-secondary">AI Agents Managed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-text-secondary">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
              <div className="text-text-secondary">Cost Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Join these industry leaders and transform your AI operations today.
          </p>
          <Button size="lg" className="mr-4">
            Start Your Journey
          </Button>
          <Button variant="outline" size="lg">
            Schedule Demo
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

