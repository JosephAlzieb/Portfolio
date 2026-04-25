"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { FiMonitor, FiSmartphone, FiServer, FiLayers } from "react-icons/fi";

const serviceIcons: Record<string, React.ReactNode> = {
  web: <FiMonitor size={32} />,
  mobile: <FiSmartphone size={32} />,
  backend: <FiServer size={32} />,
  fullstack: <FiLayers size={32} />,
};

const serviceKeys = ["web", "mobile", "backend", "fullstack"] as const;

/**
 * Services section with four animated service cards.
 */
export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading heading={t("heading")} subtitle={t("subtitle")} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceKeys.map((key, i) => (
            <AnimatedSection key={key} delay={i * 0.1}>
              <div className="group h-full p-6 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {serviceIcons[key]}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
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
