import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Facebook, Twitter as X, Instagram, Mail, Phone, MapPin, Users, Target, Award, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Sporty Africa',
  description: 'Learn about Sporty Africa, your premier destination for comprehensive African sports coverage. Discover our mission, values, and commitment to quality sports journalism.',
  openGraph: {
    title: 'About Us - Sporty Africa',
    description: 'Learn about Sporty Africa, your premier destination for comprehensive African sports coverage.',
  },
};

const AboutPage = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1BcDRQobP9/',
      icon: Facebook,
      color: 'hover:text-blue-600',
    },
    {
      name: 'X',
      href: 'https://x.com/SportyAfrica?t=c-XMZ6PRy3z9W8IZwkupgA&s=09',
      icon: X,
      color: 'hover:text-blue-400',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/sportyafrica?igsh=YmZxaXhvMWc4a2Rp',
      icon: Instagram,
      color: 'hover:text-pink-600',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide comprehensive, accurate, and engaging coverage of African sports, celebrating the continent\'s rich sporting heritage and emerging talents.',
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'We believe in building a strong community of African sports enthusiasts, connecting fans across the continent and beyond.',
    },
    {
      icon: Award,
      title: 'Quality Journalism',
      description: 'We are committed to delivering high-quality sports journalism with integrity, accuracy, and fairness in all our reporting.',
    },
    {
      icon: Globe,
      title: 'Continental Coverage',
      description: 'From local grassroots sports to international competitions, we cover the full spectrum of African sports across all 54 countries.',
    },
  ];

  const sports = [
    'Football (Soccer)',
    'Basketball',
    'Tennis',
    'Boxing',
    'Rugby',
    'Hockey',
    'Golf',
    'Athletics',
    'Cricket',
    'Swimming',
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <span className="text-foreground">About Us</span>
        </div>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            About <span className="text-primary-700">Sporty Africa</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Delivering Africa-related sports content at your doorstep — African Sports News Everywhere!
            Sporty-Africa.com is the heartbeat of African sports. We bring you closer to the athletes, stories,
            and fans that power the game across the continent. From Accra to Cairo, Lagos to Johannesburg — we tell Africa’s
            sports story with passion, pride, and purpose.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="mb-16">
          <div className="bg-primary-50 dark:bg-primary-900/10 rounded-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-poppins font-bold text-3xl mb-6 text-primary-700 dark:text-primary-400">
                Our Story
              </h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  Sporty-Africa is part of Robin Communications Limited Digitalz (RCL Digitalz) — the digital and
                  creative wing of Robin Communications Limited, the team behind Ghana’s pioneering football news
                  portal, FootyGhana.com.
                </p>
                <p>
                  After years of covering football exclusively, we saw a bigger picture: Africa’s love for all sports deserved a louder voice.
                  That inspired the birth of Sporty-Africa.com, your all-sports hub for authentic African storytelling.
                </p>
                <p>
                  Our platform serves as a bridge, connecting sports fans across Africa and
                  the diaspora, while showcasing the incredible athletic achievements and
                  stories that make African sports so compelling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="mb-16">
          <h2 className="font-poppins font-bold text-3xl text-center mb-12">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card p-6 text-center hover-lift">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-700 dark:text-primary-400" />
                  </div>
                  <h3 className="font-poppins font-semibold text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Sports Coverage */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-poppins font-bold text-3xl mb-6">
                Comprehensive Sports Coverage
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Sporty-Africa, we cover it all — every game, every athlete, every victory.
                From local leagues to world stages, our stories capture the heartbeat of African sport in motion.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our team of reporters and contributors across the continent brings you real-time updates, exclusive interviews,
                and in-depth features on football, athletics, basketball, boxing, tennis, and more.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Wherever African athletes shine — at home or abroad — Sporty-Africa is there,
                delivering the action straight to your screen.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Follow the movement. Experience African sports everywhere.
              </p>
              <Link href="/" className="btn-primary">
                Explore Our Coverage
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {sports.map((sport, index) => (
                <div key={index} className="card p-4 text-center">
                  <span className="font-medium text-primary-700 dark:text-primary-400">
                    {sport}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="mb-16">
          <div className="bg-secondary-50 dark:bg-secondary-900/50 rounded-2xl p-8 md:p-12">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="font-poppins font-bold text-3xl mb-6">
                Join Our Growing Community
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Sporty Africa is more than just a news platform – we're building a vibrant
                community of African sports enthusiasts. Join thousands of fans who trust
                us for their daily dose of African sports news and analysis.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-700 mb-2">50K+</div>
                  <div className="text-muted-foreground">Monthly Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-700 mb-2">1000+</div>
                  <div className="text-muted-foreground">Articles Published</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-700 mb-2">54</div>
                  <div className="text-muted-foreground">African Countries Covered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Social */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-poppins font-bold text-3xl mb-6">Get In Touch</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We'd love to hear from you! Whether you have a story tip, feedback,
                or just want to connect with our team, don't hesitate to reach out.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-700 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <div className="text-muted-foreground">contact@sporty-africa.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-700 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Call Us</div>
                    <div className="text-muted-foreground">+233 (0) 243778001</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-700 dark:text-primary-400" />
                  </div>
                  <div>
                    <div className="font-semibold">Visit Us</div>
                    <div className="text-muted-foreground">
                      Accra, Ghana<br />
                      West Africa
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className="font-poppins font-bold text-3xl mb-6">Follow Our Journey</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Stay connected with us on social media for real-time updates,
                behind-the-scenes content, and exclusive sports insights.
              </p>
              <div className="space-y-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-4 p-4 card hover-lift transition-colors ${social.color}`}
                    >
                      <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-800 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-semibold">Follow us on {social.name}</div>
                        <div className="text-muted-foreground text-sm">
                          Join our community for daily updates
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-primary-700 text-white rounded-2xl p-8 md:p-12">
            <h2 className="font-poppins font-bold text-3xl mb-4">
              Ready to Dive Into African Sports?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Explore our latest articles, discover new sports stories, and join
              the conversation about African sports excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-secondary">
                Browse Latest News
              </Link>
              <Link href="/category/football" className="btn-secondary">
                Explore Football
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
