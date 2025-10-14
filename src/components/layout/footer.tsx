"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Image as lucideImage } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1BcDRQobP9/',
      icon: Facebook,
    },
    {
      name: 'Twitter',
      href: 'https://x.com/SportyAfrica?t=c-XMZ6PRy3z9W8IZwkupgA&s=09',
      icon: Twitter,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/sportyafrica?igsh=YmZxaXhvMWc4a2Rp',
      icon: Instagram,
    },
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  const sportsCategories = [
    { name: 'Football', href: '/category/football' },
    { name: 'Basketball', href: '/category/basketball' },
    { name: 'Tennis', href: '/category/tennis' },
    { name: 'Boxing', href: '/category/boxing' },
    { name: 'Rugby', href: '/category/rugby' },
    { name: 'Hockey', href: '/category/hockey' },
    { name: 'Golf', href: '/category/golf' },
  ];

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div>
                <Image
                  src="/SportyAfrica-Logos-04.png"
                  alt="Sporty Africa Logo"
                  width={300}
                  height={200}
                  priority />
              </div>
            </Link>
            <p className="text-secondary-300 text-sm leading-relaxed">
              Your premier destination for comprehensive African sports coverage.
              We bring you the latest news, analysis, and insights from across the continent's
              vibrant sports landscape.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-secondary-800 rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors focus-ring"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports Categories */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg text-white">
              Sports Coverage
            </h3>
            <ul className="space-y-2">
              {sportsCategories.map((category) => (
                <li key={category.href}>
                  <Link
                    href={category.href}
                    className="text-secondary-300 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg text-white">
              Get In Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-secondary-300 text-sm">
                  contact@sporty-africa.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-secondary-300 text-sm">
                  +233 (0) 243778001
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <span className="text-secondary-300 text-sm">
                  Accra, Ghana<br />
                  West Africa
                </span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="font-medium text-white mb-2">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-secondary-800 border border-secondary-700 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-primary-700 hover:bg-primary-800 rounded-r-lg transition-colors focus-ring">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-secondary-400 text-sm">
              © {currentYear} Sporty Africa. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-secondary-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-secondary-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
