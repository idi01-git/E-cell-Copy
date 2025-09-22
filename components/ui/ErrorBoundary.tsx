"use client";

import React, { Component, ReactNode, ErrorInfo } from "react";
import { logger } from "@/lib/logger";

import { Button } from "@/components/ui/button";
import { RefreshCw, Home, AlertTriangle, Bug, ArrowLeft } from "lucide-react";

// Error boundary state interface
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
  retryCount: number;
}

// Error boundary props interface
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: "minimal" | "section" | "page" | "async";
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number>;
  isolate?: boolean;
  showDetails?: boolean;
}

// Fallback UI component props
interface FallbackUIProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
  onRetry: () => void;
  onReport: () => void;
  onGoHome: () => void;
  retryCount: number;
  variant: "minimal" | "section" | "page" | "async";
  showDetails: boolean;
}

/**
 * Minimal Error Fallback - Simple error message for small components
 */
const MinimalErrorFallback: React.FC<FallbackUIProps> = ({ 
  onRetry, 
  retryCount 
}) => (
  <div className="flex items-center justify-center p-4 text-center">
    <div className="space-y-2">
      <AlertTriangle className="h-6 w-6 text-amber-500 mx-auto" />
      <p className="text-sm text-muted-foreground">Something went wrong</p>
      {retryCount < 3 && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="text-xs"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Try Again
        </Button>
      )}
    </div>
  </div>
);

/**
 * Section Error Fallback - Styled fallback for page sections
 */
const SectionErrorFallback: React.FC<FallbackUIProps> = ({ 
  error, 
  errorId, 
  onRetry, 
  onReport, 
  retryCount,
  showDetails 
}) => (
  <div className="flex items-center justify-center min-h-[200px] p-8 border border-dashed border-muted-foreground/20 rounded-lg bg-muted/5">
    <div className="text-center space-y-4 max-w-md">
      <div className="space-y-2">
        <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto" />
        <h3 className="text-lg font-semibold">Section Unavailable</h3>
        <p className="text-muted-foreground">
          This section encountered an error and couldn&apos;t load properly.
        </p>
      </div>
      
      {showDetails && error && (
        <details className="text-left bg-muted/20 p-3 rounded text-xs">
          <summary className="cursor-pointer font-medium mb-2">Error Details</summary>
          <pre className="whitespace-pre-wrap break-words">
            {error.message}
            {errorId && `\nError ID: ${errorId}`}
          </pre>
        </details>
      )}
      
      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {retryCount < 3 && (
          <Button variant="outline" onClick={onRetry}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
        <Button variant="ghost" onClick={onReport}>
          <Bug className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </div>
    </div>
  </div>
);

/**
 * Page Error Fallback - Full-page error fallback for critical failures
 */
const PageErrorFallback: React.FC<FallbackUIProps> = ({ 
  error, 
  errorId, 
  onRetry, 
  onReport, 
  onGoHome, 
  retryCount,
  showDetails 
}) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-background">
    <div className="text-center space-y-6 max-w-lg">
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
          <p className="text-muted-foreground">
            We encountered an unexpected error. Our team has been notified and is working on a fix.
          </p>
        </div>
      </div>
      
      {showDetails && error && (
        <details className="text-left bg-muted/10 p-4 rounded-lg text-sm">
          <summary className="cursor-pointer font-medium mb-3">Technical Details</summary>
          <div className="space-y-2">
            <div>
              <strong>Error:</strong> {error.message}
            </div>
            {errorId && (
              <div>
                <strong>Error ID:</strong> <code className="bg-muted px-1 rounded">{errorId}</code>
              </div>
            )}
            <div>
              <strong>Time:</strong> {new Date().toLocaleString()}
            </div>
          </div>
        </details>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={onGoHome} className="min-w-[120px]">
          <Home className="h-4 w-4 mr-2" />
          Go Home
        </Button>
        {retryCount < 3 && (
          <Button variant="outline" onClick={onRetry}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
        <Button variant="ghost" onClick={onReport}>
          <Bug className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </div>
    </div>
  </div>
);

/**
 * Async Error Fallback - Specialized fallback for async operations
 */
const AsyncErrorFallback: React.FC<FallbackUIProps> = ({ 
  onRetry, 
  retryCount 
}) => (
  <div className="flex items-center justify-center p-6">
    <div className="text-center space-y-3">
      <div className="animate-pulse">
        <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto" />
      </div>
      <div className="space-y-2">
        <p className="font-medium">Loading Failed</p>
        <p className="text-sm text-muted-foreground">
          Unable to load content. Please try again.
        </p>
      </div>
      {retryCount < 3 && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      )}
    </div>
  </div>
);

/**
 * Main Error Boundary Component
 * Provides comprehensive error handling with user-friendly fallbacks
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Generate unique error ID
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Update state with error details
    this.setState({
      errorInfo,
      errorId,
    });

    // Log error with enhanced context
    logger.captureException(error, {
      category: "component_error",
      severity: "high",
      component: this.constructor.name,
      errorId,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      fingerprint: [error.name, error.message],
      retryCount: this.state.retryCount,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Error already reported via logger.captureException above
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetOnPropsChange, resetKeys } = this.props;
    const { hasError } = this.state;

    // Reset error boundary if props change and resetOnPropsChange is true
    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }

    // Reset error boundary if resetKeys change
    if (hasError && resetKeys && prevProps.resetKeys !== resetKeys) {
      const hasResetKeyChanged = resetKeys.some((key, index) => 
        prevProps.resetKeys?.[index] !== key
      );
      
      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  resetErrorBoundary = () => {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
    });
  };

  handleRetry = () => {
    const { retryCount } = this.state;
    
    // Increment retry count
    this.setState({ retryCount: retryCount + 1 });
    
    // Implement exponential backoff for retries
    const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Max 10 seconds
    
    this.retryTimeoutId = setTimeout(() => {
      this.resetErrorBoundary();
    }, delay);

    // Log retry attempt
    logger.info("Error boundary retry attempted", {
      component: this.constructor.name,
      retryCount: retryCount + 1,
      delay,
    });
  };

  handleReport = () => {
    const { error, errorId } = this.state;
    
    // Open feedback or support system
    // This could be integrated with a feedback widget or support system
    if (typeof window !== "undefined") {
      const subject = encodeURIComponent(`Error Report: ${error?.message || "Unknown Error"}`);
      const body = encodeURIComponent(`
Error ID: ${errorId}
Time: ${new Date().toISOString()}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}

Please describe what you were doing when this error occurred:
      `);
      
      window.open(`mailto:support@ecell.com?subject=${subject}&body=${body}`, "_blank");
    }

    // Log report action
    logger.info("Error report initiated", {
      errorId: errorId || undefined,
      component: this.constructor.name,
    });
  };

  handleGoHome = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  render() {
    const { hasError, error, errorInfo, errorId, retryCount } = this.state;
    const { children, fallback = "section", showDetails = process.env.NODE_ENV === "development" } = this.props;

    if (hasError) {
      const fallbackProps: FallbackUIProps = {
        error,
        errorInfo,
        errorId,
        onRetry: this.handleRetry,
        onReport: this.handleReport,
        onGoHome: this.handleGoHome,
        retryCount,
        variant: fallback,
        showDetails,
      };

      // Render appropriate fallback UI based on variant
      switch (fallback) {
        case "minimal":
          return <MinimalErrorFallback {...fallbackProps} />;
        case "section":
          return <SectionErrorFallback {...fallbackProps} />;
        case "page":
          return <PageErrorFallback {...fallbackProps} />;
        case "async":
          return <AsyncErrorFallback {...fallbackProps} />;
        default:
          return <SectionErrorFallback {...fallbackProps} />;
      }
    }

    return children;
  }
}

// Convenience wrapper components for different use cases
export const MinimalErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback="minimal">{children}</ErrorBoundary>
);

export const SectionErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback="section">{children}</ErrorBoundary>
);

export const PageErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback="page">{children}</ErrorBoundary>
);

export const AsyncErrorBoundary: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary fallback="async">{children}</ErrorBoundary>
);

// Export default
export default ErrorBoundary;
