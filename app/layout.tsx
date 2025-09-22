import type { Metadata, Viewport } from "next";
import React from "react";
import { Inter, Poppins, Montserrat } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";
import EmailJSScript from "@/components/EmailJSScript";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ClientInit } from "@/components/ClientInit";
import { ScrollToTop } from "@/components/ScrollToTop";
import { logger } from "@/lib/logger";
import { 
  SEO_CONSTANTS, 
  generateOrganizationSchema, 
  generateWebsiteSchema,
  generateLocalBusinessSchema,
  PAGE_SEO_DATA
} from "@/lib/seo";

// Optimized font loading with comprehensive fallbacks
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "sans-serif"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "sans-serif"],
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: `${SEO_CONSTANTS.SITE_NAME} | Entrepreneurship Cell | Student Innovation Hub`,
    template: `%s | ${SEO_CONSTANTS.SITE_NAME}`,
  },
  description: SEO_CONSTANTS.DESCRIPTION,
  keywords: SEO_CONSTANTS.KEYWORDS,
  authors: [
    { name: SEO_CONSTANTS.AUTHOR },
    { name: SEO_CONSTANTS.ORGANIZATION_NAME, url: SEO_CONSTANTS.SITE_URL }
  ],
  creator: SEO_CONSTANTS.AUTHOR,
  publisher: SEO_CONSTANTS.ORGANIZATION_NAME,
  applicationName: SEO_CONSTANTS.SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SEO_CONSTANTS.SITE_URL),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    title: `${SEO_CONSTANTS.SITE_NAME} | Entrepreneurship Cell`,
    description: SEO_CONSTANTS.DESCRIPTION,
    url: SEO_CONSTANTS.SITE_URL,
    siteName: SEO_CONSTANTS.SITE_NAME,
    images: [
      {
        url: `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.DEFAULT_IMAGE}`,
        width: SEO_CONSTANTS.IMAGE_DIMENSIONS.width,
        height: SEO_CONSTANTS.IMAGE_DIMENSIONS.height,
        alt: `${SEO_CONSTANTS.SITE_NAME} - Fostering Innovation and Entrepreneurship`,
        type: "image/jpeg",
      },
      {
        url: `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.LOGO_URL}`,
        width: 400,
        height: 400,
        alt: `${SEO_CONSTANTS.SITE_NAME} Logo`,
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: SEO_CONSTANTS.TWITTER_HANDLE,
    creator: SEO_CONSTANTS.TWITTER_HANDLE,
    title: `${SEO_CONSTANTS.SITE_NAME} | Entrepreneurship Cell`,
    description: SEO_CONSTANTS.DESCRIPTION,
    images: {
      url: `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.DEFAULT_IMAGE}`,
      alt: `${SEO_CONSTANTS.SITE_NAME} - Fostering Innovation and Entrepreneurship`,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // To be replaced with actual verification code
    yandex: "yandex-verification-code", // To be replaced with actual verification code
    yahoo: "yahoo-site-verification-code", // To be replaced with actual verification code
  },
  appleWebApp: {
    capable: true,
    title: SEO_CONSTANTS.SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  appLinks: {
    web: {
      url: SEO_CONSTANTS.SITE_URL,
      should_fallback: true,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  colorScheme: 'dark light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data schemas
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  // Use static asset URLs for server-side rendering
  // Fallback logic will be handled by the browser when assets fail to load
  const logoUrl = SEO_CONSTANTS.LOGO_URL;
  const ogImageUrl = SEO_CONSTANTS.DEFAULT_IMAGE;

  // Server-side logging setup (no useEffect needed)
  // Client-side logging will be handled by individual components

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon and App Icons with Fallback */}
        <link rel="icon" href={logoUrl} sizes="any" />
        <link rel="apple-touch-icon" href={logoUrl} />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional icon sizes for better compatibility */}
        <link rel="icon" type="image/png" sizes="16x16" href={logoUrl} />
        <link rel="icon" type="image/png" sizes="32x32" href={logoUrl} />
        <link rel="icon" type="image/png" sizes="96x96" href={logoUrl} />
        <link rel="icon" type="image/png" sizes="192x192" href={logoUrl} />
        
        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//vercel.app" />
        
        {/* Optimized critical image preloads */}
                
        {/* Font optimization - only essential Google Fonts connections */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        
        {/* Geo-location meta tags */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Lucknow, Uttar Pradesh, India" />
        <meta name="geo.position" content="26.8467;80.9462" />
        <meta name="ICBM" content="26.8467, 80.9462" />
        
        {/* Additional SEO meta tags */}
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="width" />
        
        {/* Security and Performance Headers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        
      </head>
      <body
        className={`${inter.className} ${poppins.variable} ${montserrat.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary
            fallback="page"
            showDetails={process.env.NODE_ENV === "development"}
          >
            {children}
          </ErrorBoundary>
        </ThemeProvider>
        
        {/* Client-side initialization */}
        <ClientInit />
        
        {/* Scroll to top on route change */}
        <ScrollToTop />
        
        {/* Optimized EmailJS Script Loading with Client Component */}
        <EmailJSScript />
      </body>
    </html>
  );
}
