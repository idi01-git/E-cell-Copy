"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Skip scroll on first load to prevent auto-scroll
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    // Only scroll to top on route changes if there's no hash in the URL
    if (!window.location.hash) {
      // Immediate scroll to prevent flash
      window.scrollTo({ top: 0, behavior: 'instant' });
      
      // Additional scroll after a short delay to handle dynamic content
      const timeoutId = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  return null;
}
