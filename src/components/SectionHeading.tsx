"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

/**
 * Reusable section heading with gradient title, animated accent line, and subtitle.
 */
export default function SectionHeading({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle: string;
}) {
  return (
    <AnimatedSection>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 gradient-text">
          {heading}
        </h2>
        {/* Animated accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto mb-4 h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
        />
        <p className="text-muted max-w-lg mx-auto">{subtitle}</p>
      </div>
    </AnimatedSection>
  );
}
