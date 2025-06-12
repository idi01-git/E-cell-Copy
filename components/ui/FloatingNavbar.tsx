"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-6 inset-x-0 mx-auto px-8 py-4 rounded-2xl border border-white/20 shadow-2xl items-center justify-center space-x-6",
          className
        )}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          borderRadius: "16px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <motion.img
            src="/ecell-logo.png"
            className="h-8 w-8"
            alt="E-Cell Logo"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          />
          <span className="text-white font-bold text-lg hidden sm:block">
            E-Cell
          </span>
        </motion.div>

        {/* Navigation Items */}
        {navItems.map((navItem: any, idx: number) => (
          <motion.div key={`link=${idx}`}>
            <Link
              href={navItem.link}
              className={cn(
                "relative flex items-center space-x-2 text-neutral-300 hover:text-white transition-all duration-300 px-4 py-2 rounded-lg group"
              )}
            >
              {/* Icon for mobile */}
              <span className="block sm:hidden text-lg">{navItem.icon}</span>
              
              {/* Text */}
              <motion.span
                className="text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {navItem.name}
              </motion.span>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId="navbar-hover"
              />
            </Link>
          </motion.div>
        ))}

        {/* CTA Button */}
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Us
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};