import * as React from "react";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  "/gallery/1.webp",
  "/gallery/2.webp",
  "/gallery/3.webp",
  "/gallery/4.webp",
  "/gallery/5.webp",
  "/gallery/6.webp",
  "/gallery/7.webp",
];

export function Gallery() {
  return (
    <section
      id="gallery"
      className="w-full flex flex-col items-center py-6 md:py-12 lg:py-20 bg-background"
    >
      <h2 className="text-center text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
        Gallery
      </h2>
      <div
        className="text-center text-xl text-black/80 dark:text-white/80 mb-6 md:mb-8 max-w-4xl mx-auto px-4"
      >
        Dive into our gallery of startup shenanigans—where ideas spark, chaos
        brews, and memories are made!
      </div>
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
      >
        <CarouselContent
          onWheelCapture={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {galleryImages.map((img, index) => (
            <CarouselItem
              key={index}
              className="px-2 md:basis-1/2 lg:basis-1/3"
            >
              <div className="w-full h-full flex items-center justify-center">
                <CardContent className="aspect-[4/3] w-full h-auto p-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full rounded-xl shadow-lg"
                    priority={index < 3}
                    loading={index < 3 ? "eager" : "lazy"}
                    onError={(e) => {
                      console.error(`Failed to load image: ${img}`);
                    }}
                    onLoad={() => {
                      console.log(`Successfully loaded image: ${img}`);
                    }}
                  />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Link href="/gallery">
        <LiquidButton size="lg" className="mt-4 md:mb-8">
          See More
        </LiquidButton>
      </Link>
    </section>
  );
}

export default Gallery;
