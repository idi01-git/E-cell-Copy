import { isDevelopment } from "@/lib/utils";
import { getOptionalSentry } from '@/lib/optional-sentry';

const Sentry = getOptionalSentry();

// Performance helper for cross-environment compatibility
function getNow(): number {
  // Browser environment
  if (typeof window !== 'undefined' && window.performance) {
    return performance.now();
  }
  
  // Node.js environment - check if performance is available globally
  if (typeof globalThis !== 'undefined' && globalThis.performance) {
    return globalThis.performance.now();
  }
  
  // Fallback to Date.now() for compatibility
  return Date.now();
}

// Types for structured logging
export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  [key: string]: any;
  // Enhanced context properties
  component?: string;
  function?: string;
  userId?: string;
  sessionId?: string;
  errorId?: string;
  timestamp?: string;
  userAgent?: string;
  url?: string;
  performance?: {
    duration?: number;
    memoryUsage?: number;
  };
}

// Error categories for better organization
export type ErrorCategory = 
  | "component_error"
  | "api_error" 
  | "network_error"
  | "validation_error"
  | "authentication_error"
  | "performance_error"
  | "user_error"
  | "system_error";

// Enhanced error context
export interface ErrorContext extends LogContext {
  category?: ErrorCategory;
  severity?: "low" | "medium" | "high" | "critical";
  stack?: string;
  fingerprint?: string[];
}

// Enhanced logger interface
interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: ErrorContext): void;
  // Enhanced methods
  captureException(error: Error, context?: ErrorContext): void;
  captureMessage(message: string, level?: LogLevel, context?: LogContext): void;
  setUser(user: { id?: string; email?: string; username?: string }): void;
  setTag(key: string, value: string): void;
  setContext(key: string, context: any): void;
  // Performance monitoring
  startTimer(name: string): () => void;
  measurePerformance<T>(name: string, fn: () => T): T;
}

// Error rate limiting to prevent spam
const errorCounts = new Map<string, { count: number; lastSeen: number }>();
const ERROR_RATE_LIMIT = 5; // Max 5 errors per minute per error type
const RATE_LIMIT_WINDOW = 60000; // 1 minute

function shouldLogError(errorKey: string): boolean {
  const now = Date.now();
  const errorData = errorCounts.get(errorKey);
  
  if (!errorData) {
    errorCounts.set(errorKey, { count: 1, lastSeen: now });
    return true;
  }
  
  // Reset count if outside window
  if (now - errorData.lastSeen > RATE_LIMIT_WINDOW) {
    errorCounts.set(errorKey, { count: 1, lastSeen: now });
    return true;
  }
  
  // Check if under rate limit
  if (errorData.count < ERROR_RATE_LIMIT) {
    errorData.count++;
    errorData.lastSeen = now;
    return true;
  }
  
  return false;
}

// Development logger implementation
const developmentLogger: Logger = {
  debug: (message: string, context?: LogContext) => {
    if (context) {
      console.log(`[DEBUG] ${message}`, context);
    } else {
      console.log(`[DEBUG] ${message}`);
    }
  },
  info: (message: string, context?: LogContext) => {
    if (context) {
      console.info(`[INFO] ${message}`, context);
    } else {
      console.info(`[INFO] ${message}`);
    }
  },
  warn: (message: string, context?: LogContext) => {
    if (context) {
      console.warn(`[WARN] ${message}`, context);
    } else {
      console.warn(`[WARN] ${message}`);
    }
  },
  error: (message: string, context?: ErrorContext) => {
    if (context) {
      console.error(`[ERROR] ${message}`, context);
    } else {
      console.error(`[ERROR] ${message}`);
    }
  },
  captureException: (error: Error, context?: ErrorContext) => {
    console.error(`[EXCEPTION] ${error.message}`, { error, context });
  },
  captureMessage: (message: string, level: LogLevel = "info", context?: LogContext) => {
    console.log(`[${level.toUpperCase()}] ${message}`, context);
  },
  setUser: (user) => {
    console.log(`[USER] Set user context:`, user);
  },
  setTag: (key: string, value: string) => {
    console.log(`[TAG] ${key}: ${value}`);
  },
  setContext: (key: string, context: any) => {
    console.log(`[CONTEXT] ${key}:`, context);
  },
  startTimer: (name: string) => {
    const startTime = getNow();
    return () => {
      const duration = getNow() - startTime;
      console.log(`[TIMER] ${name}: ${duration.toFixed(2)}ms`);
    };
  },
  measurePerformance: <T>(name: string, fn: () => T): T => {
    const startTime = getNow();
    const result = fn();
    const duration = getNow() - startTime;
    console.log(`[PERFORMANCE] ${name}: ${duration.toFixed(2)}ms`);
    return result;
  },
};

// Production logger implementation with optional Sentry integration
const productionLogger: Logger = {
  debug: () => {
    // Debug logs are not sent to Sentry in production
  },
  info: (message: string, context?: LogContext) => {
    if (shouldLogError(`info_${message}`)) {
      if (Sentry) {
        Sentry.withScope((scope: any) => {
          if (context) {
            scope.setContext("info_context", context);
          }
          Sentry.captureMessage(message, "info");
        });
      } else {
        // Fallback to console logging when Sentry is not available
        console.info(`[INFO] ${message}`, context);
      }
    }
  },
  warn: (message: string, context?: LogContext) => {
    if (shouldLogError(`warn_${message}`)) {
      if (Sentry) {
        Sentry.withScope((scope: any) => {
          if (context) {
            scope.setContext("warn_context", context);
          }
          Sentry.captureMessage(message, "warning");
        });
      } else {
        // Fallback to console logging when Sentry is not available
        console.warn(`[WARN] ${message}`, context);
      }
    }
  },
  error: (message: string, context?: ErrorContext) => {
    const errorKey = `error_${message}`;
    if (shouldLogError(errorKey)) {
      if (Sentry) {
        Sentry.withScope((scope: any) => {
          if (context) {
            scope.setContext("error_context", context);
            
            if (context.category) {
              scope.setTag("error_category", context.category);
            }
            if (context.severity) {
              scope.setTag("severity", context.severity);
            }
            if (context.component) {
              scope.setTag("component", context.component);
            }
            if (context.fingerprint) {
              scope.setFingerprint(context.fingerprint);
            }
          }
          Sentry.captureMessage(message, "error");
        });
      } else {
        // Fallback to console logging when Sentry is not available
        console.error(`[ERROR] ${message}`, context);
      }
    }
  },
  captureException: (error: Error, context?: ErrorContext) => {
    const errorKey = `exception_${error.message}`;
    if (shouldLogError(errorKey)) {
      if (Sentry) {
        Sentry.withScope((scope: any) => {
          if (context) {
            scope.setContext("exception_context", context);
            
            if (context.category) {
              scope.setTag("error_category", context.category);
            }
            if (context.severity) {
              scope.setTag("severity", context.severity);
            }
            if (context.component) {
              scope.setTag("component", context.component);
            }
            if (context.fingerprint) {
              scope.setFingerprint(context.fingerprint);
            }
          }
          Sentry.captureException(error);
        });
      } else {
        // Fallback to console logging when Sentry is not available
        console.error(`[EXCEPTION] ${error.message}`, { error, context });
      }
    }
  },
  captureMessage: (message: string, level: LogLevel = "info", context?: LogContext) => {
    const messageKey = `message_${level}_${message}`;
    if (shouldLogError(messageKey)) {
      if (Sentry) {
        Sentry.withScope((scope: any) => {
          if (context) {
            scope.setContext("message_context", context);
          }
          
          const sentryLevel = level === "debug" ? "debug" 
            : level === "info" ? "info"
            : level === "warn" ? "warning" 
            : "error";
          
          Sentry.captureMessage(message, sentryLevel);
        });
      } else {
        // Fallback to console logging when Sentry is not available
        console.log(`[${level.toUpperCase()}] ${message}`, context);
      }
    }
  },
  setUser: (user) => {
    if (Sentry) {
      Sentry.setUser(user);
    } else {
      console.log(`[USER] Set user context:`, user);
    }
  },
  setTag: (key: string, value: string) => {
    if (Sentry) {
      Sentry.setTag(key, value);
    } else {
      console.log(`[TAG] ${key}: ${value}`);
    }
  },
  setContext: (key: string, context: any) => {
    if (Sentry) {
      Sentry.setContext(key, context);
    } else {
      console.log(`[CONTEXT] ${key}:`, context);
    }
  },
  startTimer: (name: string) => {
    const startTime = getNow();
    return () => {
      const duration = getNow() - startTime;
      if (Sentry) {
        // Report performance metrics to Sentry
        Sentry.addBreadcrumb({
          category: "performance",
          message: `Timer ${name} completed`,
          level: "info",
          data: { duration: `${duration.toFixed(2)}ms` }
        });
      } else {
        console.log(`[TIMER] ${name}: ${duration.toFixed(2)}ms`);
      }
    };
  },
  measurePerformance: <T>(name: string, fn: () => T): T => {
    if (Sentry) {
      const transaction = Sentry.startTransaction({ name, op: "performance" });
      const startTime = getNow();
      
      try {
        const result = fn();
        const duration = getNow() - startTime;
        
        transaction.setData("duration", duration);
        transaction.setStatus("ok");
        
        return result;
      } catch (error) {
        transaction.setStatus("internal_error");
        throw error;
      } finally {
        transaction.finish();
      }
    } else {
      // Fallback performance measurement without Sentry
      const startTime = getNow();
      const result = fn();
      const duration = getNow() - startTime;
      console.log(`[PERFORMANCE] ${name}: ${duration.toFixed(2)}ms`);
      return result;
    }
  },
};

// Export the appropriate logger based on environment
export const logger: Logger = isDevelopment() ? developmentLogger : productionLogger;
