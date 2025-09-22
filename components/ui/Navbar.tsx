"use client";

import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, User, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data";

// Profile Icon Component
const ProfileIcon = ({
  className = "",
  onContactClick,
}: {
  className?: string;
  onContactClick?: () => void;
}) => (
  <motion.div
    className={`inline-flex ${className}`}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2, delay: 0.1 }}
    whileHover={{ scale: 1.02 }}
  >
    <button
      onClick={() => {
        // Always redirect to homepage with contact section
        window.location.href = "/#contact";

        // Close mobile menu if callback is provided
        if (onContactClick) {
          onContactClick();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = "/#contact";
          if (onContactClick) {
            onContactClick();
          }
        }
      }}
      className="inline-flex items-center justify-center w-10 h-10 text-foreground/70 hover:text-foreground bg-background border border-border rounded-full hover:bg-accent focus:bg-accent transition-colors focus:outline-none"
      aria-label="Contact us - Open contact form"
      title="Contact us"
    >
      <Mail className="h-5 w-5" aria-hidden="true" />
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
    <Link href="/" aria-label="Go to homepage" className="w-8 h-8 inline-block focus:outline-none focus:bg-yellow-400/10 rounded-full transition-colors">
      <motion.div
        className="w-8 h-8"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        whileHover={{
          scale: 1.05,
          filter: "drop-shadow(0 0 8px rgba(254, 243, 199, 0.6))",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Image
          src="/ecell-logo.png"
          alt="E-Cell Logo"
          width={32}
          height={32}
          className="rounded-full"
          priority={true}
        />
      </motion.div>
    </Link>
  ),
  menuItems = navItems,
  ctaText = "Get Started",
  ctaHref = "#",
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState(0); // Default to About (index 0)
  const [isMounted, setIsMounted] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // Set the correct active item based on current page
    const pathname = window.location.pathname;
    if (pathname.startsWith("/blogs")) {
      setActiveItem(2); // Blogs is at index 2
    } else if (pathname === "/gallery") {
      setActiveItem(3); // Gallery is at index 3
    }
  }, []);

  // Improved scroll detection for active section with throttling
  const handleScroll = useCallback(() => {
    if (!isMounted) return;

    // Don't change active item if we're on blog or gallery pages
    const pathname = window.location.pathname;
    if (pathname.startsWith("/blogs") || pathname === "/gallery") {
      return;
    }

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
  }, [menuItems, activeItem, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    // Don't run scroll detection if we're on blog or gallery pages
    const pathname = window.location.pathname;
    if (pathname.startsWith("/blogs") || pathname === "/gallery") {
      return;
    }

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
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [handleScroll, isMounted]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    // Focus management for mobile menu
    if (!isOpen) {
      // Opening menu - focus first menu item after animation
      setTimeout(() => {
        const firstMenuItem = mobileMenuRef.current?.querySelector('a');
        firstMenuItem?.focus();
      }, 300);
    } else {
      // Closing menu - return focus to menu button
      setTimeout(() => {
        mobileMenuButtonRef.current?.focus();
      }, 100);
    }
  };

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isOpen) return;
    const node = mobileMenuRef.current;
    if (!node) return;
    const selector = 'a, button, [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(node.querySelectorAll<HTMLElement>(selector));
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) { 
        e.preventDefault(); 
        last.focus(); 
      }
      else if (!e.shiftKey && document.activeElement === last) { 
        e.preventDefault(); 
        first.focus(); 
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

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
    e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    link: string
  ) => {
    e.preventDefault();

    // Always redirect to homepage first, then scroll to section
    if (link.startsWith("#")) {
      // Navigate to homepage with hash
      window.location.href = "/" + link;
    } else {
      // Navigate to homepage
      window.location.href = "/";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number, link: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleItemClick(index);
      handleNavClick(e, link);
    }
  };

  const handleMobileKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      toggleMenu();
    }
  };

  // During SSR, render a simplified version to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-8 px-4 h-28">
        {/* Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-yellow-400 focus:text-black focus:rounded focus:font-medium"
        >
          Skip to main content
        </a>
        <div className="flex items-center justify-between px-8 py-4 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg w-full max-w-4xl relative">
          <div className="flex items-center">
            <div className="mr-6">
              <Link href="/" aria-label="Go to homepage" className="w-8 h-8 inline-block focus:outline-none focus:bg-yellow-400/10 rounded-full transition-colors">
                <Image
                  src="/ecell-logo.png"
                  alt="E-Cell Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                  priority={true}
                />
              </Link>
            </div>
          </div>
          <nav className="hidden md:flex items-center relative bg-background/50 backdrop-blur-sm rounded-full px-2 py-1 border border-border/50" aria-label="Main navigation">
            <ul className="flex items-center">
              {menuItems.map((item, index) => (
                <li
                  key={item.name}
                  className="relative z-10"
                  style={{ width: "120px" }}
                >
                  <div className="flex justify-center">
                    <a
                      href={item.link}
                      className="flex items-center text-sm font-medium px-4 py-2 rounded-full transition-colors relative text-foreground/70 focus:outline-none"
                      aria-current={activeItem === index ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:flex items-center">
            <div className="inline-flex">
              <button className="inline-flex items-center justify-center w-10 h-10 text-foreground/70 hover:text-foreground bg-background border border-border rounded-full hover:bg-accent focus:bg-accent transition-colors focus:outline-none" aria-label="Contact us">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <button className="md:hidden flex items-center focus:outline-none rounded" aria-label="Open mobile menu" aria-expanded="false">
            <Menu className="h-6 w-6 text-foreground" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-8 px-4 h-28">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-yellow-400 focus:text-black focus:rounded focus:font-medium"
      >
        Skip to main content
      </a>
      {/* Live region for navigation announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {activeItem !== null && `Current section: ${menuItems[activeItem]?.name}`}
      </div>
      <div className="flex items-center justify-between px-8 py-4 bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg w-full max-w-4xl relative">
        <div className="flex items-center">
          <div className="mr-6">{logo}</div>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center relative bg-background/50 backdrop-blur-sm rounded-full px-2 py-1 border border-border/50" aria-label="Main navigation">
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
              type: "tween",
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            {/* Glowing effect */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-yellow-200 rounded-full">
              <div className="absolute w-8 h-3 bg-yellow-200/30 rounded-full blur-sm -top-1 -left-1" />
              <div className="absolute w-6 h-2 bg-yellow-200/40 rounded-full blur-xs" />
            </div>
          </motion.div>

          <ul className="flex items-center">
            {menuItems.map((item, index) => (
              <li
                key={item.name}
                className="relative z-10"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{ width: "120px" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-center"
                >
                  <a
                    href={item.link}
                    onClick={(e) => {
                      handleItemClick(index);
                      handleNavClick(e, item.link);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index, item.link)}
                    className={`flex items-center text-sm font-medium px-4 py-2 rounded-full transition-colors relative focus:outline-none focus:bg-yellow-400/10 ${
                      (
                        hoveredItem !== null
                          ? hoveredItem === index
                          : activeItem === index
                      )
                        ? "text-yellow-200"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                    aria-current={activeItem === index ? "page" : undefined}
                    tabIndex={0}
                  >
                    {item.name}
                  </a>
                </motion.div>
              </li>
            ))}
          </ul>
        </nav>
        {/* Desktop Profile Section */}
        <div className="hidden md:flex items-center">
          <ProfileIcon />
        </div>
        {/* Mobile Menu Button */}
        <motion.button
          ref={mobileMenuButtonRef}
          className="md:hidden flex items-center focus:outline-none focus:bg-yellow-400/10 rounded p-1 transition-colors"
          onClick={toggleMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMenu();
            }
          }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="h-6 w-6 text-foreground" aria-hidden="true" />
        </motion.button>
      </div>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="fixed inset-0 bg-background z-[60] pt-32 px-6 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            onKeyDown={handleMobileKeyDown}
          >
            <h2 id="mobile-menu-title" className="sr-only">Mobile Navigation Menu</h2>
            <motion.button
              className="absolute top-6 right-6 p-2 focus:outline-none focus:bg-yellow-400/10 rounded transition-colors"
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              aria-label="Close mobile menu"
            >
              <X className="h-6 w-6 text-foreground" aria-hidden="true" />
            </motion.button>
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col space-y-6">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <a
                      href={item.link}
                      className={`text-base font-medium block transition-colors focus:outline-none focus:bg-yellow-400/10 rounded px-2 py-1 ${
                        activeItem === i
                          ? "text-yellow-200"
                          : "text-foreground hover:text-foreground/80"
                      }`}
                      onClick={(e) => {
                        handleItemClick(i);
                        handleNavClick(e, item.link);
                        toggleMenu();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleItemClick(i);
                          handleNavClick(e, item.link);
                          toggleMenu();
                        }
                      }}
                      aria-current={activeItem === i ? "page" : undefined}
                      tabIndex={0}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
                <div className="pt-6 flex items-center justify-center">
                  <ProfileIcon onContactClick={toggleMenu} />
                </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
