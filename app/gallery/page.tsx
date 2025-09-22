import { Metadata } from "next";
import { PAGE_SEO_DATA, generateCanonicalUrl, SEO_CONSTANTS } from "@/lib/seo";
import GalleryClient from "./GalleryClient";

// Generate metadata for gallery page
export const metadata: Metadata = {
  title: PAGE_SEO_DATA.gallery.title,
  description: PAGE_SEO_DATA.gallery.description,
  keywords: PAGE_SEO_DATA.gallery.keywords,
  openGraph: {
    title: PAGE_SEO_DATA.gallery.title,
    description: PAGE_SEO_DATA.gallery.description,
    url: generateCanonicalUrl('/gallery'),
    siteName: SEO_CONSTANTS.SITE_NAME,
    images: [
      {
        url: `${SEO_CONSTANTS.SITE_URL}/gallery/1.webp`,
        width: SEO_CONSTANTS.IMAGE_DIMENSIONS.width,
        height: SEO_CONSTANTS.IMAGE_DIMENSIONS.height,
        alt: 'E-Cell IET Lucknow Gallery - Events and Activities',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: SEO_CONSTANTS.TWITTER_HANDLE,
    creator: SEO_CONSTANTS.TWITTER_HANDLE,
    title: PAGE_SEO_DATA.gallery.title,
    description: PAGE_SEO_DATA.gallery.description,
    images: {
      url: `${SEO_CONSTANTS.SITE_URL}/gallery/1.webp`,
      alt: 'E-Cell IET Lucknow Gallery - Events and Activities',
    },
  },
  alternates: {
    canonical: generateCanonicalUrl('/gallery'),
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

export default function GalleryPage() {
  return <GalleryClient />;
}
