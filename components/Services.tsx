"use client";

import { Component } from "@/components/ui/testimonial";
import { HandWrittenTitle } from "@/components/ui/hand-writing-text";

const Services = () => {
  return (
    <div className="my-6 md:my-12 lg:my-[80px]" id="events">
      <div className="relative w-full max-w-4xl mx-auto py-6 md:py-12 lg:py-16">
        <HandWrittenTitle title="Our Events" />
      </div>
      <div className="max-w-7xl mx-auto">
        <Component />
      </div>
    </div>
  );
};

export default Services;
