// WordPress REST API integration for Sporty Africa
import { WordPressPost, WordPressCategory, PaginationInfo, SPORT_CATEGORIES, SportCategory } from './types';

// WordPress API base URL - Edit this to match your WordPress site
const WP_API_BASE = 'https://sporty-africa.com/wp-json/wp/v2';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class APICache {
  private cache = new Map<string, CacheEntry<any>>();

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

const cache = new APICache();

// Fetch wrapper with error handling and caching
async function fetchWithCache<T>(url: string, cacheKey?: string): Promise<T> {
  if (cacheKey) {
    const cached = cache.get<T>(cacheKey);
    if (cached) return cached;
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (cacheKey) {
      cache.set(cacheKey, data);
    }

    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw new Error('Failed to fetch data from WordPress API');
  }
}

// Get pagination info from response headers
function getPaginationInfo(headers: Headers, page: number): PaginationInfo {
  const totalPages = parseInt(headers.get('X-WP-TotalPages') || '1');
  const totalPosts = parseInt(headers.get('X-WP-Total') || '0');

  return {
    currentPage: page,
    totalPages,
    totalPosts,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

// Fetch all categories
export async function getCategories(): Promise<WordPressCategory[]> {
  const url = `${WP_API_BASE}/categories?per_page=100`;
  return fetchWithCache<WordPressCategory[]>(url, 'categories');
}

// Get category ID by slug
export async function getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
  try {
    const categories = await getCategories();
    return categories.find(cat => cat.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}

// Fetch posts with optional filtering
export async function getPosts(options: {
  page?: number;
  perPage?: number;
  categories?: number[];
  search?: string;
  orderby?: 'date' | 'title' | 'relevance';
  order?: 'asc' | 'desc';
} = {}): Promise<{ posts: WordPressPost[]; pagination: PaginationInfo }> {
  const {
    page = 1,
    perPage = 10,
    categories,
    search,
    orderby = 'date',
    order = 'desc',
  } = options;

  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    orderby,
    order,
    _embed: 'true',
  });

  if (categories && categories.length > 0) {
    params.append('categories', categories.join(','));
  }

  if (search) {
    params.append('search', search);
  }

  const url = `${WP_API_BASE}/posts?${params.toString()}`;
  const cacheKey = `posts_${params.toString()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();
    const pagination = getPaginationInfo(response.headers, page);

    const result = { posts, pagination };
    cache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const url = `${WP_API_BASE}/posts?slug=${slug}&_embed=true`;
    const posts = await fetchWithCache<WordPressPost[]>(url, `post_${slug}`);
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

// Fetch posts by category slug
export async function getPostsByCategory(
  categorySlug: string,
  page: number = 1,
  perPage: number = 10
): Promise<{ posts: WordPressPost[]; pagination: PaginationInfo; category: WordPressCategory | null }> {
  try {
    const category = await getCategoryBySlug(categorySlug);
    
    if (!category) {
      return {
        posts: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalPosts: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
        category: null,
      };
    }

    const { posts, pagination } = await getPosts({
      page,
      perPage,
      categories: [category.id],
    });

    return { posts, pagination, category };
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    throw new Error('Failed to fetch posts by category');
  }
}

// Fetch featured posts (latest posts)
export async function getFeaturedPosts(limit: number = 5): Promise<WordPressPost[]> {
  try {
    const { posts } = await getPosts({ perPage: limit });
    return posts;
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

// Fetch posts by sport category
export async function getPostsBySport(
  sport: SportCategory,
  page: number = 1,
  perPage: number = 10
): Promise<{ posts: WordPressPost[]; pagination: PaginationInfo; category: WordPressCategory | null }> {
  const categorySlug = SPORT_CATEGORIES[sport].slug;
  return getPostsByCategory(categorySlug, page, perPage);
}

// Fetch related posts (same category, excluding current post)
export async function getRelatedPosts(
  postId: number,
  categories: number[],
  limit: number = 3
): Promise<WordPressPost[]> {
  try {
    if (categories.length === 0) return [];

    const { posts } = await getPosts({
      categories,
      perPage: limit + 1, // Get one extra in case current post is included
    });

    // Filter out the current post and limit results
    return posts.filter(post => post.id !== postId).slice(0, limit);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

// Search posts
export async function searchPosts(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<{ posts: WordPressPost[]; pagination: PaginationInfo }> {
  try {
    return await getPosts({
      search: query,
      page,
      perPage,
      orderby: 'relevance',
    });
  } catch (error) {
    console.error('Error searching posts:', error);
    return {
      posts: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalPosts: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

// Utility function to extract featured image URL
export function getFeaturedImageUrl(post: WordPressPost, size: string = 'medium_large'): string | null {
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
  
  if (!featuredMedia) return null;

  // Try to get the requested size, fallback to source_url
  const sizeData = featuredMedia.media_details?.sizes?.[size];
  return sizeData?.source_url || featuredMedia.source_url || null;
}

// Utility function to get post author name
export function getAuthorName(post: WordPressPost): string {
  return post._embedded?.author?.[0]?.name || 'Sporty Africa';
}

// Utility function to get post categories
export function getPostCategories(post: WordPressPost): string[] {
  return post._embedded?.['wp:term']?.[0]?.map(term => term.name) || [];
}

// Utility function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Utility function to strip HTML tags from content
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

// Utility function to truncate text
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}
