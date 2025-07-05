"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  MotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Clock } from "lucide-react";

const cn = (...inputs: any[]) => {
  return inputs.filter(Boolean).join(" ");
};

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  reflection?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, reflection = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          reflection && "relative overflow-hidden",
          reflection &&
            "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const fontSize = 40;
const padding = 10;
const height = fontSize + padding;

interface CounterProps {
  start?: number;
  end: number;
  duration?: number;
  className?: string;
  fontSize?: number;
}

const Counter = ({
  start = 0,
  end,
  duration = end,
  className,
  fontSize = 30,
}: CounterProps) => {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const interval = setInterval(() => {
      if (value < end) {
        setValue((prev) => prev + 1);
      }
    }, (duration / (end - start)) * 1000);

    return () => clearInterval(interval);
  }, [value, end, start, duration]);

  return (
    <div
      style={{ fontSize }}
      className={cn(
        "flex overflow-hidden rounded px-2 leading-none text-foreground font-bold",
        className
      )}
    >
      {value >= 100000 && <Digit place={100000} value={value} />}
      {value >= 10000 && <Digit place={10000} value={value} />}
      {value >= 1000 && <Digit place={1000} value={value} />}
      {value >= 100 && <Digit place={100} value={value} />}
      {value >= 10 && <Digit place={10} value={value} />}
      <Digit place={1} value={value} />
    </div>
  );
};

function Digit({ place, value }: { place: number; value: number }) {
  let valueRoundedToPlace = Math.floor(value / place);
  let animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {[...Array(10)].map((_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {number}
    </motion.span>
  );
}

interface CountdownProps {
  targetDate?: Date;
  title?: string;
  description?: string;
  onComplete?: () => void;
  className?: string;
  enableAnimations?: boolean;
}

const Countdown = ({
  targetDate,
  title = "Event Countdown",
  description = "Don't miss out on this amazing event!",
  onComplete,
  className,
  enableAnimations = true,
}: CountdownProps) => {
  const [eventDate] = useState(
    () =>
      targetDate ||
      new Date(
        Date.now() + 2 * 24 * 3600 * 1000 + 5 * 3600 * 1000 + 30 * 60 * 1000
      )
  );

  const [timeLeft, setTimeLeft] = useState(() => {
    const target = targetDate || eventDate;
    return Math.max(0, Math.floor((+target - Date.now()) / 1000));
  });

  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  useEffect(() => {
    const target = targetDate || eventDate;

    const update = () => {
      const remaining = Math.max(0, Math.floor((+target - Date.now()) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0 && onComplete) {
        onComplete();
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate, eventDate, onComplete]);

  const getTimeUnits = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { days, hours, minutes, seconds: secs };
  };

  const { days, hours, minutes, seconds } = getTimeUnits(timeLeft);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    hover: shouldAnimate
      ? {
          scale: 1.02,
          y: -4,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
          },
        }
      : {},
  };

  const numberVariants = {
    initial: { scale: 1 },
    pulse: shouldAnimate
      ? {
          scale: [1, 1.03, 1], // More subtle breathing effect
          transition: {
            duration: 2, // Slower duration for breathing
            repeat: Infinity,
            ease: "easeInOut",
          },
        }
      : {},
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
      },
    },
  };

  return (
    <motion.div
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      whileHover="hover"
      variants={{
        ...containerVariants,
        hover: {
          ...containerVariants.hover,
          boxShadow:
            "0 0 0 2px rgba(253, 224, 71, 0.25), 0 0 32px 8px rgba(253, 224, 71, 0.35), 0 0 80px 24px rgba(253, 224, 71, 0.25)",
        },
      }}
      className={cn(
        "relative w-full max-w-4xl mx-auto rounded-2xl border bg-card text-card-foreground overflow-hidden",
        "border-yellow-600/80 shadow-lg shadow-yellow-600/50 dark:border-yellow-300/30 dark:shadow-xl dark:shadow-yellow-300/30",
        "bg-gradient-to-br from-background via-background to-muted/20",
        className
      )}
    >
      {/* Updated: Gold theme background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 via-transparent to-yellow-400/5 dark:from-yellow-300/5 dark:via-transparent dark:to-yellow-200/5" />

      <div className="relative p-6 sm:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <motion.div
          className="text-center space-y-3 sm:space-y-4"
          variants={shouldAnimate ? childVariants : {}}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-yellow-600/10 text-yellow-600 dark:text-yellow-300 border border-yellow-600/20 dark:border-yellow-300/20 shadow-yellow-600/50 dark:shadow-yellow-300/50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Live Event</span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-200 dark:from-yellow-300 dark:via-yellow-200 dark:to-yellow-100 bg-clip-text text-transparent"
            variants={shouldAnimate ? childVariants : {}}
          >
            {title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-yellow-300/80 max-w-md mx-auto"
            variants={shouldAnimate ? childVariants : {}}
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Countdown Display */}
        {timeLeft > 0 ? (
          <motion.div
            className="space-y-6"
            variants={shouldAnimate ? childVariants : {}}
          >
            <div className="text-center">
              <div className="text-sm font-medium text-yellow-400 mb-3 sm:mb-4">
                <span className="text-yellow-400">Event starts in:</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-lg mx-auto">
                {[
                  { value: days, label: "Days" },
                  { value: hours, label: "Hours" },
                  { value: minutes, label: "Minutes" },
                  { value: seconds, label: "Seconds" },
                ].map((unit, index) => (
                  <motion.div
                    key={unit.label}
                    variants={index === 3 ? numberVariants : {}}
                    initial="initial"
                    animate={index === 3 ? "pulse" : "initial"}
                    className="relative"
                  >
                    {/* Updated: Gold theme number background */}
                    <div className="bg-gradient-to-br from-yellow-600/10 to-yellow-400/20 dark:from-yellow-300/10 dark:to-yellow-200/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 border backdrop-blur-sm border-yellow-600/60 dark:border-yellow-300/60 shadow-sm shadow-yellow-600/50 dark:shadow-yellow-300/50">
                      <div className="text-2xl sm:text-3xl font-bold tabular-nums text-yellow-600 dark:text-yellow-300 mb-0.5 sm:mb-1">
                        {unit.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xs sm:text-xs text-yellow-600 dark:text-yellow-300 font-medium uppercase tracking-wider">
                        {unit.label}
                      </div>
                    </div>

                    {index === 3 && shouldAnimate && (
                      <motion.div
                        className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-yellow-600/30 dark:border-yellow-300/30"
                        animate={{
                          opacity: [0, 0.5, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2, // Slower duration for breathing
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Urgency indicator */}
            {timeLeft < 86400 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={
                    shouldAnimate
                      ? {
                          scale: [1, 1.03, 1], // More subtle breathing effect
                        }
                      : {}
                  }
                  transition={{
                    duration: 2, // Slower duration for breathing
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-yellow-600/10 text-yellow-600 dark:text-yellow-300 border border-yellow-600/20 dark:border-yellow-300/20"
                >
                  <div className="w-2 h-2 rounded-full bg-yellow-600 dark:bg-yellow-300 animate-pulse" />
                  <span className="text-xs sm:text-sm font-medium">
                    Starting Soon!
                  </span>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={shouldAnimate ? childVariants : {}}
            className="text-center py-6 sm:py-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">
                🎉 Event Started!
              </div>
              <div className="text-base sm:text-lg text-muted-foreground">
                The event is now live. Join us now!
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
          variants={shouldAnimate ? childVariants : {}}
        >
          <motion.div
            whileHover={shouldAnimate ? { scale: 1.05 } : {}}
            whileTap={shouldAnimate ? { scale: 0.95 } : {}}
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              reflection
              className="w-full px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold bg-gradient-to-br from-yellow-600 via-yellow-400 to-yellow-200 dark:from-yellow-300 dark:via-yellow-200 dark:to-yellow-100 hover:from-yellow-700 hover:via-yellow-500 hover:to-yellow-300 dark:hover:from-yellow-400 dark:hover:via-yellow-300 dark:hover:to-yellow-200 shadow-lg shadow-yellow-600/25 dark:shadow-yellow-300/25"
            >
              {timeLeft > 0 ? "Get Notified" : "Join Event Now"}
            </Button>
          </motion.div>
          <motion.div
            whileHover={shouldAnimate ? { scale: 1.05 } : {}}
            whileTap={shouldAnimate ? { scale: 0.95 } : {}}
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              reflection
              className="w-full px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-semibold border-2 border-yellow-600/50 dark:border-yellow-300/50 text-yellow-600 dark:text-yellow-300 hover:bg-yellow-600/10 dark:hover:bg-yellow-300/10 shadow-lg shadow-yellow-600/10 dark:shadow-yellow-300/10"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function CountdownDemo() {
  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Countdown />
    </div>
  );
}
