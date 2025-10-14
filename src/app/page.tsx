import React, { Suspense } from 'react';
import { getFeaturedPosts, getPostsBySport } from '@/lib/wordpress-api';
import { SPORT_CATEGORIES } from '@/lib/types';
import ArticleCard from '@/components/ui/article-card';
import { SkeletonCard, SkeletonList } from '@/components/ui/loading';
import Link from 'next/link';
import { ChevronRight, TrendingUp } from 'lucide-react';

// Hero Section Component
async function HeroSection() {
  try {
    const featuredPosts = await getFeaturedPosts(1);
    const heroPost = featuredPosts[0];

    if (!heroPost) {
      return (
        <section className="relative h-96 bg-secondary-200 dark:bg-secondary-800 flex items-center justify-center">
          <p className="text-muted-foreground">No featured content available</p>
        </section>
      );
    }

    return (
      <section className="relative">
        <ArticleCard post={heroPost} variant="featured" className="border-0 rounded-none" />
      </section>
    );
  } catch (error) {
    console.error('Error loading hero section:', error);
    return (
      <section className="relative h-96 bg-secondary-200 dark:bg-secondary-800 flex items-center justify-center">
        <p className="text-muted-foreground">Unable to load featured content</p>
      </section>
    );
  }
}

// Latest News Section
async function LatestNewsSection() {
  try {
    const featuredPosts = await getFeaturedPosts(8);
    const latestPosts = featuredPosts.slice(1); // Skip the hero post

    if (latestPosts.length === 0) {
      return (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-poppins font-bold text-3xl mb-8">Latest News</h2>
            <p className="text-muted-foreground">No recent articles available</p>
          </div>
        </section>
      );
    }

    return (
      <section className="py-12 bg-secondary-50 dark:bg-secondary-900/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-poppins font-bold text-3xl text-foreground">Latest News</h2>
            <Link 
              href="/category/all" 
              className="flex items-center space-x-2 text-primary-700 hover:text-primary-800 font-medium"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {latestPosts.map((post) => (
              <ArticleCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading latest news:', error);
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-3xl mb-8">Latest News</h2>
          <p className="text-muted-foreground">Unable to load latest articles</p>
        </div>
      </section>
    );
  }
}

// Sport Category Section Component
async function SportCategorySection({ sport, title }: { sport: keyof typeof SPORT_CATEGORIES; title: string }) {
  try {
    const { posts } = await getPostsBySport(sport, 1, 3);

    if (posts.length === 0) {
      return null;
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-poppins font-bold text-2xl text-foreground">{title}</h3>
          <Link 
            href={`/category/${sport}`}
            className="flex items-center space-x-2 text-primary-700 hover:text-primary-800 font-medium"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error loading ${sport} posts:`, error);
    return null;
  }
}

// Sports Categories Section
async function SportsCategoriesSection() {
  const sportsToShow = [
    { key: 'football' as const, title: 'Football' },
    { key: 'basketball' as const, title: 'Basketball' },
    { key: 'tennis' as const, title: 'Tennis' },
    { key: 'boxing' as const, title: 'Boxing' },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          {sportsToShow.map((sport) => (
            <Suspense key={sport.key} fallback={<SkeletonList count={3} />}>
              <SportCategorySection sport={sport.key} title={sport.title} />
            </Suspense>
          ))}
        </div>
      </div>
    </section>
  );
}

// Trending Sidebar Component
async function TrendingSidebar() {
  try {
    const trendingPosts = await getFeaturedPosts(5);

    return (
      <aside className="space-y-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-700" />
          <h3 className="font-poppins font-bold text-xl">Trending</h3>
        </div>
        <div className="space-y-4">
          {trendingPosts.map((post, index) => (
            <div key={post.id} className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 bg-primary-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </span>
              <ArticleCard post={post} variant="compact" className="flex-1" />
            </div>
          ))}
        </div>
      </aside>
    );
  } catch (error) {
    console.error('Error loading trending posts:', error);
    return (
      <aside className="space-y-6">
        <h3 className="font-poppins font-bold text-xl">Trending</h3>
        <p className="text-muted-foreground">Unable to load trending articles</p>
      </aside>
    );
  }
}

// Main Home Page Component
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Suspense fallback={<div className="h-96 skeleton" />}>
        <HeroSection />
      </Suspense>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Latest News */}
            <Suspense fallback={<SkeletonList count={8} />}>
              <LatestNewsSection />
            </Suspense>

            {/* Sports Categories */}
            <Suspense fallback={<SkeletonList count={12} />}>
              <SportsCategoriesSection />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Suspense fallback={<SkeletonList count={5} />}>
                <TrendingSidebar />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins font-bold text-3xl mb-4">
            Stay Updated with African Sports
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Get the latest news, match results, and exclusive insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <button className="px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors focus-ring">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
