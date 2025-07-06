"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User } from "lucide-react";
import Image from "next/image";
import { navItems } from "@/data";

// Profile Icon Component
const ProfileIcon = ({ className = "" }: { className?: string }) => (
  <motion.div
    className={`inline-flex ${className}`}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
    whileHover={{ scale: 1.05 }}
  >
    <button className="inline-flex items-center justify-center w-10 h-10 text-foreground/70 hover:text-foreground bg-background border border-border rounded-full hover:bg-accent transition-colors">
      <User className="h-5 w-5" />
    </button>
  </motion.div>
);

interface MenuItem {
  name: string;
  link: string;
}

interface NavbarProps {
  logo?: React.ReactNode;
  menuItems?: MenuItem[];
  ctaText?: string;
  ctaHref?: string;
}

const Navbar = ({
  logo = (
    <motion.div
      className="w-8 h-8 cursor-pointer"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileHover={{
        scale: 1.1,
        filter: "drop-shadow(0 0 12px rgba(254, 243, 199, 0.8))",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => window.location.reload()}
    >
      <Image
        src="/ecell-logo.png"
        alt="E-Cell Logo"
        width={32}
        height={32}
        className="rounded-full"
      />
    </motion.div>
  ),
  menuItems = navItems,
  ctaText = "Get Started",
  ctaHref = "#",
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState(0); // About is at index 0

  // Improved scroll detection for active section
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    const navbarHeight = 160; // Total navbar height including padding
    const offset = navbarHeight + 50; // Additional offset for better detection

    // Get all sections
    const sections = menuItems.map((item) => {
      const element = document.querySelector(item.link);
      return element ? element : null;
    });

    // Check if we're above the About section
    const aboutSection = sections[0];
    if (aboutSection) {
      const aboutRect = aboutSection.getBoundingClientRect();
      const aboutTop = aboutRect.top + scrollPosition;

      if (scrollPosition + offset < aboutTop) {
        setActiveItem(0); // Keep About active when above it
        return;
      }
    }

    // Find which section is currently in view
    let currentSectionIndex = activeItem; // Start with current active item

    // Check each section from top to bottom
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollPosition;
        const sectionBottom = sectionTop + rect.height;

        // Check if we've entered this section
        if (
          scrollPosition + offset >= sectionTop &&
          scrollPosition + offset < sectionBottom
        ) {
          currentSectionIndex = i;
          break;
        }
      }
    }

    // Only update if the section has actually changed
    if (currentSectionIndex !== activeItem) {
      setActiveItem(currentSectionIndex);
    }
  }, [menuItems, activeItem]);

  useEffect(() => {
    // Run once on mount to set initial state
    handleScroll();

    // Add scroll listener with throttling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });
    return () => window.removeEventListener("scroll", scrollListener);
  }, [handleScroll]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMouseEnter = (index: number) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(link);
    if (element) {
      const navbarHeight = 160; // Total navbar height
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - 20; // Additional 20px buffer

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-8 px-4 h-28">
      <div className="flex items-center justify-between px-8 py-4 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg w-full max-w-4xl relative">
        <div className="flex items-center">
          <div className="mr-6">{logo}</div>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center relative bg-background/50 backdrop-blur-sm rounded-full px-2 py-1 border border-border/50">
          {/* Tubelight Indicator */}
          <motion.div
            className="absolute inset-y-1 bg-yellow-300/10 rounded-full border border-yellow-300/20"
            layoutId="tubelight"
            initial={false}
            animate={{
              x: (hoveredItem !== null ? hoveredItem : activeItem) * 120 + 8,
              width: 104,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Glowing effect */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-yellow-200 rounded-full">
              <div className="absolute w-8 h-3 bg-yellow-200/30 rounded-full blur-sm -top-1 -left-1" />
              <div className="absolute w-6 h-2 bg-yellow-200/40 rounded-full blur-xs" />
            </div>
          </motion.div>

          {menuItems.map((item, index) => (
            <div
              key={item.name}
              className="relative z-10"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{ width: "120px" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                <a
                  href={item.link}
                  onClick={(e) => {
                    handleItemClick(index);
                    handleNavClick(e, item.link);
                  }}
                  className={`flex items-center text-sm font-medium px-4 py-2 rounded-full transition-colors relative ${
                    (
                      hoveredItem !== null
                        ? hoveredItem === index
                        : activeItem === index
                    )
                      ? "text-yellow-200"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.name}
                </a>
              </motion.div>
            </div>
          ))}
        </nav>
        {/* Desktop Profile Section */}
        <div className="hidden md:flex items-center">
          <ProfileIcon />
        </div>
        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-6 w-6 text-foreground" />
        </motion.button>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background z-[60] pt-32 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="h-6 w-6 text-foreground" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a
                    href={item.link}
                    className={`text-base font-medium block transition-colors ${
                      activeItem === i
                        ? "text-yellow-200"
                        : "text-foreground hover:text-foreground/80"
                    }`}
                    onClick={(e) => {
                      handleItemClick(i);
                      handleNavClick(e, item.link);
                      toggleMenu();
                    }}
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
              <div className="pt-6 flex items-center justify-center">
                <ProfileIcon />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
