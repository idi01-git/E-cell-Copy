"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./MovingBorders";

type Card = {
  id: number;
  content: React.ReactElement | React.ReactNode | string;
  className: string;
  thumbnail: string;
  title?: string;
  description?: string;
};

  // I think I am loosin my mind.
  
export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  const getGridCols = useCallback(() => {
    if (typeof window === 'undefined') return 4;
    return window.innerWidth >= 768 ? 4 : 1;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number, card: Card) => {
    const gridCols = getGridCols();
    const totalCards = cards.length;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleClick(card);
        break;
      case 'Escape':
        if (selected) {
          e.preventDefault();
          handleOutsideClick();
          // Return focus to the selected card
          cardRefs.current[index]?.focus();
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = Math.min(index + 1, totalCards - 1);
        setFocusedIndex(nextIndex);
        cardRefs.current[nextIndex]?.focus();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = Math.max(index - 1, 0);
        setFocusedIndex(prevIndex);
        cardRefs.current[prevIndex]?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        const downIndex = Math.min(index + gridCols, totalCards - 1);
        setFocusedIndex(downIndex);
        cardRefs.current[downIndex]?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const upIndex = Math.max(index - gridCols, 0);
        setFocusedIndex(upIndex);
        cardRefs.current[upIndex]?.focus();
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        cardRefs.current[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        const lastIndex = totalCards - 1;
        setFocusedIndex(lastIndex);
        cardRefs.current[lastIndex]?.focus();
        break;
    }
  }, [cards.length, selected, getGridCols, handleClick, handleOutsideClick]);

  // Generate meaningful alt text based on card content
  const generateAltText = (card: Card, index: number): string => {
    if (card.title) {
      return `${card.title} - ${card.description || 'Interactive card'}`;
    }
    
    // Extract text content if it's a React element
    if (typeof card.content === 'object' && card.content !== null) {
      // This is a simplified approach - in a real app you might want more sophisticated text extraction
      return `Interactive card ${index + 1} - Click to expand and view details`;
    }
    
    if (typeof card.content === 'string') {
      return `${card.content} - Interactive card`;
    }
    
    return `Interactive card ${index + 1} - Click to expand and view details`;
  };

  return (
    <div 
      ref={gridRef}
      className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-4 max-w-7xl mx-auto gap-10"
      role="grid"
      aria-label="Interactive card grid"
    >
      {/* Live region for grid navigation announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {selected && `Card ${selected.id} expanded. Press Escape to close.`}
      </div>
      
      {cards.map((card, i) => {
        const rowIndex = Math.floor(i / 4) + 1;
        const colIndex = (i % 4) + 1;
        
        return (
          <Button
            key={i}
            as="div"
            borderRadius="1.75rem"
            duration={10000}
            className={cn(
              card.className
            )}
            role="gridcell"
            tabIndex={-1}
            aria-rowindex={rowIndex}
            aria-colindex={colIndex}
          >
            <div
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={cn(
                card.className,
                "relative border-3 border-yellow-500 focus:outline-none rounded-xl",
                selected?.id === card.id && "ring-2 ring-yellow-400"
              )}
              role="button"
              tabIndex={0}
              onClick={() => handleClick(card)}
              onKeyDown={(e) => handleKeyDown(e, i, card)}
              aria-label={generateAltText(card, i)}
              aria-expanded={selected?.id === card.id}
              aria-pressed={selected?.id === card.id}
            >
              <motion.div
                className={cn(
                  card.className,
                  "relative overflow-hidden cursor-pointer",
                  selected?.id === card.id
                    ? "rounded-lg absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                    : lastSelected?.id === card.id
                    ? "z-40 bg-white rounded-xl h-full w-full"
                    : "bg-white rounded-xl h-full w-full"
                )}
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {selected?.id === card.id && <SelectedCard selected={selected} />}
                <BlurImage card={card} index={i} />
              </motion.div>
            </div>
          </Button>
        );
      })}
      <motion.div
        onClick={handleOutsideClick}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            handleOutsideClick();
          }
        }}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
        role="button"
        aria-label="Close expanded card"
        tabIndex={selected?.id ? 0 : -1}
        aria-hidden={!selected?.id}
      />
    </div>
  );
};

const BlurImage = ({ card, index }: { card: Card; index: number }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const generateImageAlt = (card: Card, index: number): string => {
    if (card.title) {
      return `Thumbnail image for ${card.title}`;
    }
    
    if (typeof card.content === 'string') {
      return `Thumbnail image for ${card.content}`;
    }
    
    // Generate contextual alt text based on common card patterns
    const cardPatterns = [
      'Project showcase',
      'Team member profile', 
      'Event highlight',
      'Achievement display',
      'Innovation feature',
      'Success story',
      'Portfolio item'
    ];
    
    const pattern = cardPatterns[index % cardPatterns.length];
    return `${pattern} thumbnail image`;
  };
  
  if (imageError) {
    return (
      <div className="absolute inset-0 h-full w-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
        <span className="text-neutral-500 text-sm">Image unavailable</span>
      </div>
    );
  }
  
  return (
    <Image
      src={card.thumbnail}
      height="100"
      width="100"
      onLoad={() => setLoaded(true)}
      onError={() => setImageError(true)}
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition duration-200",
        loaded ? "blur-none" : "blur-md"
      )}
      alt={generateImageAlt(card, index)}
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div 
      className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="selected-card-title"
      aria-describedby="selected-card-content"
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
        aria-hidden="true"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-4 z-[70]"
        id="selected-card-content"
      >
        {selected?.title && (
          <h3 id="selected-card-title" className="sr-only">
            {selected.title}
          </h3>
        )}
        {selected?.content}
      </motion.div>
    </div>
  );
};
