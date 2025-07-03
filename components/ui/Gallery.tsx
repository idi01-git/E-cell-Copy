import * as React from "react";
import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
        Gallery
      </h2>
      <Carousel className="w-full">
        <CarouselContent>
          {galleryImages.map((img, index) => (
            <CarouselItem
              key={index}
              className="px-2 md:basis-1/2 lg:basis-1/3"
            >
              <div className="w-full h-full flex items-center justify-center">
                <CardContent className="aspect-[4/3] w-full h-auto p-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    className="object-cover w-full h-full rounded-xl shadow-lg"
                  />
                </CardContent>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

export default Gallery;
