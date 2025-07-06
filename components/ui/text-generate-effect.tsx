"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration,
  repeatInterval = 30000, // 30 seconds in milliseconds
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  repeatInterval?: number;
}) => {
  const [scope, animate] = useAnimate();
  const [isMounted, setIsMounted] = useState(false);
  let wordsArray = words.split(" ");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const runAnimation = () => {
    if (!isMounted) return;

    // Reset all spans to initial state
    animate(
      "span",
      {
        opacity: 0,
        filter: filter ? "blur(10px)" : "none",
      },
      {
        duration: 0,
      }
    );

    // Run the text generation animation
    const totalDuration = 4; // seconds
    const perWordDelay =
      wordsArray.length > 1 ? totalDuration / wordsArray.length : totalDuration;

    setTimeout(() => {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ?? 0.5,
          delay: stagger(perWordDelay),
        }
      );
    }, 100); // Small delay to ensure reset is complete
  };

  useEffect(() => {
    if (!isMounted) return;

    // Run initial animation
    runAnimation();

    // Set up interval for repeating animation
    const interval = setInterval(runAnimation, repeatInterval);

    return () => clearInterval(interval);
  }, [isMounted, repeatInterval, runAnimation]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={`dark:text-white text-black ${
                isMounted ? "opacity-0" : "opacity-100"
              }`}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className=" dark:text-white text-black text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
