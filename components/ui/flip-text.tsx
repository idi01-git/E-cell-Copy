"use client";

import { motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface FlipTextProps {
  word: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

function FlipText({
  word,
  duration = 0.5,
  delayMultiple = 0.08,
  framerProps = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
  },
  className,
}: FlipTextProps) {
  return (
    <div className="flex justify-center space-x-2">
      {word.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial="hidden"
          animate="visible"
          variants={framerProps}
          transition={{ duration, delay: i * delayMultiple }}
          className={cn("origin-center drop-shadow-sm", className)}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export { FlipText };
