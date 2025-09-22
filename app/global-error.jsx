"use client";

import { logger } from "@/lib/logger";
import { useEffect, useState } from "react";

export default function GlobalError({ error, reset }) {
  const [errorId, setErrorId] = useState(null);

  useEffect(() => {
    // Generate unique error ID
    const id = `global_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setErrorId(id);

    // Log error with enhanced context
    logger.captureException(error, {
      category: "system_error",
      severity: "critical",
      component: "GlobalError",
      function: "render",
      errorId: id,
      stack: error?.stack,
      fingerprint: ["global_error", error?.name || "UnknownError", error?.message || "Unknown"],
    });

    // Error already reported via logger.captureException above

    if (process.env.NODE_ENV !== "production") {
      // Surface the error in dev for easier debugging
      // eslint-disable-next-line no-console
      console.error("Global error:", error);
    }
  }, [error]);

  const handleReportIssue = () => {
    if (typeof window !== "undefined") {
      const subject = encodeURIComponent(`Critical Error Report: ${error?.message || "Unknown Error"}`);
      const body = encodeURIComponent(`
Error ID: ${errorId}
Time: ${new Date().toISOString()}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Error: ${error?.message || "Unknown"}

Please describe what you were doing when this error occurred:
      `);
      
      window.open(`mailto:support@ecell.com?subject=${subject}&body=${body}`, "_blank");
    }
  };

  const handleGoHome = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Something went wrong - E-Cell IET Lucknow</title>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }
          
          .error-container {
            max-width: 600px;
            width: 100%;
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
          }
          
          .error-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 2rem;
            background: rgba(239, 68, 68, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
          }
          
          .error-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: #ffffff;
          }
          
          .error-description {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 2rem;
            line-height: 1.6;
          }
          
          .error-details {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 2rem;
            text-align: left;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.875rem;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .error-details summary {
            cursor: pointer;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #fbbf24;
          }
          
          .error-details pre {
            white-space: pre-wrap;
            word-break: break-word;
            color: rgba(255, 255, 255, 0.8);
          }
          
          .error-id {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.5);
            margin-bottom: 2rem;
          }
          
          .button-group {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
          
          @media (min-width: 640px) {
            .button-group {
              flex-direction: row;
              justify-content: center;
            }
          }
          
          .btn {
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            min-width: 140px;
            justify-content: center;
            border: none;
          }
          
          .btn-primary {
            background: #fbbf24;
            color: #000;
          }
          
          .btn-primary:hover {
            background: #f59e0b;
            transform: translateY(-1px);
          }
          
          .btn-secondary {
            background: transparent;
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.3);
          }
          
          .btn-ghost {
            background: transparent;
            color: rgba(255, 255, 255, 0.7);
            border: none;
          }
          
          .btn-ghost:hover {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.05);
          }
        `}</style>
      </head>
      <body>
        <div className="error-container">
          <div className="error-icon">
            ⚠️
          </div>
          
          <h1 className="error-title">Oops! Something went wrong</h1>
          
          <p className="error-description">
            We encountered an unexpected error. Our team has been notified and is working on a fix.
            Please try refreshing the page or contact support if the problem persists.
          </p>
          
          {process.env.NODE_ENV === "development" && error && (
            <details className="error-details">
              <summary>Technical Details (Development Only)</summary>
              <div style={{ marginTop: "0.5rem" }}>
                <div><strong>Error:</strong> {error.message}</div>
                {errorId && (
                  <div><strong>Error ID:</strong> <code>{errorId}</code></div>
                )}
                <div><strong>Time:</strong> {new Date().toLocaleString()}</div>
                {error.stack && (
                  <pre style={{ marginTop: "0.5rem" }}>{error.stack}</pre>
                )}
              </div>
            </details>
          )}
          
          {errorId && (
            <div className="error-id">
              Error ID: <code>{errorId}</code>
            </div>
          )}
          
          <div className="button-group">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                try {
                  reset?.();
                } catch {
                  // Fallback to page reload
                  if (typeof window !== "undefined") {
                    window.location.reload();
                  }
                }
              }}
            >
              🔄 Try Again
            </button>
            
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleGoHome}
            >
              🏠 Go Home
            </button>
            
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleReportIssue}
            >
              🐛 Report Issue
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
