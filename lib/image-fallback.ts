import React from 'react';
import { logger } from '@/lib/logger';

// Asset types for different fallback strategies
export type AssetType = 'logo' | 'gallery' | 'og-image' | 'icon' | 'generic';

// Error types for better debugging
export type ImageError = {
  url: string;
  type: AssetType;
  error: string;
  timestamp: number;
  retryCount: number;
};

// Fallback configuration
export interface FallbackConfig {
  maxRetries: number;
  retryDelay: number;
  timeoutMs: number;
  enableCache: boolean;
}

// Default configuration
const DEFAULT_CONFIG: FallbackConfig = {
  maxRetries: 3,
  retryDelay: 1000,
  timeoutMs: 5000,
  enableCache: true,
};

// Cache for failed URLs to prevent repeated requests
const failedUrlCache = new Set<string>();
const retryCountCache = new Map<string, number>();

// Placeholder dimensions for different asset types
export const PLACEHOLDER_DIMENSIONS = {
  logo: { width: 200, height: 60 },
  gallery: { width: 400, height: 300 },
  'og-image': { width: 1200, height: 630 },
  icon: { width: 192, height: 192 },
  generic: { width: 300, height: 200 },
} as const;

// Brand colors for consistent placeholders
export const BRAND_COLORS = {
  primary: '#3B82F6',
  secondary: '#1E40AF',
  accent: '#F59E0B',
  background: '#F8FAFC',
  text: '#1F2937',
} as const;

/**
 * Generates an SVG placeholder for missing images
 */
export function generateSVGPlaceholder(
  type: AssetType,
  text?: string,
  customDimensions?: { width: number; height: number }
): string {
  const dimensions = customDimensions || PLACEHOLDER_DIMENSIONS[type];
  const { width, height } = dimensions;
  
  const placeholderText = text || getDefaultPlaceholderText(type);
  const fontSize = Math.min(width / 12, height / 6, 24);
  
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${BRAND_COLORS.background};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${BRAND_COLORS.primary};stop-opacity:0.1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg-gradient)" stroke="${BRAND_COLORS.primary}" stroke-width="2" stroke-dasharray="5,5" rx="8"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
            font-family="system-ui, -apple-system, sans-serif" 
            font-size="${fontSize}" 
            fill="${BRAND_COLORS.text}" 
            font-weight="500">
        ${placeholderText}
      </text>
      ${type === 'logo' ? generateLogoIcon(width, height) : ''}
      ${type === 'gallery' ? generateGalleryIcon(width, height) : ''}
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Generates a logo icon for logo placeholders
 */
function generateLogoIcon(width: number, height: number): string {
  const iconSize = Math.min(width / 8, height / 4, 32);
  const x = width / 2;
  const y = height / 2 - iconSize;
  
  return `
    <circle cx="${x}" cy="${y}" r="${iconSize / 2}" fill="${BRAND_COLORS.primary}" opacity="0.3"/>
    <text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" 
          font-family="system-ui" font-size="${iconSize / 2}" fill="${BRAND_COLORS.primary}" font-weight="bold">
      E
    </text>
  `;
}

/**
 * Generates a gallery icon for gallery placeholders
 */
function generateGalleryIcon(width: number, height: number): string {
  const iconSize = Math.min(width / 6, height / 4, 40);
  const x = width / 2;
  const y = height / 2 - iconSize / 2;
  
  return `
    <rect x="${x - iconSize / 2}" y="${y}" width="${iconSize}" height="${iconSize * 0.7}" 
          fill="none" stroke="${BRAND_COLORS.primary}" stroke-width="2" rx="4"/>
    <circle cx="${x - iconSize / 4}" cy="${y + iconSize / 4}" r="${iconSize / 8}" fill="${BRAND_COLORS.accent}"/>
    <path d="M${x - iconSize / 2 + 4} ${y + iconSize * 0.5} L${x} ${y + iconSize / 4} L${x + iconSize / 2 - 4} ${y + iconSize * 0.6}" 
          stroke="${BRAND_COLORS.primary}" stroke-width="2" fill="none"/>
  `;
}

/**
 * Gets default placeholder text for different asset types
 */
function getDefaultPlaceholderText(type: AssetType): string {
  switch (type) {
    case 'logo':
      return 'E-Cell Logo';
    case 'gallery':
      return 'Gallery Image';
    case 'og-image':
      return 'E-Cell IET Lucknow';
    case 'icon':
      return 'Icon';
    default:
      return 'Image';
  }
}

/**
 * Checks if an image URL exists and is accessible
 */
export async function checkImageExists(url: string, timeoutMs = 5000): Promise<boolean> {
  if (failedUrlCache.has(url)) {
    return false;
  }
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    const response = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      cache: 'no-cache',
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      return true;
    } else {
      failedUrlCache.add(url);
      return false;
    }
  } catch (error) {
    failedUrlCache.add(url);
    logger.warn('Image check failed', { url, error: error instanceof Error ? error.message : 'Unknown error' });
    return false;
  }
}

/**
 * Gets the first available image from a fallback chain
 */
export async function getAvailableImage(
  urls: string[],
  type: AssetType = 'generic',
  config: Partial<FallbackConfig> = {}
): Promise<string> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  for (const url of urls) {
    if (await checkImageExists(url, finalConfig.timeoutMs)) {
      return url;
    }
  }
  
  // All URLs failed, return generated placeholder
  logger.info('All image URLs failed, using generated placeholder', { urls, type });
  return generateSVGPlaceholder(type);
}

/**
 * Creates a fallback chain for different asset types
 */
export function createFallbackChain(originalUrl: string, type: AssetType): string[] {
  const chain: string[] = [originalUrl];
  
  switch (type) {
    case 'logo':
      chain.push('/ecell-logo.png', '/logo.png', '/favicon.ico');
      break;
    case 'gallery':
      // Try different formats
      const basePath = originalUrl.replace(/\.[^/.]+$/, '');
      chain.push(
        `${basePath}.jpg`,
        `${basePath}.jpeg`,
        `${basePath}.png`,
        '/gallery/placeholder.webp'
      );
      break;
    case 'og-image':
      chain.push('/og-default.jpg', '/homepage.png', '/ecell-logo.png');
      break;
    case 'icon':
      chain.push('/favicon.ico', '/ecell-logo.png');
      break;
  }
  
  return chain.filter((url, index, arr) => arr.indexOf(url) === index); // Remove duplicates
}

/**
 * Enhanced image loading with retry mechanism
 */
export async function loadImageWithRetry(
  url: string,
  type: AssetType = 'generic',
  config: Partial<FallbackConfig> = {}
): Promise<string> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const fallbackChain = createFallbackChain(url, type);
  
  let lastError: Error | null = null;
  
  for (const imageUrl of fallbackChain) {
    const retryCount = retryCountCache.get(imageUrl) || 0;
    
    if (retryCount >= finalConfig.maxRetries) {
      continue; // Skip URLs that have exceeded retry limit
    }
    
    try {
      const exists = await checkImageExists(imageUrl, finalConfig.timeoutMs);
      if (exists) {
        // Reset retry count on success
        retryCountCache.delete(imageUrl);
        return imageUrl;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      // Increment retry count
      retryCountCache.set(imageUrl, retryCount + 1);
      
      // Log error for monitoring
      logger.warn('Image load attempt failed', {
        url: imageUrl,
        type,
        retryCount: retryCount + 1,
        error: lastError.message,
      });
      
      // Wait before retry (exponential backoff)
      if (retryCount < finalConfig.maxRetries - 1) {
        await new Promise(resolve => 
          setTimeout(resolve, finalConfig.retryDelay * Math.pow(2, retryCount))
        );
      }
    }
  }
  
  // All attempts failed, log error and return placeholder
  const errorDetails: ImageError = {
    url,
    type,
    error: lastError?.message || 'All fallback URLs failed',
    timestamp: Date.now(),
    retryCount: retryCountCache.get(url) || 0,
  };
  
  logger.error('Image loading completely failed, using placeholder', {
    ...errorDetails,
    timestamp: new Date(errorDetails.timestamp).toISOString()
  });
  
  return generateSVGPlaceholder(type, `${getDefaultPlaceholderText(type)}\n(Image not available)`);
}

/**
 * Preloads critical images with fallback handling
 */
export async function preloadCriticalImages(urls: string[], type: AssetType = 'generic'): Promise<void> {
  const preloadPromises = urls.map(async (url) => {
    try {
      const availableUrl = await getAvailableImage([url], type);
      
      // Create link element for preloading
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = availableUrl;
      document.head.appendChild(link);
      
      logger.debug('Image preloaded successfully', { url, availableUrl, type });
    } catch (error) {
      logger.warn('Image preload failed', { 
        url, 
        type, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });
  
  await Promise.allSettled(preloadPromises);
}

/**
 * Clears the failed URL cache (useful for testing or manual retry)
 */
export function clearFailedUrlCache(): void {
  failedUrlCache.clear();
  retryCountCache.clear();
  logger.info('Image fallback cache cleared');
}

/**
 * Gets statistics about failed image loads
 */
export function getFailureStats(): {
  failedUrls: string[];
  retryAttempts: Record<string, number>;
  totalFailures: number;
} {
  return {
    failedUrls: Array.from(failedUrlCache),
    retryAttempts: Object.fromEntries(retryCountCache),
    totalFailures: failedUrlCache.size,
  };
}

/**
 * React hook for image loading with fallback
 */
export function useImageWithFallback(
  url: string, 
  type: AssetType = 'generic',
  config: Partial<FallbackConfig> = {}
) {
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    let isMounted = true;
    
    const loadImage = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const availableUrl = await loadImageWithRetry(url, type, config);
        
        if (isMounted) {
          setImageUrl(availableUrl);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load image';
          setError(errorMessage);
          setImageUrl(generateSVGPlaceholder(type));
          setIsLoading(false);
        }
      }
    };
    
    loadImage();
    
    return () => {
      isMounted = false;
    };
  }, [url, type, config]);
  
  return { imageUrl, isLoading, error };
}
