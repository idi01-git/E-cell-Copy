"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { cn } from "@/lib/utils";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: Parameters<typeof useEmblaCarousel>[0];
  plugins?: Parameters<typeof useEmblaCarousel>[1];
  setApi?: (api: UseEmblaCarouselType[1]) => void;
}

const CarouselContext = React.createContext<{
  carouselRef: UseEmblaCarouselType[0];
  api: UseEmblaCarouselType[1] | undefined;
  currentSlide: number;
  slideCount: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel>");
  }
  return context;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ opts, plugins, setApi, className, children, ...props }, ref) => {
    const autoplayRef = React.useRef<any>(null);
    
    // Find autoplay plugin if it exists
    React.useEffect(() => {
      if (plugins) {
        const autoplayPlugin = plugins.find((plugin: any) => plugin.name === 'autoplay');
        if (autoplayPlugin) {
          autoplayRef.current = autoplayPlugin;
        }
      }
    }, [plugins]);

    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        loop: true,
        skipSnaps: false,
        align: "center",
      },
      plugins
    );
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideCount, setSlideCount] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

    const updateCarouselState = useCallback(() => {
      if (!api) return;
      
      setCurrentSlide(api.selectedScrollSnap());
      setSlideCount(api.scrollSnapList().length);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, [api]);

    React.useEffect(() => {
      if (!api) return;
      if (setApi) setApi(api);
      
      updateCarouselState();
      api.on('select', updateCarouselState);
      api.on('reInit', updateCarouselState);
      
      return () => {
        api.off('select', updateCarouselState);
        api.off('reInit', updateCarouselState);
      };
    }, [api, setApi, updateCarouselState]);

    // Mouse wheel horizontal scroll and prevent page scroll
    React.useEffect(() => {
      const node = containerRef.current;
      if (!node || !api) return;
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY > 0) {
          api.scrollNext();
        } else if (e.deltaY < 0) {
          api.scrollPrev();
        }
        e.preventDefault();
      };
      node.addEventListener("wheel", onWheel, { passive: false });
      return () => node.removeEventListener("wheel", onWheel);
    }, [api]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (!api) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          api.scrollPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          api.scrollNext();
          break;
        case 'Home':
          e.preventDefault();
          api.scrollTo(0);
          break;
        case 'End':
          e.preventDefault();
          api.scrollTo(slideCount - 1);
          break;
        case 'PageUp':
          e.preventDefault();
          // Jump back by 3 slides or to beginning
          const prevIndex = Math.max(0, currentSlide - 3);
          api.scrollTo(prevIndex);
          break;
        case 'PageDown':
          e.preventDefault();
          // Jump forward by 3 slides or to end
          const nextIndex = Math.min(slideCount - 1, currentSlide + 3);
          api.scrollTo(nextIndex);
          break;
        case ' ':
          e.preventDefault();
          // Toggle autoplay pause/resume
          if (autoplayRef.current) {
            if (isAutoplayPaused) {
              autoplayRef.current.play();
            } else {
              autoplayRef.current.stop();
            }
          }
          setIsAutoplayPaused(!isAutoplayPaused);
          break;
      }
    }, [api, currentSlide, slideCount, isAutoplayPaused, autoplayRef]);

    // Pause autoplay on focus or hover
    const handleFocus = useCallback(() => {
      setIsAutoplayPaused(true);
    }, []);

    const handleBlur = useCallback(() => {
      setIsAutoplayPaused(false);
    }, []);

    return (
      <CarouselContext.Provider value={{ 
        carouselRef, 
        api, 
        currentSlide, 
        slideCount, 
        canScrollPrev, 
        canScrollNext 
      }}>
        <div
          ref={ref}
          className={cn(
            "relative flex items-center justify-center gap-8 group focus:outline-none rounded-lg",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label={`Carousel with ${slideCount} slides, currently showing slide ${currentSlide + 1}`}
          {...props}
        >
          {/* Carousel instructions for screen readers */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Use arrow keys to navigate slides. Press Home to go to first slide, End to go to last slide. 
            Press Page Up or Page Down to jump multiple slides. Press Space to pause/resume autoplay.
          </div>
          
          <div ref={containerRef} className="flex-1">
            {children}
            {/* Removed floating next navigation button */}
          </div>
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        id="carousel-content"
        ref={ref}
        className={cn("flex", className)}
        role="group"
        aria-label="Carousel slides"
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    slideIndex?: number;
  }
>(({ className, slideIndex, ...props }, ref) => {
  const { currentSlide, slideCount } = useCarousel();
  const [index, setIndex] = React.useState<number | null>(null);
  
  // Auto-infer index if slideIndex is not provided
  React.useEffect(() => {
    if (slideIndex !== undefined) return;
    if (!ref || !(ref as any).current) return;
    const el = (ref as any).current as HTMLElement;
    const parent = el.parentElement;
    if (!parent) return;
    const children = Array.from(parent.children);
    setIndex(children.indexOf(el));
  }, [slideIndex, ref]);
  
  const effectiveIndex = slideIndex ?? index ?? 0;
  const isActive = effectiveIndex === currentSlide;
  
  return (
    <div
      ref={ref}
      className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${effectiveIndex + 1} of ${slideCount}`}
      aria-current={isActive ? "true" : undefined}
      aria-hidden={!isActive}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { api, canScrollPrev, currentSlide, slideCount } = useCarousel();
  
  const handleClick = () => {
    api?.scrollPrev();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        "absolute left-0 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center shadow hover:bg-accent transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={!canScrollPrev}
      aria-label={`Go to previous slide. Currently on slide ${currentSlide + 1} of ${slideCount}`}
      aria-controls="carousel-content"
      aria-disabled={!canScrollPrev}
      {...props}
    >
      <span className="sr-only">Previous slide</span>
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M10 12L6 8l4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { api, canScrollNext, currentSlide, slideCount } = useCarousel();
  
  const handleClick = () => {
    api?.scrollNext();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-0 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center shadow hover:bg-accent transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={!canScrollNext}
      aria-label={`Go to next slide. Currently on slide ${currentSlide + 1} of ${slideCount}`}
      aria-controls="carousel-content"
      aria-disabled={!canScrollNext}
      {...props}
    >
      <span className="sr-only">Next slide</span>
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M6 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";
