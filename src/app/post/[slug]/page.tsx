import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getRelatedPosts, getFeaturedImageUrl, getAuthorName, getPostCategories, formatDate, stripHtml } from '@/lib/wordpress-api';
import ArticleCard from '@/components/ui/article-card';
import { SkeletonList, SkeletonArticle } from '@/components/ui/loading';
import { Calendar, User, Tag, Share2, Facebook, Twitter, Instagram, ChevronLeft } from 'lucide-react';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const featuredImage = getFeaturedImageUrl(post, 'large');
  const excerpt = stripHtml(post.excerpt.rendered);

  return {
    title: `${post.title.rendered} - Sporty Africa`,
    description: excerpt.substring(0, 160),
    openGraph: {
      title: post.title.rendered,
      description: excerpt.substring(0, 160),
      images: featuredImage ? [{ url: featuredImage }] : [],
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.rendered,
      description: excerpt.substring(0, 160),
      images: featuredImage ? [featuredImage] : [],
    },
  };
}

// Share Buttons Component
function ShareButtons({ post }: { post: any }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `${post.title.rendered} - Sporty Africa`;

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:text-blue-600',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'hover:text-blue-400',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: `https://www.instagram.com/sportyafrica`,
      color: 'hover:text-pink-600',
    },
  ];

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Share2 className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Share:</span>
      </div>
      <div className="flex items-center space-x-3">
        {shareLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg bg-secondary-100 dark:bg-secondary-800 transition-colors ${social.color}`}
              aria-label={`Share on ${social.name}`}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

// Related Posts Component
async function RelatedPosts({ postId, categories }: { postId: number; categories: number[] }) {
  try {
    const relatedPosts = await getRelatedPosts(postId, categories, 3);

    if (relatedPosts.length === 0) {
      return null;
    }

    return (
      <section className="mt-16 pt-16 border-t border-border">
        <h2 className="font-poppins font-bold text-2xl mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading related posts:', error);
    return null;
  }
}

// Post Content Component
async function PostContent({ slug }: { slug: string }) {
  try {
    const post = await getPostBySlug(slug);

    if (!post) {
      notFound();
    }

    const featuredImage = getFeaturedImageUrl(post, 'large');
    const authorName = getAuthorName(post);
    const categories = getPostCategories(post);
    const formattedDate = formatDate(post.date);

    return (
      <>
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary-700 flex items-center space-x-1">
            <ChevronLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>
          {categories.length > 0 && (
            <>
              <span>/</span>
              <Link 
                href={`/category/${categories[0].toLowerCase()}`}
                className="hover:text-primary-700"
              >
                {categories[0]}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-foreground">Article</span>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
            {post.title.rendered}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">{authorName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">{formattedDate}</span>
            </div>
            {categories.length > 0 && (
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category.toLowerCase()}`}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-900/40 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Share Buttons */}
          <ShareButtons post={post} />
        </header>

        {/* Featured Image */}
        {featuredImage && (
          <div className="relative w-full h-64 md:h-96 lg:h-[500px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={featuredImage}
              alt={post.title.rendered}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>

        {/* Article Footer */}
        <footer className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Tags:</span>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="px-2 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded text-sm hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                >
                  #{category.toLowerCase()}
                </Link>
              ))}
            </div>
            <ShareButtons post={post} />
          </div>
        </footer>

        {/* Related Posts */}
        <Suspense fallback={<SkeletonList count={3} />}>
          <RelatedPosts postId={post.id} categories={post.categories} />
        </Suspense>
      </>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    return (
      <div className="text-center py-12">
        <h1 className="font-poppins font-bold text-2xl mb-4">Error Loading Article</h1>
        <p className="text-muted-foreground mb-6">
          Unable to load this article. Please try again later.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }
}

// Main Post Page Component
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<SkeletonArticle />}>
            <PostContent slug={slug} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
