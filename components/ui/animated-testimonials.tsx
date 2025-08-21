"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
  cardHeight = "h-80",
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
  cardHeight?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div
      className={cn(
        "max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-20",
        className
      )}
    >
      <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-center justify-center w-full">
        <div className="w-full flex justify-center">
          <div className={cn("relative w-full max-w-sm", cardHeight)}>
            <AnimatePresence>
              <motion.div
                key={testimonials[active].src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  z: 0,
                  rotate: 0,
                  zIndex: 999,
                  y: [0, -80, 0],
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="relative origin-bottom"
              >
                <Image
                  src={testimonials[active].src}
                  alt={testimonials[active].name}
                  width={500}
                  height={625}
                  draggable={false}
                  className="rounded-3xl object-cover object-center w-full h-full"
                  style={{ aspectRatio: '4/5' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4 w-full max-w-lg">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-8 md:pt-12 justify-center md:justify-start w-full">
            <button
              onClick={handlePrev}
              className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center group/button transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <IconArrowLeft className="h-5 w-5 md:h-6 md:w-6 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center group/button transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <IconArrowRight className="h-5 w-5 md:h-6 md:w-6 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
