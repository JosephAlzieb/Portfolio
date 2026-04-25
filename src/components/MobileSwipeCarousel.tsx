"use client";

import { useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";

const SWIPE_THRESHOLD = 50;

export interface CarouselItem {
  /** Unique key for the item */
  key: string;
  /** Icon shown in the peek sidebar */
  peekIcon: ReactNode;
  /** Full card content */
  content: ReactNode;
}

/**
 * Reusable mobile swipeable carousel with left/right peek cards and dot indicators.
 * Renders children as swipeable cards with spring animations.
 */
export default function MobileSwipeCarousel({
  items,
  height = 280,
  showPeek = true,
}: {
  items: CarouselItem[];
  height?: number;
  /** Whether to show peek cards on left/right. Default true. */
  showPeek?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrentIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return items.length - 1;
        if (next >= items.length) return 0;
        return next;
      });
    },
    [items.length]
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD) {
        paginate(1);
      } else if (info.offset.x > SWIPE_THRESHOLD) {
        paginate(-1);
      }
    },
    [paginate]
  );

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 250 : -250,
      opacity: 0,
      scale: 0.9,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -250 : 250,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const prevIndex = (currentIndex - 1 + items.length) % items.length;
  const nextIndex = (currentIndex + 1) % items.length;

  return (
    <div className="flex flex-col items-center">
      {/* Card carousel area */}
      <div className="relative w-full overflow-hidden">
        <div className="flex items-stretch justify-center gap-3 px-2">
          {/* Previous card (peek left) */}
          {showPeek && (
            <motion.button
              onClick={() => paginate(-1)}
              className="hidden min-[400px]:flex flex-shrink-0 w-[40px] rounded-2xl bg-card/60 border border-card-border/50 items-center justify-center opacity-40 hover:opacity-60 transition-opacity overflow-hidden"
              aria-label="Previous"
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center gap-1.5 text-muted">
                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary text-sm">
                  {items[prevIndex].peekIcon}
                </div>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </motion.button>
          )}

          {/* Active card (draggable) */}
          <div className="relative flex-1 min-w-0" style={{ height }}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={items[currentIndex].key}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 z-20 rounded-2xl bg-card border border-card-border p-5 flex flex-col cursor-grab active:cursor-grabbing touch-pan-y overflow-auto"
              >
                {items[currentIndex].content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next card (peek right) */}
          {showPeek && (
            <motion.button
              onClick={() => paginate(1)}
              className="hidden min-[400px]:flex flex-shrink-0 w-[40px] rounded-2xl bg-card/60 border border-card-border/50 items-center justify-center opacity-40 hover:opacity-60 transition-opacity overflow-hidden"
              aria-label="Next"
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center gap-1.5 text-muted">
                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary text-sm">
                  {items[nextIndex].peekIcon}
                </div>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.button>
          )}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex gap-2 mt-5">
        {items.map((item, i) => (
          <button
            key={item.key}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 h-2 bg-primary"
                : "w-2 h-2 bg-muted/40 hover:bg-muted"
            }`}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
