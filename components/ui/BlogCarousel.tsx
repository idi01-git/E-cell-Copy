"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { CardCarousel } from "@/components/ui/card-carousel";
import { BlurFade } from "@/components/ui/blur-fade";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { projects } from "@/data";

const BlogCarousel = () => {
  // Transform projects data to match CardCarousel format
  // Latest (first) item should have highest number
  const carouselImages = projects.map((project, index) => ({
    src: project.img,
    alt: project.title,
    link: project.link,
    edition: `Edition ${projects.length - index}`, // Latest = Edition 6, Oldest = Edition 1
  }));

  return (
    <section className="w-full flex flex-col items-center py-6 md:py-12 lg:py-16 xl:py-24 bg-background">
      <div className="w-full flex flex-col items-center gap-6 md:gap-12 lg:gap-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            Latest Updates
          </Badge>
          <BlurFade delay={0.25} inView>
            <h2 className="mb-3 text-pretty text-4xl font-normal font-playfair md:mb-4 md:text-5xl lg:mb-6 lg:max-w-3xl lg:text-6xl mx-auto">
              The Entrepreneurial Times
            </h2>
          </BlurFade>
          <BlurFade delay={0.5} inView>
            <p className="mb-8 text-muted-foreground md:text-base lg:max-w-3xl lg:text-lg mx-auto">
              Take a look at the monthly newsletter of E-Cell IET Lucknow for
              the updates regarding the entrepreneurial world
            </p>
          </BlurFade>
          <BlurFade delay={0.75} inView>
            <InteractiveHoverButton text="Read More" />
          </BlurFade>
        </div>
        
        {/* CardCarousel Component */}
        <div className="w-full px-4 md:px-6 lg:px-8">
          <CardCarousel
            images={carouselImages}
            autoplayDelay={2000}
            showPagination={true}
            showNavigation={true}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
