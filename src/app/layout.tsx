import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Sporty Africa - Latest African Sports News",
    template: "%s | Sporty Africa",
  },
  description: "Stay updated with the latest African sports news, covering football, basketball, tennis, boxing, rugby, hockey, and golf across the continent.",
  keywords: ["African sports", "football", "basketball", "tennis", "boxing", "rugby", "hockey", "golf", "sports news", "Africa"],
  authors: [{ name: "Sporty Africa" }],
  icons: {
    icon: "/favicon.ico",
  },
  creator: "Sporty Africa",
  publisher: "Sporty Africa",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sporty-africa.com",
    siteName: "Sporty Africa",
    title: "Sporty Africa - Latest African Sports News",
    description: "Stay updated with the latest African sports news, covering football, basketball, tennis, boxing, rugby, hockey, and golf across the continent.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sporty Africa - Latest African Sports News",
    description: "Stay updated with the latest African sports news, covering football, basketball, tennis, boxing, rugby, hockey, and golf across the continent.",
    creator: "@SportyAfrica",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-inter antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
