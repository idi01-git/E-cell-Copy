"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL (for deep-linking)
    if (!window.location.hash) {
      // Immediate scroll to prevent flash
      window.scrollTo(0, 0);
      
      // Additional scroll after a short delay to handle dynamic content
      const timeoutId = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  // Also handle initial page load
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
