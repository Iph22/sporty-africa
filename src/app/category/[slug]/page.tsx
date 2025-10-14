import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostsByCategory, getCategoryBySlug } from '@/lib/wordpress-api';
import { SPORT_CATEGORIES } from '@/lib/types';
import ArticleCard from '@/components/ui/article-card';
import { SkeletonList } from '@/components/ui/loading';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} News - Sporty Africa`,
    description: `Latest ${category.name.toLowerCase()} news and updates from across Africa. Stay informed with comprehensive coverage of African ${category.name.toLowerCase()}.`,
    openGraph: {
      title: `${category.name} News - Sporty Africa`,
      description: `Latest ${category.name.toLowerCase()} news and updates from across Africa.`,
    },
  };
}

// Pagination Component
function Pagination({ currentPage, totalPages, categorySlug }: { 
  currentPage: number; 
  totalPages: number; 
  categorySlug: string; 
}) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showPages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);

  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={`/category/${categorySlug}?page=${currentPage - 1}`}
          className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-800 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Link>
      )}

      <div className="flex items-center space-x-1">
        {startPage > 1 && (
          <>
            <Link
              href={`/category/${categorySlug}?page=1`}
              className="px-3 py-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            >
              1
            </Link>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pages.map((page) => (
          <Link
            key={page}
            href={`/category/${categorySlug}?page=${page}`}
            className={`px-3 py-2 rounded-lg transition-colors ${
              page === currentPage
                ? 'bg-primary-700 text-white'
                : 'hover:bg-secondary-100 dark:hover:bg-secondary-800'
            }`}
          >
            {page}
          </Link>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <Link
              href={`/category/${categorySlug}?page=${totalPages}`}
              className="px-3 py-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            >
              {totalPages}
            </Link>
          </>
        )}
      </div>

      {currentPage < totalPages && (
        <Link
          href={`/category/${categorySlug}?page=${currentPage + 1}`}
          className="flex items-center space-x-2 px-4 py-2 bg-secondary-100 dark:bg-secondary-800 rounded-lg hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}

// Category Posts Component
async function CategoryPosts({ slug, page }: { slug: string; page: number }) {
  try {
    const { posts, pagination, category } = await getPostsByCategory(slug, page, 12);

    if (!category) {
      notFound();
    }

    if (posts.length === 0) {
      return (
        <div className="text-center py-12">
          <h2 className="font-poppins font-bold text-2xl mb-4">No Articles Found</h2>
          <p className="text-muted-foreground mb-6">
            There are no articles in the {category.name} category yet.
          </p>
          <Link
            href="/"
            className="btn-primary"
          >
            Back to Home
          </Link>
        </div>
      );
    }

    return (
      <>
        {/* Category Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary-700">Home</Link>
            <span>/</span>
            <span>Category</span>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </div>
          <h1 className="font-poppins font-bold text-4xl mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-muted-foreground text-lg max-w-3xl">
              {category.description}
            </p>
          )}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {posts.length} of {pagination.totalPosts} articles
            {pagination.currentPage > 1 && ` (Page ${pagination.currentPage} of ${pagination.totalPages})`}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          categorySlug={slug}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading category posts:', error);
    return (
      <div className="text-center py-12">
        <h2 className="font-poppins font-bold text-2xl mb-4">Error Loading Category</h2>
        <p className="text-muted-foreground mb-6">
          Unable to load articles for this category. Please try again later.
        </p>
        <Link
          href="/"
          className="btn-primary"
        >
          Back to Home
        </Link>
      </div>
    );
  }
}

// Main Category Page Component
export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || '1', 10);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Suspense fallback={<SkeletonList count={12} />}>
          <CategoryPosts slug={slug} page={page} />
        </Suspense>
      </div>
    </div>
  );
}

// Generate static params for known categories
export async function generateStaticParams() {
  const categories = Object.values(SPORT_CATEGORIES).map(category => ({
    slug: category.slug,
  }));

  return categories;
}
