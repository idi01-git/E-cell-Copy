"use client";

import { useState, useEffect } from "react";

export type DevicePerformance = "high" | "medium" | "low";

/**
 * Hook to detect device performance tier
 * Used to optimize animations and reduce complexity on low-end devices
 */
export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>("high");

  useEffect(() => {
    const detectPerformance = (): DevicePerformance => {
      // Server-side or initial render default
      if (typeof window === "undefined") return "high";

      // Check hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 2;
      
      // Check memory (if available)
      const memory = (navigator as any).deviceMemory;
      
      // Check connection (if available)
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType;

      // Low tier: < 4 cores, < 4GB RAM, or slow connection
      if (cores < 4 || (memory && memory < 4) || effectiveType === "slow-2g" || effectiveType === "2g") {
        return "low";
      }

      // Medium tier: 4-6 cores, 4-6GB RAM
      if (cores <= 6 || (memory && memory <= 6)) {
        return "medium";
      }

      // High tier: > 6 cores, > 6GB RAM
      return "high";
    };

    setPerformance(detectPerformance());
  }, []);

  return performance;
}

/**
 * Hook to check if device is low performance
 * Useful for simple boolean checks
 */
export function useIsLowPerformance(): boolean {
  const performance = useDevicePerformance();
  return performance === "low";
}

/**
 * Hook to check if reduced motion is preferred
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
