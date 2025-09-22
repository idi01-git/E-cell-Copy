// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// Dynamic import to prevent build errors when Sentry is not installed
let SentryEdge: any = null;
try {
  // eslint-disable-next-line no-new-func
  const req = (Function('return globalThis.require')?.() || Function('return require')?.());
  SentryEdge = req ? req('@sentry/nextjs') : null;
} catch {
  // Sentry not available, will skip initialization
}

// Log warning if DSN is missing in development
if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SENTRY_DSN) {
  console.warn('NEXT_PUBLIC_SENTRY_DSN environment variable is not set. Sentry will not be initialized.');
}

// Only initialize Sentry if it's available
if (SentryEdge && process.env.NEXT_PUBLIC_SENTRY_DSN) {
  SentryEdge.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    
    // Environment-based configuration
    environment: process.env.NODE_ENV || 'development',
    
    // Minimal configuration for edge runtime
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Edge-specific optimizations
    beforeSend(event: any) {
      // Filter out non-critical errors in production
      if (process.env.NODE_ENV === 'production') {
        // Skip certain error types that are not actionable
        if (event.exception?.values?.[0]?.type === 'ChunkLoadError') {
          return null;
        }
        
        // Skip bot user agents
        if (event.request?.headers?.["user-agent"]?.toLowerCase().includes("bot")) {
          return null;
        }
        
        // Skip health check endpoints
        if (event.request?.url?.includes("/health") || event.request?.url?.includes("/ping")) {
          return null;
        }
      }
      return event;
    },
    
    // Minimal context for edge runtime
    initialScope: {
      tags: {
        component: "edge",
        source: "edge-runtime",
      },
    },
    
    // Minimal settings for edge runtime constraints - environment configurable
    debug: false, // Always false for edge to prevent performance issues
    attachStacktrace: process.env.SENTRY_ATTACH_STACKTRACE === "true", // Disabled by default for performance
    maxBreadcrumbs: Number(process.env.SENTRY_MAX_BREADCRUMBS) || 10, // Very low limit for edge
    sendDefaultPii: process.env.SENTRY_SEND_DEFAULT_PII === "true",
    
    // Minimal timeout for edge runtime
    shutdownTimeout: 1000, // 1 second max
  });
}
