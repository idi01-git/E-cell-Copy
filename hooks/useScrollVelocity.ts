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
 */
export const useScrollVelocity = ({ 
  threshold = 2, 
  enabled = true 
}: UseScrollVelocityOptions = {}): ScrollVelocityData => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
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
        }, 150);
      }
      
      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTimestamp;
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [enabled, threshold]);

  return { isScrolling, scrollVelocity };
};
