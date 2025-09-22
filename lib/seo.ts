import { projects } from '@/data';

// SEO Constants
export const SEO_CONSTANTS = {
  SITE_NAME: 'E-Cell IET Lucknow',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://ecell-iet-lucknow.vercel.app',
  ORGANIZATION_NAME: 'Entrepreneurship Cell - IET Lucknow',
  DESCRIPTION: 'E-Cell IET Lucknow - Fostering entrepreneurship and innovation among students. Join us for events, workshops, and startup guidance.',
  KEYWORDS: 'entrepreneurship, startup, innovation, IET Lucknow, business, technology, students, incubation, mentorship',
  AUTHOR: 'E-Cell IET Lucknow',
  TWITTER_HANDLE: '@ecell_iet',
  FACEBOOK_URL: 'https://facebook.com/ecellietlucknow',
  LINKEDIN_URL: 'https://linkedin.com/company/ecell-iet-lucknow',
  INSTAGRAM_URL: 'https://instagram.com/ecell_iet_lucknow',
  EMAIL: 'contact@ecellietlucknow.com',
  PHONE: '+91-9876543210',
  ADDRESS: {
    streetAddress: 'IET Campus, Sitapur Road',
    addressLocality: 'Lucknow',
    addressRegion: 'Uttar Pradesh',
    postalCode: '226021',
    addressCountry: 'IN'
  },
  LOGO_URL: '/ecell-logo.png',
  DEFAULT_IMAGE: '/homepage.png',
  FALLBACK_LOGO_URL: '/placeholder-logo.png',
  FALLBACK_OG_IMAGE: '/placeholder-og.jpg',
  GALLERY_PLACEHOLDER: '/gallery/placeholder.webp',
  IMAGE_DIMENSIONS: {
    width: 1200,
    height: 630
  }
};

// TypeScript Interfaces
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'blog';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export interface BlogSEOData {
  id: number;
  title: string;
  description: string;
  image: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  url: string;
  readUrl: string;
}

export interface StructuredDataSchema {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// Meta Tag Generators
export function generatePageMetadata(page: SEOMetadata): Record<string, string> {
  const metadata: Record<string, string> = {
    title: `${page.title} | ${SEO_CONSTANTS.SITE_NAME}`,
    description: page.description,
    keywords: page.keywords || SEO_CONSTANTS.KEYWORDS,
    author: page.author || SEO_CONSTANTS.AUTHOR,
    'og:title': page.title,
    'og:description': page.description,
    'og:type': page.ogType || 'website',
    'og:url': page.canonical || SEO_CONSTANTS.SITE_URL,
    'og:site_name': SEO_CONSTANTS.SITE_NAME,
    'og:image': page.ogImage || `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.DEFAULT_IMAGE}`,
    'og:image:width': SEO_CONSTANTS.IMAGE_DIMENSIONS.width.toString(),
    'og:image:height': SEO_CONSTANTS.IMAGE_DIMENSIONS.height.toString(),
    'og:image:alt': `${page.title} - ${SEO_CONSTANTS.SITE_NAME}`,
    'twitter:card': 'summary_large_image',
    'twitter:site': SEO_CONSTANTS.TWITTER_HANDLE,
    'twitter:creator': SEO_CONSTANTS.TWITTER_HANDLE,
    'twitter:title': page.title,
    'twitter:description': page.description,
    'twitter:image': page.ogImage || `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.DEFAULT_IMAGE}`,
    'twitter:image:alt': `${page.title} - ${SEO_CONSTANTS.SITE_NAME}`,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    googlebot: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    'format-detection': 'telephone=no',
    'theme-color': '#000000',
    'msapplication-TileColor': '#000000',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent'
  };

  if (page.canonical) {
    metadata.canonical = page.canonical;
  }

  if (page.publishedTime) {
    metadata['article:published_time'] = page.publishedTime;
    metadata['og:type'] = 'article';
  }

  if (page.modifiedTime) {
    metadata['article:modified_time'] = page.modifiedTime;
  }

  if (page.author) {
    metadata['article:author'] = page.author;
  }

  if (page.section) {
    metadata['article:section'] = page.section;
  }

  if (page.tags && page.tags.length > 0) {
    metadata['article:tag'] = page.tags.join(', ');
  }

  return metadata;
}

export function generateCanonicalUrl(path: string): string {
  return `${SEO_CONSTANTS.SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// JSON-LD Schema Generators
export function generateOrganizationSchema(): StructuredDataSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SEO_CONSTANTS.SITE_URL}/#organization`,
    name: SEO_CONSTANTS.ORGANIZATION_NAME,
    alternateName: SEO_CONSTANTS.SITE_NAME,
    url: SEO_CONSTANTS.SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.LOGO_URL}`,
      width: 200,
      height: 200
    },
    description: SEO_CONSTANTS.DESCRIPTION,
    foundingDate: '2020',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONSTANTS.ADDRESS.streetAddress,
      addressLocality: SEO_CONSTANTS.ADDRESS.addressLocality,
      addressRegion: SEO_CONSTANTS.ADDRESS.addressRegion,
      postalCode: SEO_CONSTANTS.ADDRESS.postalCode,
      addressCountry: SEO_CONSTANTS.ADDRESS.addressCountry
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SEO_CONSTANTS.PHONE,
      contactType: 'customer service',
      email: SEO_CONSTANTS.EMAIL
    },
    sameAs: [
      SEO_CONSTANTS.FACEBOOK_URL,
      SEO_CONSTANTS.LINKEDIN_URL,
      SEO_CONSTANTS.INSTAGRAM_URL
    ],
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: 'Institute of Engineering and Technology, Lucknow',
      url: 'https://ietlucknow.ac.in'
    }
  };
}

export function generateWebsiteSchema(): StructuredDataSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SEO_CONSTANTS.SITE_URL}/#website`,
    url: SEO_CONSTANTS.SITE_URL,
    name: SEO_CONSTANTS.SITE_NAME,
    description: SEO_CONSTANTS.DESCRIPTION,
    publisher: {
      '@id': `${SEO_CONSTANTS.SITE_URL}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_CONSTANTS.SITE_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'en-US'
  };
}

export function generateLocalBusinessSchema(): StructuredDataSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SEO_CONSTANTS.SITE_URL}/#localbusiness`,
    name: SEO_CONSTANTS.ORGANIZATION_NAME,
    alternateName: SEO_CONSTANTS.SITE_NAME,
    description: SEO_CONSTANTS.DESCRIPTION,
    url: SEO_CONSTANTS.SITE_URL,
    telephone: SEO_CONSTANTS.PHONE,
    email: SEO_CONSTANTS.EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SEO_CONSTANTS.ADDRESS.streetAddress,
      addressLocality: SEO_CONSTANTS.ADDRESS.addressLocality,
      addressRegion: SEO_CONSTANTS.ADDRESS.addressRegion,
      postalCode: SEO_CONSTANTS.ADDRESS.postalCode,
      addressCountry: SEO_CONSTANTS.ADDRESS.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.8467,
      longitude: 80.9462
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00'
    },
    sameAs: [
      SEO_CONSTANTS.FACEBOOK_URL,
      SEO_CONSTANTS.LINKEDIN_URL,
      SEO_CONSTANTS.INSTAGRAM_URL
    ],
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: 'Institute of Engineering and Technology, Lucknow',
      url: 'https://ietlucknow.ac.in'
    }
  };
}

export function generateBlogPostingSchema(blog: BlogSEOData): StructuredDataSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SEO_CONSTANTS.SITE_URL}${blog.url}#article`,
    headline: blog.title,
    description: blog.description,
    image: {
      '@type': 'ImageObject',
      url: `${SEO_CONSTANTS.SITE_URL}${blog.image}`,
      width: SEO_CONSTANTS.IMAGE_DIMENSIONS.width,
      height: SEO_CONSTANTS.IMAGE_DIMENSIONS.height
    },
    author: {
      '@type': 'Organization',
      '@id': `${SEO_CONSTANTS.SITE_URL}/#organization`,
      name: SEO_CONSTANTS.ORGANIZATION_NAME
    },
    publisher: {
      '@id': `${SEO_CONSTANTS.SITE_URL}/#organization`
    },
    datePublished: new Date(blog.publishedTime).toISOString(),
    dateModified: blog.modifiedTime ? new Date(blog.modifiedTime).toISOString() : new Date(blog.publishedTime).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SEO_CONSTANTS.SITE_URL}${blog.url}`
    },
    url: `${SEO_CONSTANTS.SITE_URL}${blog.url}`,
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SEO_CONSTANTS.SITE_URL}/blogs#blog`,
      name: `${SEO_CONSTANTS.SITE_NAME} Blog`,
      description: 'Insights and articles on entrepreneurship, startups, and innovation'
    },
    articleSection: 'Entrepreneurship',
    keywords: ['entrepreneurship', 'startup', 'business', 'innovation', 'technology'],
    wordCount: 1500,
    commentCount: 0,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.article-content']
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): StructuredDataSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SEO_CONSTANTS.SITE_URL}${item.url}`
    }))
  };
}

export function generateArticleSchema(blog: BlogSEOData): StructuredDataSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SEO_CONSTANTS.SITE_URL}${blog.readUrl}#article`,
    headline: blog.title,
    description: blog.description,
    image: {
      '@type': 'ImageObject',
      url: `${SEO_CONSTANTS.SITE_URL}${blog.image}`,
      width: SEO_CONSTANTS.IMAGE_DIMENSIONS.width,
      height: SEO_CONSTANTS.IMAGE_DIMENSIONS.height
    },
    author: {
      '@type': 'Organization',
      '@id': `${SEO_CONSTANTS.SITE_URL}/#organization`,
      name: SEO_CONSTANTS.ORGANIZATION_NAME
    },
    publisher: {
      '@id': `${SEO_CONSTANTS.SITE_URL}/#organization`
    },
    datePublished: new Date(blog.publishedTime).toISOString(),
    dateModified: blog.modifiedTime ? new Date(blog.modifiedTime).toISOString() : new Date(blog.publishedTime).toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SEO_CONSTANTS.SITE_URL}${blog.readUrl}`
    },
    url: `${SEO_CONSTANTS.SITE_URL}${blog.readUrl}`,
    articleSection: 'Entrepreneurship',
    keywords: ['entrepreneurship', 'startup', 'business', 'innovation'],
    wordCount: 2000,
    inLanguage: 'en-US'
  };
}

// Blog Data Transformation
export function transformProjectsToSEOData(): BlogSEOData[] {
  return projects.map(project => ({
    id: project.id,
    title: project.title,
    description: project.des,
    image: project.img,
    publishedTime: project.publicationDate,
    author: SEO_CONSTANTS.AUTHOR,
    url: `/blogs/${project.id}`,
    readUrl: `/blogs/${project.id}/read`
  }));
}

// Page-specific SEO Data
export const PAGE_SEO_DATA = {
  home: {
    title: 'Home',
    description: SEO_CONSTANTS.DESCRIPTION,
    keywords: SEO_CONSTANTS.KEYWORDS,
    ogType: 'website' as const
  },
  blogs: {
    title: 'Blogs & Articles',
    description: 'Explore our latest insights on entrepreneurship, startups, innovation, and business strategies. Learn from industry experts and successful entrepreneurs.',
    keywords: 'entrepreneurship blogs, startup articles, business insights, innovation stories, entrepreneur resources',
    ogType: 'website' as const
  },
  gallery: {
    title: 'Gallery',
    description: 'Explore our photo gallery showcasing E-Cell events, workshops, seminars, and memorable moments from our entrepreneurship journey.',
    keywords: 'E-Cell events, entrepreneurship workshops, startup seminars, IET Lucknow gallery, student activities',
    ogType: 'website' as const
  },
  about: {
    title: 'About E-Cell IET Lucknow',
    description: 'Learn about E-Cell IET Lucknow - our mission to foster entrepreneurship, support startups, and create an innovation ecosystem for students.',
    keywords: 'about E-Cell, entrepreneurship cell, IET Lucknow, startup incubation, student entrepreneurship',
    ogType: 'website' as const
  }
};

// Utility Functions
export function getBlogSEOData(blogId: number): BlogSEOData | null {
  const blogs = transformProjectsToSEOData();
  return blogs.find(blog => blog.id === blogId) || null;
}

export function getAllBlogSEOData(): BlogSEOData[] {
  return transformProjectsToSEOData();
}

export function generateMetaDescription(content: string, maxLength: number = 160): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength - 3).trim() + '...';
}

export function generateKeywords(baseKeywords: string[], additionalKeywords: string[] = []): string {
  return [...baseKeywords, ...additionalKeywords].join(', ');
}

export function formatDateForSEO(dateString: string): string {
  return new Date(dateString).toISOString();
}

// Asset Management Functions
export async function checkAssetExists(url: string, timeoutMs = 5000): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-cache',
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
}

export async function getAvailableAsset(urls: string[]): Promise<string> {
  for (const url of urls) {
    if (await checkAssetExists(url)) {
      return url;
    }
  }
  
  // Return the first URL as fallback if none are available
  return urls[0] || '';
}

export function generateFallbackUrl(assetType: 'logo' | 'og-image' | 'gallery' | 'icon'): string {
  switch (assetType) {
    case 'logo':
      return SEO_CONSTANTS.FALLBACK_LOGO_URL;
    case 'og-image':
      return SEO_CONSTANTS.FALLBACK_OG_IMAGE;
    case 'gallery':
      return SEO_CONSTANTS.GALLERY_PLACEHOLDER;
    case 'icon':
      return SEO_CONSTANTS.FALLBACK_LOGO_URL;
    default:
      return SEO_CONSTANTS.DEFAULT_IMAGE;
  }
}
