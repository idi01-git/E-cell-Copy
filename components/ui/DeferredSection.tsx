"use client";

import { ReactNode, useEffect, useState, useRef, memo } from "react";
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
 * PERFORMANCE: Optimized with simplified state management and reduced re-renders
 */
const DeferredSection = memo(
  ({
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
    const hasRendered = useRef(false); // NEW: Track if already rendered to prevent re-renders

    // Use shared scroll velocity hook
    const { isScrolling } = useScrollVelocity({
      threshold: scrollVelocityThreshold,
      enabled: enableScrollAwareness && !hasRendered.current, // Disable after first render
    });

    useEffect(() => {
      const element = ref.current;
      if (!element || hasRendered.current) return;

      // Determine which threshold to use
      const observerThreshold =
        thresholds || (threshold !== 0.1 ? threshold : [0, 0.1, 0.25]);

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
      if (inView && !shouldRender && !hasRendered.current) {
        // PERFORMANCE: Simplified loading logic
        const delay =
          enableScrollAwareness && isScrolling
            ? loadingDelay * 1.5
            : loadingDelay;

        const timer = setTimeout(() => {
          setShouldRender(true);
          hasRendered.current = true; // Mark as rendered
        }, delay);

        return () => clearTimeout(timer);
      }
    }, [
      inView,
      shouldRender,
      isScrolling,
      loadingDelay,
      enableScrollAwareness,
    ]);

    // PERFORMANCE: Simplified fallback without excessive animations
    const defaultFallback = (
      <div
        className="h-96 flex items-center justify-center opacity-100"
        style={{ transitionDuration: `${fadeTransitionDuration}ms` }}
      >
        <div className="animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-lg w-full h-full flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white/70 text-sm font-medium">
            Loading content...
          </span>
        </div>
      </div>
    );

    return (
      <div ref={ref} className={className}>
        {!shouldRender && (fallback || defaultFallback)}
        {shouldRender && (
          <div
            className="transition-opacity opacity-100"
            style={{ transitionDuration: `${fadeTransitionDuration}ms` }}
          >
            {children}
          </div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.threshold === nextProps.threshold &&
    prevProps.thresholds === nextProps.thresholds &&
    prevProps.rootMargin === nextProps.rootMargin &&
    prevProps.scrollVelocityThreshold === nextProps.scrollVelocityThreshold &&
    prevProps.loadingDelay === nextProps.loadingDelay &&
    prevProps.enableScrollAwareness === nextProps.enableScrollAwareness &&
    prevProps.fadeTransitionDuration === nextProps.fadeTransitionDuration
);

DeferredSection.displayName = "DeferredSection";

export default DeferredSection;
