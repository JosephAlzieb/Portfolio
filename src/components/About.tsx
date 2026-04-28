"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { personalInfo, spokenLanguages } from "@/lib/data";
import AnimatedSection from "./AnimatedSection";
import { FiMapPin, FiBriefcase, FiBook, FiGlobe, FiChevronDown, FiChevronUp } from "react-icons/fi";

/**
 * About Me section — Editorial magazine layout.
 * Features a large decorative quote mark, vertical accent bar on the text column,
 * and bento-grid info cards with glassmorphism and unique icon treatments.
 */
export default function About() {
  const t = useTranslations("about");
  const [expanded, setExpanded] = useState(false);

  const infoCards = [
    {
      icon: <FiMapPin className="size-5" />,
      label: t("location"),
      value: personalInfo.location,
      accent: "from-primary to-blue-400",
      iconBg: "bg-primary/10 text-primary",
    },
    {
      icon: <FiBriefcase className="size-5" />,
      label: t("company"),
      value: personalInfo.company,
      accent: "from-secondary to-purple-400",
      iconBg: "bg-secondary/10 text-secondary",
    },
    {
      icon: <FiBook className="size-5" />,
      label: t("education"),
      value: `${personalInfo.university} (${personalInfo.studyPeriod})`,
      accent: "from-accent to-cyan-400",
      iconBg: "bg-accent/10 text-accent",
    },
    {
      icon: <FiGlobe className="size-5" />,
      label: t("languages"),
      value: spokenLanguages.map((l) => l.name).join(", "),
      accent: "from-primary to-secondary",
      iconBg: "bg-primary/10 text-primary",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14 gradient-text">
            {t("heading")}
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content — editorial style with vertical accent bar */}
          <AnimatedSection delay={0.1}>
            <div className="relative">
              {/* Large decorative quote mark */}
              <div className="absolute -top-8 -left-2 sm:-left-4 text-[80px] sm:text-[120px] font-serif leading-none text-primary/[0.07] select-none pointer-events-none">
                &ldquo;
              </div>

              {/* Vertical accent bar */}
              <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

              <div className="md:pl-8 space-y-5 text-muted leading-[1.85] text-[15px] sm:text-base">
                {/* First paragraph — slightly larger, acts as lead */}
                <p className="text-foreground/90 text-base sm:text-lg font-medium leading-relaxed">
                  {t("p1")}
                </p>

                {/* Desktop: always visible */}
                <div className="hidden md:block space-y-5">
                  <p>{t("p2")}</p>
                  <p>{t("p3")}</p>
                </div>

                {/* Mobile: collapsible */}
                <div className="md:hidden">
                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden space-y-5"
                      >
                        <p>{t("p2")}</p>
                        <p>{t("p3")}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-3 inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline transition-colors"
                  >
                    {expanded ? t("readLess") : t("readMore")}
                    {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Info cards — bento grid with glassmorphism */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {infoCards.map((card, i) => (
              <AnimatedSection key={card.label} delay={0.2 + i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative p-4 sm:p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-card-border/50 hover:border-primary/40 transition-all duration-300 group h-full overflow-hidden"
                >
                  {/* Gradient accent stripe at top */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${card.iconBg} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {card.icon}
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted/70 uppercase tracking-wider font-medium mb-1">
                      {card.label}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground leading-snug">
                      {card.value}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
