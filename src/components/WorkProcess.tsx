"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import AnimatedSection from "./AnimatedSection";

const stepIcons = [
  <svg key="ear" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7">
    <path d="M6 12a6 6 0 0 1 12 0c0 4-3 7-6 9" />
    <path d="M12 12a2 2 0 0 1 2 2c0 1.5-1 2.5-2 3.5" />
    <circle cx="12" cy="6" r="0.5" fill="currentColor" />
  </svg>,
  <svg key="code" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>,
  <svg key="rocket" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>,
];

const stepColors = [
  { icon: "text-primary", border: "border-primary/30", bg: "bg-primary/5", hoverGlow: "hover:shadow-primary/15", gradient: "from-primary to-primary-dark" },
  { icon: "text-secondary", border: "border-secondary/30", bg: "bg-secondary/5", hoverGlow: "hover:shadow-secondary/15", gradient: "from-secondary to-purple-600" },
  { icon: "text-accent", border: "border-accent/30", bg: "bg-accent/5", hoverGlow: "hover:shadow-accent/15", gradient: "from-accent to-cyan-600" },
];

export default function WorkProcess() {
  const t = useTranslations("workProcess");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const steps = ["understand", "develop", "deliver"] as const;

  return (
    <section id="work-process" className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading heading={t("heading")} subtitle="" />

        <AnimatedSection delay={0.15}>
          <p className="text-center -mt-6 mb-16 text-lg sm:text-xl font-medium tracking-wide">
            <span className="text-muted">{t("subtitlePre")}</span>
            <span className="mx-1.5 text-foreground">—</span>
            <span className="gradient-text font-semibold">{t("subtitleHighlight")}</span>
          </p>
        </AnimatedSection>

        <div ref={containerRef} className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-[3.25rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-[2px]">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Connecting line (mobile — vertical) */}
          <div className="md:hidden absolute top-0 bottom-0 left-[2.25rem] w-[2px]">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-primary via-secondary to-accent"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((key, i) => {
              const colors = stepColors[i];

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.25, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="group flex md:flex-col items-start md:items-center gap-5 md:gap-0">
                    {/* Icon box */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        className={`relative flex items-center justify-center size-[4.5rem] rounded-2xl bg-card border-2 ${colors.border} shadow-lg hover:shadow-xl ${colors.hoverGlow} transition-all duration-300`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {/* Hover glow */}
                        <div className={`absolute inset-0 rounded-2xl ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                        {/* Step number badge */}
                        <span className={`absolute -top-2.5 -right-2.5 flex items-center justify-center size-7 rounded-full bg-gradient-to-br ${colors.gradient} text-xs font-bold text-white shadow-md`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Icon */}
                        <span className={`relative z-10 ${colors.icon}`}>{stepIcons[i]}</span>
                      </motion.div>

                      {/* Animated chevron arrows between steps (desktop) */}
                      {i < steps.length - 1 && (
                        <motion.div
                          className="hidden md:flex absolute top-1/2 -right-[calc(100%+1.5rem)] -translate-y-1/2 items-center pointer-events-none"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 1 + i * 0.3, duration: 0.5 }}
                        >
                          <svg width="32" height="18" viewBox="0 0 32 18" fill="none" className="text-primary/50">
                            <motion.path
                              d="M2 9h24m0 0l-6-7m6 7l-6 7"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              initial={{ pathLength: 0 }}
                              animate={isInView ? { pathLength: 1 } : {}}
                              transition={{ duration: 0.6, delay: 1.2 + i * 0.3 }}
                            />
                          </svg>
                        </motion.div>
                      )}
                    </div>

                    {/* Text content */}
                    <div className="md:mt-7 md:text-center">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {t(`${key}.title`)}
                      </h3>

                      {/* Accent underline */}
                      <div className={`h-0.5 w-8 rounded-full bg-gradient-to-r ${colors.gradient} mb-3 md:mx-auto group-hover:w-12 transition-all duration-300`} />

                      <p className="text-sm text-muted leading-relaxed max-w-[15rem] md:mx-auto">
                        {t(`${key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
