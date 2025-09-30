"use client";

import { useState, useEffect, useRef } from "react";

interface UseScrollVelocityOptions {
  threshold?: number;
  enabled?: boolean;
}

interface ScrollVelocityData {
  isScrolling: boolean;
  scrollVelocity: number;
}

/**
 * Custom hook for detecting scroll velocity and fast scrolling state
 * Consolidates scroll detection logic to avoid duplicate listeners
 * PERFORMANCE: Uses requestAnimationFrame throttling for optimal performance
 */
export const useScrollVelocity = ({
  threshold = 2,
  enabled = true,
}: UseScrollVelocityOptions = {}): ScrollVelocityData => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());
  const rafId = useRef<number | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let scrollTimeout: NodeJS.Timeout;

    const updateScrollMetrics = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = Date.now();
      const deltaY = Math.abs(currentScrollY - lastScrollY.current);
      const deltaTime = currentTimestamp - lastTimestamp.current;
      
      if (deltaTime > 0) {
        const velocity = deltaY / deltaTime;
        setScrollVelocity(velocity);
        
        // Consider fast scrolling based on threshold
        const isFastScrolling = velocity > threshold;
        setIsScrolling(isFastScrolling);
        
        // Clear scrolling state after scroll ends
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
          setScrollVelocity(0);
        }, 200);
      }
      
      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTimestamp;
      ticking.current = false;
    };

    const handleScroll = () => {
      // PERFORMANCE: Throttle using requestAnimationFrame
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(updateScrollMetrics);
        ticking.current = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [enabled, threshold]);

  return { isScrolling, scrollVelocity };
};
