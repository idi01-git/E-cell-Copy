"use client";

import * as React from "react";
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

    React.useEffect(() => {
      if (!api) return;
      if (setApi) setApi(api);
    }, [api, setApi]);

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

    return (
      <CarouselContext.Provider value={{ carouselRef, api }}>
        <div
          ref={ref}
          className={cn(
            "relative flex items-center justify-center gap-8 group",
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
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
      <div ref={ref} className={cn("flex", className)} {...props} />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { api } = useCarousel();
  return (
    <button
      ref={ref}
      className={cn(
        "absolute left-0 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center shadow hover:bg-accent transition-colors",
        className
      )}
      onClick={() => api?.scrollPrev()}
      {...props}
    >
      <span className="sr-only">Previous slide</span>
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
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
  const { api } = useCarousel();
  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-0 top-1/2 z-10 -translate-y-1/2 h-8 w-8 rounded-full bg-background border border-border flex items-center justify-center shadow hover:bg-accent transition-colors",
        className
      )}
      onClick={() => api?.scrollNext()}
      {...props}
    >
      <span className="sr-only">Next slide</span>
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
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
