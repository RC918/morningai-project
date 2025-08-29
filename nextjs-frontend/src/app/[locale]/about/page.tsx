
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function AboutPage() {
  const t = useTranslations('about');

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-founder',
      bio: 'Former AI researcher at Google with 10+ years in machine learning and enterprise software.',
      image: '👩‍💼'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-founder',
      bio: 'Ex-Microsoft architect specializing in distributed systems and cloud infrastructure.',
      image: '👨‍💻'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Head of AI Research',
      bio: 'PhD in Computer Science from Stanford, published researcher in AI safety and ethics.',
      image: '👩‍🔬'
    },
    {
      name: 'David Kim',
      role: 'VP of Engineering',
      bio: 'Former tech lead at Amazon, expert in scalable systems and DevOps practices.',
      image: '👨‍🔧'
    }
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI technology, always staying ahead of the curve.',
      icon: '🚀'
    },
    {
      title: 'Security by Design',
      description: 'Every feature is built with security and privacy as fundamental requirements, not afterthoughts.',
      icon: '🔒'
    },
    {
      title: 'Customer Success',
      description: 'Our success is measured by our customers\' success. We\'re committed to their growth and achievement.',
      icon: '🎯'
    },
    {
      title: 'Transparency',
      description: 'We believe in open communication, clear pricing, and honest relationships with all stakeholders.',
      icon: '💎'
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
            Building the Future of AI Operations
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            We're on a mission to democratize AI by making it easier for organizations 
            to deploy, manage, and scale their artificial intelligence initiatives.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-6">Our Mission</h2>
              <p className="text-lg text-text-secondary mb-6">
                At MorningAI, we believe that artificial intelligence should be accessible, 
                manageable, and beneficial for organizations of all sizes. Our platform 
                removes the complexity from AI operations, allowing teams to focus on 
                innovation rather than infrastructure.
              </p>
              <p className="text-lg text-text-secondary mb-6">
                Founded in 2023 by a team of AI researchers and enterprise software veterans, 
                we've built MorningAI to address the real challenges organizations face when 
                scaling their AI initiatives.
              </p>
              <Button size="lg">
                Learn More About Our Vision
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
              <div className="text-6xl mb-4">🌅</div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Why "MorningAI"?</h3>
              <p className="text-text-secondary">
                Just as the morning brings new possibilities and fresh starts, 
                we believe AI represents a new dawn for how organizations operate. 
                MorningAI is your partner in embracing this new day of intelligent automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-bg-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Our Values</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              These core principles guide everything we do, from product development 
              to customer relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-2">{value.icon}</div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Meet Our Team</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Our diverse team brings together expertise from leading tech companies, 
              research institutions, and successful startups.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.image}</div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90">
              Numbers that reflect our commitment to customer success
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="opacity-90">Organizations Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="opacity-90">AI Agents Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="opacity-90">Platform Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$50M+</div>
              <div className="opacity-90">Customer Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Join Us on This Journey
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Whether you're looking to transform your AI operations or join our team, 
            we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Start Your Free Trial
            </Button>
            <Button variant="outline" size="lg">
              View Open Positions
            </Button>
            <Button variant="ghost" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

