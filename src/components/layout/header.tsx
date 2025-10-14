"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SPORT_CATEGORIES } from '@/lib/types';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Football', href: '/category/football' },
    { name: 'Basketball', href: '/category/basketball' },
    { name: 'Tennis', href: '/category/tennis' },
    { name: 'Boxing', href: '/category/boxing' },
    { name: 'Rugby', href: '/category/rugby' },
    { name: 'Hockey', href: '/category/hockey' },
    { name: 'Golf', href: '/category/golf' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            <div>
              <Image
                src="/SportyAfrica-Logos-02.png"
                alt="Sporty Africa Logo"
                width={150}
                height={40}
                priority />
            </div>
            <span className="font-poppins font-bold text-xl">
              <span className="text-[#001F3F] dark:text-[#1E3A8A]">Sporty</span>
              <span className="text-[#E10600] dark:text-[#FF3B30] ml-1">Africa</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActiveLink(item.href) ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <button className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors focus-ring">
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors focus-ring"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors focus-ring"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`px-4 py-2 rounded-lg transition-colors ${isActiveLink(item.href)
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                    : 'hover:bg-secondary-100 dark:hover:bg-secondary-800'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Breaking News Ticker (Optional) */}
      <div className="bg-primary-700 text-white py-2 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-sm bg-accent-500 px-2 py-1 rounded">
              BREAKING
            </span>
            <div className="animate-pulse">
              <span className="text-sm">
                Latest African sports news and updates • Follow us for real-time coverage
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
