"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Tag } from 'lucide-react';
import { WordPressPost } from '@/lib/types';
import { getFeaturedImageUrl, getAuthorName, getPostCategories, formatDate, stripHtml, truncateText } from '@/lib/wordpress-api';

interface ArticleCardProps {
  post: WordPressPost;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ 
  post, 
  variant = 'default',
  className = '' 
}) => {
  const featuredImage = getFeaturedImageUrl(post);
  const authorName = getAuthorName(post);
  const categories = getPostCategories(post);
  const formattedDate = formatDate(post.date);
  const excerpt = truncateText(stripHtml(post.excerpt.rendered), 120);

  if (variant === 'featured') {
    return (
      <article className={`card overflow-hidden hover-lift ${className}`}>
        <Link href={`/post/${post.slug}`} className="block">
          <div className="relative h-64 md:h-80">
            {featuredImage ? (
              <Image
                src={featuredImage}
                alt={post.title.rendered}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center">
                <span className="text-secondary-500 text-lg">No Image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              {categories.length > 0 && (
                <span className="inline-block bg-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {categories[0]}
                </span>
              )}
              <h2 className="font-poppins font-bold text-xl md:text-2xl mb-2 line-clamp-2">
                {post.title.rendered}
              </h2>
              <p className="text-secondary-200 text-sm line-clamp-2 mb-3">
                {excerpt}
              </p>
              <div className="flex items-center space-x-4 text-sm text-secondary-300">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{authorName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className={`flex space-x-4 hover-lift ${className}`}>
        <Link href={`/post/${post.slug}`} className="flex-shrink-0">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
            {featuredImage ? (
              <Image
                src={featuredImage}
                alt={post.title.rendered}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full bg-secondary-200 dark:bg-secondary-700" />
            )}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/post/${post.slug}`}>
            <h3 className="font-poppins font-semibold text-sm line-clamp-2 mb-1 hover:text-primary-700 transition-colors">
              {post.title.rendered}
            </h3>
          </Link>
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            {categories.length > 0 && (
              <>
                <span>•</span>
                <span>{categories[0]}</span>
              </>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`card overflow-hidden hover-lift ${className}`}>
      <Link href={`/post/${post.slug}`} className="block">
        <div className="relative h-48">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={post.title.rendered}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center">
              <span className="text-secondary-500">No Image</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        {categories.length > 0 && (
          <div className="flex items-center space-x-2 mb-3">
            <Tag className="w-4 h-4 text-primary-600" />
            <span className="text-primary-600 text-sm font-medium">
              {categories[0]}
            </span>
          </div>
        )}
        <Link href={`/post/${post.slug}`}>
          <h3 className="font-poppins font-semibold text-lg line-clamp-2 mb-3 hover:text-primary-700 transition-colors">
            {post.title.rendered}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{authorName}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
