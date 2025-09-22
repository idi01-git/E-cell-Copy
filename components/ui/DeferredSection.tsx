"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

interface DeferredSectionProps {
  children: ReactNode;
  threshold?: number;
  thresholds?: number[];
  rootMargin?: string;
  fallback?: ReactNode;
  className?: string;
  scrollVelocityThreshold?: number;
  loadingDelay?: number;
  enableScrollAwareness?: boolean;
  fadeTransitionDuration?: number;
}

/**
 * DeferredSection - A component that defers rendering of heavy sections until they are near the viewport
 * Uses native IntersectionObserver with scroll-aware behavior to optimize performance
 * Features:
 * - Multiple intersection thresholds for granular control
 * - Scroll velocity detection to prevent loading during fast scrolling
 * - Configurable loading delays and fade transitions
 * - Hysteresis to prevent rapid state changes
 * - Progressive loading phases for smoother UX
 */
const DeferredSection = ({
  children,
  threshold = 0.1,
  thresholds,
  rootMargin = "400px 0px", // Increased for earlier loading
  fallback,
  className = "",
  scrollVelocityThreshold = 2,
  loadingDelay = 100,
  enableScrollAwareness = true,
  fadeTransitionDuration = 300,
}: DeferredSectionProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  // Use shared scroll velocity hook
  const { isScrolling, scrollVelocity } = useScrollVelocity({
    threshold: scrollVelocityThreshold,
    enabled: enableScrollAwareness,
  });

  // Scroll velocity detection is now handled by the shared hook

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Determine which threshold to use
    const observerThreshold = thresholds || (threshold !== 0.1 ? threshold : [0, 0.1, 0.25]);
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element); // Only trigger once for performance
        }
      },
      {
        threshold: observerThreshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, thresholds, rootMargin]);

  useEffect(() => {
    if (inView && !shouldRender) {
      // Smart loading with scroll-aware delay
      const delay = enableScrollAwareness && isScrolling ? loadingDelay * 2 : loadingDelay;
      
      const timer = setTimeout(() => {
        // Only render if not currently fast scrolling (with hysteresis)
        if (!enableScrollAwareness || !isScrolling || scrollVelocity < scrollVelocityThreshold * 0.5) {
          setShouldRender(true);
        }
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [inView, shouldRender, isScrolling, scrollVelocity, loadingDelay, enableScrollAwareness, scrollVelocityThreshold]);

  // Enhanced fallback component with scroll awareness
  const defaultFallback = (
    <div className={`h-96 flex items-center justify-center transition-opacity ${isScrolling ? 'opacity-50' : 'opacity-100'}`} style={{ transitionDuration: `${fadeTransitionDuration}ms` }}>
      <div className="animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-lg w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className={`w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full ${isScrolling ? 'animate-none' : 'animate-spin'}`}></div>
        <span className="text-white/70 text-sm font-medium">Loading content...</span>
      </div>
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {!shouldRender && (fallback || defaultFallback)}
      {shouldRender && (
        <div className="transition-opacity opacity-100" style={{ transitionDuration: `${fadeTransitionDuration}ms` }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DeferredSection;
