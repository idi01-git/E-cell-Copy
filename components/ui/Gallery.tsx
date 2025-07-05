import * as React from "react";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SparklesText } from "@/components/ui/sparkles-text";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const galleryImages = [
  "/news.jpg",
  "/goal.png",
  "/services.png",
  "/vineet.jpg",
  "/news.webp",
];

export function Gallery() {
  return (
    <section
      id="gallery"
      className="w-full flex flex-col items-center py-20 bg-background"
    >
      <SparklesText
        text="Gallery"
        className="text-center font-[Bebas Neue] text-5xl md:text-6xl font-bold mb-2 text-foreground"
        sparklesCount={9}
        colors={{ first: "#fff", second: "#9E7AFF" }}
      />
      <div
        className="text-center font-[Italianno] mb-8"
        style={{
          fontSize: 34,
          color: "white",
          textShadow:
            "0 0 12px rgba(255,255,255,0.7), 0 0 32px rgba(255,255,255,0.5)",
        }}
      >
        Dive into our gallery of startup shenanigans—where ideas spark, chaos
        brews,
        <br />
        and memories are made!
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
                    priority={index < 2}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <LiquidButton size="lg" className="mt-8">
        See More
      </LiquidButton>
    </section>
  );
}

export default Gallery;
