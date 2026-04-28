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
  { icon: "text-primary", bg: "bg-primary", gradient: "from-primary to-blue-400", ring: "ring-primary/20", glow: "shadow-primary/20" },
  { icon: "text-secondary", bg: "bg-secondary", gradient: "from-secondary to-purple-400", ring: "ring-secondary/20", glow: "shadow-secondary/20" },
  { icon: "text-accent", bg: "bg-accent", gradient: "from-accent to-cyan-400", ring: "ring-accent/20", glow: "shadow-accent/20" },
];

/** Shared icon box used in both desktop and mobile layouts */
function StepIconBox({ colors, index }: { colors: typeof stepColors[number]; index: number }) {
  return (
    <motion.div
      className={`relative flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-2xl bg-card border-2 border-card-border shadow-lg ${colors.glow} transition-shadow duration-300`}
      whileHover={{ scale: 1.15, rotate: 8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className={`absolute inset-0 rounded-2xl ring-2 ${colors.ring}`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
      />
      <span className={`absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full ${colors.bg} text-[10px] font-bold text-white shadow-md`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className={colors.icon}>{stepIcons[index]}</span>
    </motion.div>
  );
}

export default function WorkProcess() {
  const t = useTranslations("workProcess");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const steps = ["understand", "develop", "deliver"] as const;

  return (
    <section id="work-process" className="py-28 px-4 bg-background relative overflow-hidden">
      {/* Background — subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, var(--foreground) 0, var(--foreground) 1px, transparent 1px, transparent 40px)`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading heading={t("heading")} subtitle="" />

        <AnimatedSection delay={0.15}>
          <p className="text-center -mt-6 mb-20 text-lg sm:text-xl font-medium tracking-wide">
            <span className="text-muted">{t("subtitlePre")}</span>
            <span className="mx-1.5 text-foreground">—</span>
            <span className="gradient-text font-semibold">{t("subtitleHighlight")}</span>
          </p>
        </AnimatedSection>

        <div ref={containerRef} className="relative">
          {/* Horizontal connecting line (desktop) */}
          <div className="hidden md:block absolute top-[3.25rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-[2px]">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Vertical connecting line (mobile) */}
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
                      <StepIconBox colors={colors} index={i} />
                    </div>

                    {/* Text content */}
                    <div className="md:mt-7 md:text-center">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {t(`${key}.title`)}
                      </h3>
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
