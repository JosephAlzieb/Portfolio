"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { personalInfo, spokenLanguages } from "@/lib/data";
import AnimatedSection from "./AnimatedSection";
import { FiMapPin, FiBriefcase, FiBook, FiGlobe, FiChevronDown, FiChevronUp } from "react-icons/fi";

/**
 * About Me section with personal details, avatar, and info cards.
 * On mobile, the text is collapsed with a "Read more" button.
 */
export default function About() {
  const t = useTranslations("about");
  const [expanded, setExpanded] = useState(false);

  const infoCards = [
    { icon: <FiMapPin className="size-4 sm:size-5" />, label: t("location"), value: personalInfo.location },
    { icon: <FiBriefcase className="size-4 sm:size-5" />, label: t("company"), value: personalInfo.company },
    { icon: <FiBook className="size-4 sm:size-5" />, label: t("education"), value: `${personalInfo.university} (${personalInfo.studyPeriod})` },
    { icon: <FiGlobe className="size-4 sm:size-5" />, label: t("languages"), value: spokenLanguages.map((l) => l.name).join(", ") },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 gradient-text">
            {t("heading")}
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>{t("p1")}</p>

              {/* Desktop: always visible */}
              <div className="hidden md:block space-y-4">
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
                      className="overflow-hidden space-y-4"
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
          </AnimatedSection>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {infoCards.map((card, i) => (
              <AnimatedSection key={card.label} delay={0.2 + i * 0.1}>
                <div className="p-3 sm:p-4 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-all duration-300 group h-full">
                  <div className="text-primary mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted mb-0.5 sm:mb-1">{card.label}</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">{card.value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
