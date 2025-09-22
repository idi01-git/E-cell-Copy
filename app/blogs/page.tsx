import { Metadata } from "next";
import { PAGE_SEO_DATA, generateCanonicalUrl, SEO_CONSTANTS } from "@/lib/seo";
import BlogsClient from "./BlogsClient";

// Generate metadata for blogs page
export const metadata: Metadata = {
  title: PAGE_SEO_DATA.blogs.title,
  description: PAGE_SEO_DATA.blogs.description,
  keywords: PAGE_SEO_DATA.blogs.keywords,
  openGraph: {
    title: PAGE_SEO_DATA.blogs.title,
    description: PAGE_SEO_DATA.blogs.description,
    url: generateCanonicalUrl('/blogs'),
    siteName: SEO_CONSTANTS.SITE_NAME,
    images: [
      {
        url: `${SEO_CONSTANTS.SITE_URL}/news/1.webp`,
        width: SEO_CONSTANTS.IMAGE_DIMENSIONS.width,
        height: SEO_CONSTANTS.IMAGE_DIMENSIONS.height,
        alt: 'E-Cell IET Lucknow Blog - Entrepreneurship Articles',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: SEO_CONSTANTS.TWITTER_HANDLE,
    creator: SEO_CONSTANTS.TWITTER_HANDLE,
    title: PAGE_SEO_DATA.blogs.title,
    description: PAGE_SEO_DATA.blogs.description,
    images: {
      url: `${SEO_CONSTANTS.SITE_URL}/news/1.webp`,
      alt: 'E-Cell IET Lucknow Blog - Entrepreneurship Articles',
    },
  },
  alternates: {
    canonical: generateCanonicalUrl('/blogs'),
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}
