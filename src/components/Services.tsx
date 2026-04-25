"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { FiMonitor, FiSmartphone, FiServer, FiLayers } from "react-icons/fi";

const serviceIcons: Record<string, React.ElementType> = {
  web: FiMonitor,
  mobile: FiSmartphone,
  backend: FiServer,
  fullstack: FiLayers,
};

const serviceKeys = ["web", "mobile", "backend", "fullstack"] as const;

/**
 * Services section with four animated service cards.
 * Desktop: 4-column grid | Mobile: compact 2×2 grid
 */
export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-20 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionHeading heading={t("heading")} subtitle={t("subtitle")} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {serviceKeys.map((key, i) => (
            <AnimatedSection key={key} delay={i * 0.1}>
              <div className="group h-full p-3 sm:p-6 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <div className="text-primary mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {(() => { const Icon = serviceIcons[key]; return <Icon className="size-6 sm:size-8" />; })()}
                </div>
                <h3 className="text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {t(`${key}.description`)}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
