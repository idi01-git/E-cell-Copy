// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// Dynamic import to prevent build errors when Sentry is not installed
let SentryClient: any = null;
try {
  // eslint-disable-next-line no-new-func
  const req = (Function('return globalThis.require')?.() || Function('return require')?.());
  SentryClient = req ? req('@sentry/nextjs') : null;
} catch {
  // Sentry not available, will skip initialization
}

// Log warning if DSN is missing in development
if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SENTRY_DSN) {
  console.warn('NEXT_PUBLIC_SENTRY_DSN environment variable is not set. Sentry will not be initialized.');
}

// Only initialize Sentry if it's available
if (SentryClient && process.env.NEXT_PUBLIC_SENTRY_DSN) {
  SentryClient.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    
    // Environment-based configuration
    environment: process.env.NODE_ENV || 'development',
    
    // Performance monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Session replay
    replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Disable debug in production
    debug: process.env.NODE_ENV === 'development',
    
    // Client-specific optimizations
    beforeSend(event: any) {
      // Filter out non-critical errors in production
      if (process.env.NODE_ENV === 'production') {
        // Skip certain error types that are not actionable
        if (event.exception?.values?.[0]?.type === 'ChunkLoadError') {
          return null;
        }
        
        // Skip network errors that are likely user connectivity issues
        if (event.exception?.values?.[0]?.type === 'NetworkError') {
          return null;
        }
        
        // Skip script loading errors from browser extensions
        if (event.exception?.values?.[0]?.value?.includes('chrome-extension://')) {
          return null;
        }
      }
      return event;
    },
    
    // Enhanced context for client-side errors
    initialScope: {
      tags: {
        component: "client",
        source: "browser",
      },
    },
  });
} else {
  console.log('Sentry not available, skipping client configuration');
}
