
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LegalPage() {
  const t = useTranslations('legal');

  const legalSections = [
    {
      title: 'Terms of Service',
      lastUpdated: '2025-01-15',
      content: [
        {
          heading: 'Acceptance of Terms',
          text: 'By accessing and using MorningAI services, you accept and agree to be bound by the terms and provision of this agreement.'
        },
        {
          heading: 'Use License',
          text: 'Permission is granted to temporarily use MorningAI services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.'
        },
        {
          heading: 'Service Availability',
          text: 'We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be announced in advance.'
        },
        {
          heading: 'User Responsibilities',
          text: 'Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.'
        }
      ]
    },
    {
      title: 'Privacy Policy',
      lastUpdated: '2025-01-15',
      content: [
        {
          heading: 'Information We Collect',
          text: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.'
        },
        {
          heading: 'How We Use Your Information',
          text: 'We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.'
        },
        {
          heading: 'Information Sharing',
          text: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.'
        },
        {
          heading: 'Data Security',
          text: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        }
      ]
    },
    {
      title: 'Cookie Policy',
      lastUpdated: '2025-01-15',
      content: [
        {
          heading: 'What Are Cookies',
          text: 'Cookies are small text files that are placed on your computer or mobile device when you visit our website.'
        },
        {
          heading: 'How We Use Cookies',
          text: 'We use cookies to improve your experience on our website, analyze usage patterns, and provide personalized content.'
        },
        {
          heading: 'Types of Cookies',
          text: 'We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period).'
        },
        {
          heading: 'Managing Cookies',
          text: 'You can control and/or delete cookies as you wish through your browser settings. However, this may affect the functionality of our website.'
        }
      ]
    },
    {
      title: 'Data Processing Agreement',
      lastUpdated: '2025-01-15',
      content: [
        {
          heading: 'GDPR Compliance',
          text: 'We are committed to complying with the General Data Protection Regulation (GDPR) and other applicable data protection laws.'
        },
        {
          heading: 'Data Controller vs Processor',
          text: 'In most cases, you are the data controller and we are the data processor when you use our services to process personal data.'
        },
        {
          heading: 'Data Subject Rights',
          text: 'We support your compliance with data subject rights including access, rectification, erasure, and data portability.'
        },
        {
          heading: 'International Transfers',
          text: 'When we transfer personal data outside the EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses.'
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
            Legal Information
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Our commitment to transparency includes providing clear information about 
            our terms, privacy practices, and legal obligations.
          </p>
        </div>
      </section>

      {/* Legal Sections */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="space-y-12">
            {legalSections.map((section, sectionIndex) => (
              <Card key={sectionIndex} className="overflow-hidden">
                <CardHeader className="bg-bg-secondary">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-text-primary">
                        {section.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Last updated: {new Date(section.lastUpdated).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="text-lg font-semibold text-text-primary mb-3">
                          {item.heading}
                        </h3>
                        <p className="text-text-secondary leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-bg-secondary">
        <div className="container mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Legal Questions?</CardTitle>
              <CardDescription>
                If you have any questions about our legal policies or need clarification 
                on any terms, please don't hesitate to contact us.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-text-primary">Legal Department</h4>
                  <p className="text-text-secondary">legal@morningai.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">Data Protection Officer</h4>
                  <p className="text-text-secondary">dpo@morningai.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">Mailing Address</h4>
                  <p className="text-text-secondary">
                    MorningAI Inc.<br />
                    123 AI Street, Tech City, TC 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Compliance Badges */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-8">
            Compliance & Certifications
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-2">🔒</div>
              <div className="font-semibold text-text-primary">SOC 2 Type II</div>
              <div className="text-sm text-text-secondary">Security & Availability</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🇪🇺</div>
              <div className="font-semibold text-text-primary">GDPR Compliant</div>
              <div className="text-sm text-text-secondary">Data Protection</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏥</div>
              <div className="font-semibold text-text-primary">HIPAA Ready</div>
              <div className="text-sm text-text-secondary">Healthcare Data</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🛡️</div>
              <div className="font-semibold text-text-primary">ISO 27001</div>
              <div className="text-sm text-text-secondary">Information Security</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

