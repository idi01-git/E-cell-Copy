"use client";

import { Component } from "@/components/ui/testimonial";
import { WordPullUp } from "@/components/ui/word-pull-up";

const Services = () => {
  return (
    <div id="events" className="mt-[4.2rem] md:mt-20 lg:mt-32"> {/* Increased for mobile */}
      <div className="w-full max-w-4xl mx-auto mb-2 md:mb-8 lg:mb-12"> {/* Reduce mb for mobile */}
        <WordPullUp words="Our Events" className="text-[40px] md:text-5xl lg:text-6xl" />
      </div>
      <div className="max-w-7xl mx-auto">
        <Component />
      </div>
    </div>
  );
};

export default Services;
