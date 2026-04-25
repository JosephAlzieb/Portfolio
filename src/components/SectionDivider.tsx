"use client";

import { motion } from "framer-motion";

/**
 * An animated divider between sections.
 * Wider gradient lines with a glowing diamond in the center.
 */
export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative flex items-center w-full max-w-2xl mx-auto px-6">
        {/* Left gradient line */}
        <motion.div
          initial={{ scaleX: 0, originX: 1 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-primary/50"
        />

        {/* Center diamond */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          whileInView={{ scale: 1, rotate: 45 }}
          transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 200 }}
          viewport={{ once: true }}
          className="mx-4 w-2.5 h-2.5 bg-primary/70 shadow-lg shadow-primary/30"
        />

        {/* Right gradient line */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/30 to-primary/50"
        />
      </div>
    </div>
  );
}
