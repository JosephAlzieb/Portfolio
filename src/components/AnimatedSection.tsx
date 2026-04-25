"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";

/**
 * Reusable wrapper that animates children into view
 * when they enter the viewport (fade + slide up).
 * Uses a smaller trigger margin on mobile so elements animate earlier.
 */
interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

export default function AnimatedSection({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [margin, setMargin] = useState("-80px");

  useEffect(() => {
    setMargin(window.innerWidth < 768 ? "-30px" : "-80px");
  }, []);

  const isInView = useInView(ref, { once: true, margin: margin as "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}
