import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

// --- Helper Components & Data ---

// All text data and images are the updated versions for E-Cell events.
const testimonials = [
  {
    quote:
      "E-Summit 2024 was an incredible experience that brought together the brightest minds in entrepreneurship. The networking opportunities and insights gained were invaluable for our startup journey.",
    name: "E-Summit 2024",
    designation: "Annual Entrepreneurship Summit",
    src: "/events/1.webp",
  },
  {
    quote:
      "Startup Weekend was intense but incredibly rewarding. We went from idea to prototype in just 48 hours. The mentors and judges provided invaluable feedback that shaped our business model.",
    name: "Startup Weekend",
    designation: "48-Hour Startup Challenge",
    src: "/events/2.webp",
  },
  {
    quote:
      "The Innovation Bootcamp series transformed our understanding of entrepreneurship. The hands-on workshops and expert sessions gave us practical skills that we use daily in our ventures.",
    name: "Innovation Bootcamp",
    designation: "Intensive Workshop Series",
    src: "/events/3.webp",
  },
  {
    quote:
      "Pitch Perfect was nerve-wracking but exhilarating! Presenting our startup to industry experts and receiving constructive feedback helped us refine our pitch and business strategy.",
    name: "Pitch Perfect",
    designation: "Startup Pitching Competition",
    src: "/events/4.webp",
  },
  {
    quote:
      "Tech Expo showcased the incredible innovation happening on campus. Seeing other students&apos; projects and getting feedback from industry professionals was inspiring and motivating.",
    name: "Tech Expo",
    designation: "Innovation Showcase",
    src: "/events/5.webp",
  },
  {
    quote:
      "The mentorship program connected us with successful entrepreneurs who shared their journey and provided guidance. Their insights helped us avoid common pitfalls and accelerate our growth.",
    name: "Mentorship Program",
    designation: "Entrepreneurial Guidance",
    src: "/events/6.webp",
  },
  {
    quote:
      "The networking events organized by E-Cell opened doors we never imagined. We met potential investors, partners, and mentors who have been instrumental in our startup&apos;s success.",
    name: "Networking Events",
    designation: "Community Building",
    src: "/events/7.webp",
  },
];

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

// --- Main Animated Testimonials Component ---
// This is the core component that handles the animation and logic.
const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = React.useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;

  const randomRotate = () => `${Math.floor(Math.random() * 16) - 8}deg`;

  return (
    <div className="mx-auto max-w-sm px-4 py-8 md:py-16 lg:py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-20">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-xs">
            {/* Container with 4:5 aspect ratio */}
            <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
              {/* Render all testimonials for stacked card effect */}
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 50,
                    rotate: randomRotate(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.5,
                    scale: isActive(index) ? 1 : 0.9,
                    y: isActive(index) ? 0 : 20,
                    zIndex: isActive(index)
                      ? testimonials.length
                      : testimonials.length - Math.abs(index - active),
                    rotate: isActive(index) ? "0deg" : randomRotate(),
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: "1000px" }}
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={400}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover shadow-2xl"
                    style={{ aspectRatio: "4/5" }}
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/400x500/e2e8f0/64748b?text=${testimonial.name.charAt(
                        0
                      )}`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Text and Controls Section */}
        <div className="flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              // Animation properties reverted to the previous version.
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50">
                  {testimonials[active].name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {testimonials[active].designation}
                </p>
                <motion.p className="mt-6 md:mt-8 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  &quot;{testimonials[active].quote}&quot;
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-4 pt-8 md:pt-12 justify-center md:justify-start">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-500 hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 md:h-6 md:w-6 text-slate-800 transition-transform duration-300 group-hover:-translate-x-1 dark:text-slate-300" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-500 hover:scale-105"
            >
              <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-slate-800 transition-transform duration-300 group-hover:translate-x-1 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Demo Component ---
function AnimatedTestimonialsDemo() {
  return <AnimatedTestimonials testimonials={testimonials} />;
}

// --- Main App Component ---
// This is the root of our application.
export function Component() {
  return (
    <div className="relative w-full">
      {/* Content */}
      <div className="z-10">
        <AnimatedTestimonialsDemo />
      </div>
    </div>
  );
}
