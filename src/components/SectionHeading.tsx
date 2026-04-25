"use client";

import AnimatedSection from "./AnimatedSection";

/**
 * Reusable section heading with gradient title, CSS-animated accent line, and subtitle.
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
        {/* Accent line — CSS animation instead of framer-motion */}
        <div className="mx-auto mb-4 h-0.5 w-16 origin-center rounded-full bg-gradient-to-r from-primary via-secondary to-accent animate-[scaleX_0.6s_ease-out_forwards] scale-x-0" />
        <p className="text-muted max-w-lg mx-auto">{subtitle}</p>
      </div>
    </AnimatedSection>
  );
}
