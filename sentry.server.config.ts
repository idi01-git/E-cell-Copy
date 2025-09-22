// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// Dynamic import to prevent build errors when Sentry is not installed
let SentryServer: any = null;
try {
  // eslint-disable-next-line no-new-func
  const req = (Function('return globalThis.require')?.() || Function('return require')?.());
  SentryServer = req ? req('@sentry/nextjs') : null;
} catch {
  // Sentry not available, will skip initialization
}

// Log warning if DSN is missing in development
if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_SENTRY_DSN) {
  console.warn('NEXT_PUBLIC_SENTRY_DSN environment variable is not set. Sentry will not be initialized.');
}

// Only initialize Sentry if it's available
if (SentryServer && process.env.NEXT_PUBLIC_SENTRY_DSN) {
  SentryServer.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    
    // Environment-based configuration
    environment: process.env.NODE_ENV || 'development',
    
    // Performance monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Disable debug in production
    debug: process.env.NODE_ENV === 'development',
    
    // Server-specific optimizations
    beforeSend(event: any) {
      // Filter out non-critical errors in production
      if (process.env.NODE_ENV === 'production') {
        // Skip certain error types that are not actionable
        if (event.exception?.values?.[0]?.type === 'ECONNRESET') {
          return null;
        }
        
        // Skip bot requests
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
    
    // Enhanced context for server-side errors
    initialScope: {
      tags: {
        component: "server",
        source: "nodejs",
      },
    },
  });
} else {
  console.log('Sentry not available, skipping server configuration');
}
