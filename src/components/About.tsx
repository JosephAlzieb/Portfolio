"use client";

import { useTranslations } from "next-intl";
import { personalInfo, spokenLanguages } from "@/lib/data";
import AnimatedSection from "./AnimatedSection";
import { FiMapPin, FiBriefcase, FiBook, FiGlobe } from "react-icons/fi";

/**
 * About Me section with personal details, avatar, and info cards.
 */
export default function About() {
  const t = useTranslations("about");

  const infoCards = [
    { icon: <FiMapPin size={20} />, label: t("location"), value: personalInfo.location },
    { icon: <FiBriefcase size={20} />, label: t("company"), value: personalInfo.company },
    { icon: <FiBook size={20} />, label: t("education"), value: `${personalInfo.university} (${personalInfo.studyPeriod})` },
    { icon: <FiGlobe size={20} />, label: t("languages"), value: spokenLanguages.map((l) => l.name).join(", ") },
  ];

  return (
    <section id="about" className="py-20 px-4">
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
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
          </AnimatedSection>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {infoCards.map((card, i) => (
              <AnimatedSection key={card.label} delay={0.2 + i * 0.1}>
                <div className="p-4 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-all duration-300 group">
                  <div className="text-primary mb-2 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <p className="text-xs text-muted mb-1">{card.label}</p>
                  <p className="text-sm font-medium text-foreground">{card.value}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
