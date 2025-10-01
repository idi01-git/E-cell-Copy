"use client";

import Script from "next/script";

/**
 * EmailJS Script Component - Client-side script loader for EmailJS
 * Handles EmailJS initialization with proper error handling
 */
const EmailJSScript = () => {
  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          if (typeof window !== 'undefined' && (window as any).emailjs) {
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
            
            if (!publicKey) {
              console.error('EmailJS public key not configured. Set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY environment variable.');
              return;
            }
            
            (window as any).emailjs.init(publicKey);
            console.log('EmailJS initialized successfully');
          } else {
            console.warn('EmailJS not available after script load');
          }
        } catch (error) {
          console.warn('EmailJS initialization failed:', error);
        }
      }}
      onError={(error) => {
        console.error('Failed to load EmailJS script:', error);
      }}
    />
  );
};

export default EmailJSScript;
