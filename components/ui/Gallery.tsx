import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import Image from "next/image";
import Link from "next/link";
import { 
  loadImageWithRetry, 
  generateSVGPlaceholder, 
  createFallbackChain,
  getFailureStats,
  type AssetType 
} from "@/lib/image-fallback";
import { logger } from "@/lib/logger";

const galleryImages = [
  {
    src: "/gallery/1.webp",
    alt: "E-Cell team members collaborating during a startup workshop session with laptops and notebooks"
  },
  {
    src: "/gallery/2.webp",
    alt: "Entrepreneurs presenting their innovative business ideas at E-Cell pitch competition"
  },
  {
    src: "/gallery/3.webp",
    alt: "Students engaged in interactive entrepreneurship seminar with guest speaker from tech industry"
  },
  {
    src: "/gallery/4.webp",
    alt: "E-Cell networking event with students and industry mentors discussing startup opportunities"
  },
  {
    src: "/gallery/5.webp",
    alt: "Team building activity during E-Cell retreat focusing on leadership and innovation skills"
  },
  {
    src: "/gallery/6.webp",
    alt: "Award ceremony celebrating successful startup projects and entrepreneurial achievements"
  },
  {
    src: "/gallery/7.webp",
    alt: "E-Cell members participating in hackathon event developing technology solutions for real-world problems"
  },
];

// Gallery Status Component
const GalleryStatus = ({ currentSlide, totalSlides }: { currentSlide: number; totalSlides: number }) => {
  return (
    <div 
      aria-live="polite" 
      aria-atomic="true" 
      className="sr-only"
      role="status"
    >
      Image {currentSlide + 1} of {totalSlides}
    </div>
  );
};

// Enhanced Carousel Controls
const EnhancedCarouselControls = () => {
  const { api } = useCarousel();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const updateSlideInfo = () => {
      setCurrentSlide(api.selectedScrollSnap());
      setTotalSlides(api.scrollSnapList().length);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateSlideInfo();
    api.on('select', updateSlideInfo);
    api.on('reInit', updateSlideInfo);

    return () => {
      api.off('select', updateSlideInfo);
      api.off('reInit', updateSlideInfo);
    };
  }, [api]);

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <>
      <GalleryStatus currentSlide={currentSlide} totalSlides={totalSlides} />
      <CarouselPrevious 
        aria-label={`Go to previous image (${canScrollPrev ? 'available' : 'not available'})`}
        aria-disabled={!canScrollPrev}
        onKeyDown={(e) => handleKeyDown(e, () => api?.scrollPrev())}
        tabIndex={0}
      />
      <CarouselNext 
        aria-label={`Go to next image (${canScrollNext ? 'available' : 'not available'})`}
        aria-disabled={!canScrollNext}
        onKeyDown={(e) => handleKeyDown(e, () => api?.scrollNext())}
        tabIndex={0}
      />
    </>
  );
};

export function Gallery() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, {
    src: string;
    isLoading: boolean;
    hasError: boolean;
    retryCount: number;
  }>>({});
  const autoplayPlugin = useRef(Autoplay({
    delay: 3000,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
    stopOnFocusIn: true,
  }));

  // Initialize image load states
  useEffect(() => {
    const initialStates = galleryImages.reduce((acc, img, index) => ({
      ...acc,
      [index]: {
        src: img.src,
        isLoading: true,
        hasError: false,
        retryCount: 0,
      }
    }), {});
    setImageLoadStates(initialStates);

    // Preload critical images (first 3)
    const criticalUrls = galleryImages.slice(0, 3).map(img => img.src);
    loadImageWithRetry(criticalUrls[0], 'gallery').then((url: string) => {
      setImageLoadStates(prev => ({
        ...prev,
        [0]: { ...prev[0], src: url, isLoading: false }
      }));
    }).catch(() => {
      setImageLoadStates(prev => ({
        ...prev,
        [0]: { ...prev[0], hasError: true, isLoading: false }
      }));
    });
  }, []);

  // Enhanced image error handler with fallback logic
  const handleImageError = async (index: number, originalSrc: string) => {
    const currentState = imageLoadStates[index];
    if (!currentState || currentState.retryCount >= 3) {
      // Max retries reached, use placeholder
      const placeholder = generateSVGPlaceholder('gallery', 'Gallery Image\n(Not Available)');
      setImageLoadStates(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          src: placeholder,
          hasError: true,
          isLoading: false,
        }
      }));
      
      logger.error('Gallery image failed to load after retries', {
        index,
        originalSrc,
        retryCount: currentState?.retryCount || 0,
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Attempt to load with fallback chain
    try {
      setImageLoadStates(prev => ({
        ...prev,
        [index]: { ...prev[index], isLoading: true, retryCount: prev[index].retryCount + 1 }
      }));

      const fallbackUrl = await loadImageWithRetry(originalSrc, 'gallery');
      
      setImageLoadStates(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          src: fallbackUrl,
          isLoading: false,
          hasError: false,
        }
      }));
    } catch (error) {
      // Final fallback to placeholder
      const placeholder = generateSVGPlaceholder('gallery', 'Gallery Image\n(Not Available)');
      setImageLoadStates(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          src: placeholder,
          hasError: true,
          isLoading: false,
        }
      }));
      
      logger.warn('Gallery image fallback failed', {
        index,
        originalSrc,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    }
  };

  // Retry function for user-initiated retries
  const retryImageLoad = async (index: number) => {
    const originalSrc = galleryImages[index].src;
    await handleImageError(index, originalSrc);
  };

  const handleCarouselKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard navigation for the carousel
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      // The carousel component will handle the actual navigation
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      // These could be implemented for first/last slide navigation
    }
  };

  return (
    <section
      id="gallery"
      className="w-full flex flex-col items-center py-6 md:py-12 lg:py-20 bg-background"
    >
      <header className="text-center mb-6 md:mb-8">
        <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
          Gallery
        </h2>
        <p
          className="text-xl text-black/80 dark:text-white/80 max-w-4xl mx-auto px-4"
          id="gallery-description"
        >
          Dive into our gallery of startup shenanigans—where ideas spark, chaos
          brews, and memories are made!
        </p>
      </header>
      
      <div 
        ref={carouselRef}
        className="w-full"
        role="region"
        aria-label="Image gallery carousel"
        aria-describedby="gallery-description"
        onKeyDown={handleCarouselKeyDown}
        tabIndex={0}
      >
        <Carousel
          className="w-full focus:outline-none rounded-lg"
          plugins={[autoplayPlugin.current]}
        >
          <CarouselContent
            onWheelCapture={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            role="group"
            aria-label="Gallery images"
          >
            {galleryImages.map((img, index) => {
              const imageState = imageLoadStates[index];
              const currentSrc = imageState?.src || img.src;
              const isLoading = imageState?.isLoading ?? true;
              const hasError = imageState?.hasError ?? false;

              return (
                <CarouselItem
                  key={index}
                  slideIndex={index}
                  className="px-2 md:basis-1/2 lg:basis-1/3"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${galleryImages.length}`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <CardContent className="aspect-[4/3] w-full h-auto p-0 flex items-center justify-center overflow-hidden relative">
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
                          <div className="flex flex-col items-center space-y-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Loading...</span>
                          </div>
                        </div>
                      )}
                      
                      <Image
                        src={currentSrc}
                        alt={hasError ? `${img.alt} (Image not available)` : img.alt}
                        width={400}
                        height={300}
                        className={`object-cover w-full h-full rounded-xl shadow-lg transition-opacity duration-300 ${
                          isLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        priority={index < 3}
                        loading={index < 3 ? "eager" : "lazy"}
                        onError={() => handleImageError(index, img.src)}
                        onLoad={() => {
                          setImageLoadStates(prev => ({
                            ...prev,
                            [index]: { ...prev[index], isLoading: false }
                          }));
                        }}
                      />
                      
                      {hasError && !isLoading && (
                        <div className="absolute bottom-2 right-2">
                          <button
                            onClick={() => retryImageLoad(index)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded-md transition-colors"
                            aria-label={`Retry loading image ${index + 1}`}
                          >
                            Retry
                          </button>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <EnhancedCarouselControls />
        </Carousel>
      </div>
      
      <Link href="/gallery" className="mt-4 md:mb-8">
        <LiquidButton 
          size="lg" 
          className="focus:outline-none"
          aria-label="View more gallery images - Opens gallery page"
        >
          See More
        </LiquidButton>
      </Link>
    </section>
  );
}

export default Gallery;
