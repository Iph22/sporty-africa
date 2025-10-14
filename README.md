# Sporty Africa - Modern Sports News Platform

A modern, fast, and elegant sports news platform built with Next.js 14, fetching live data from WordPress REST API.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **WordPress Integration**: Fetches live data from WordPress REST API
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Dark/Light Mode**: Theme toggle with system preference detection
- **SEO Optimized**: Dynamic metadata, OpenGraph, Twitter cards
- **Performance**: Image optimization, lazy loading, ISR
- **Animations**: Smooth Framer Motion animations throughout
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Query
- **Theme**: next-themes
- **Icons**: Lucide React
- **SEO**: next-sitemap

## 📱 Pages

- **Home** (`/`) - Hero carousel, featured categories, latest posts
- **Post** (`/post/[slug]`) - Individual article with related posts
- **Category** (`/category/[slug]`) - Category-filtered posts with pagination
- **About** (`/about`) - About Sporty Africa
- **Contact** (`/contact`) - Contact form and information

## 🎨 Design Features

- Clean, modern sports aesthetic
- Primary color: #FF4D00 (Sporty energy)
- Secondary color: #00BFFF (Contrast)
- Typography: Inter + Poppins fonts
- Smooth hover effects and transitions
- Card-based layouts with subtle shadows

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sporty-africa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📦 Build & Deploy

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Deploy to Vercel**
   ```bash
   npx vercel
   ```

## 🌐 WordPress API Integration

The application fetches data from the WordPress REST API at:
```
https://sporty-africa.com/wp-json/wp/v2/
```

### API Endpoints Used:
- `/posts?_embed` - Fetch posts with embedded media and categories
- `/posts?slug={slug}&_embed` - Fetch single post by slug
- `/categories` - Fetch all categories
- `/posts?categories={id}` - Fetch posts by category

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── category/[slug]/   # Category pages
│   ├── contact/           # Contact page
│   ├── post/[slug]/       # Individual post pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading UI
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── contact/          # Contact form components
│   ├── home/             # Home page components
│   ├── layout/           # Layout components (navbar, footer)
│   ├── post/             # Post-related components
│   ├── providers/        # Context providers
│   ├── ui/               # UI components
│   └── theme-provider.tsx
├── lib/                  # Utilities and API functions
│   ├── types.ts          # TypeScript type definitions
│   └── wordpress-api.ts  # WordPress API integration
```

## 🎯 Key Components

### WordPress API Integration (`lib/wordpress-api.ts`)
- Fetches and transforms WordPress data
- Handles pagination and filtering
- Calculates read time for articles
- Manages featured images and categories

### Hero Carousel (`components/home/hero-carousel.tsx`)
- Auto-rotating featured posts
- Smooth animations with Framer Motion
- Navigation arrows and dot indicators
- Responsive design

### Post Grid (`components/home/latest-posts.tsx`)
- Responsive grid layout
- Hover effects and animations
- Category tags and meta information
- Read more functionality

### Theme System
- Dark/light mode toggle
- System preference detection
- Smooth transitions between themes
- CSS custom properties for theming

## 🔍 SEO Features

- Dynamic metadata generation
- OpenGraph and Twitter card support
- Structured data for articles
- XML sitemap generation
- Robots.txt configuration
- Optimized images with alt text

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized typography scaling
- Flexible grid layouts

## 🎨 Customization

### Colors
Update colors in `tailwind.config.ts`:
```typescript
colors: {
  primary: '#FF4D00',    // Main brand color
  secondary: '#00BFFF',  // Accent color
  // ... other colors
}
```

### Fonts
Fonts are configured in `app/layout.tsx`:
```typescript
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weights: ['300', '400', '500', '600', '700', '800'] })
```

## 🚀 Performance Optimizations

- Next.js Image component for optimized images
- ISR (Incremental Static Regeneration) for posts
- React Query for efficient data fetching
- Lazy loading for non-critical components
- Optimized bundle size with tree shaking

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email info@sporty-africa.com or create an issue in the repository.

---

Built with ❤️ for African Sports by the Sporty Africa Team
