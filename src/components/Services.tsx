"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { FiMonitor, FiSmartphone, FiServer, FiLayers } from "react-icons/fi";

const serviceIcons: Record<string, React.ElementType> = {
  web: FiMonitor,
  mobile: FiSmartphone,
  backend: FiServer,
  fullstack: FiLayers,
};

const serviceKeys = ["web", "mobile", "backend", "fullstack"] as const;

const accentColors = [
  { border: "border-primary/40", bg: "bg-primary/5", hoverGlow: "hover:shadow-primary/20", icon: "text-primary", number: "from-primary to-primary-dark" },
  { border: "border-secondary/40", bg: "bg-secondary/5", hoverGlow: "hover:shadow-secondary/20", icon: "text-secondary", number: "from-secondary to-purple-600" },
  { border: "border-accent/40", bg: "bg-accent/5", hoverGlow: "hover:shadow-accent/20", icon: "text-accent", number: "from-accent to-cyan-600" },
  { border: "border-primary/40", bg: "bg-primary/5", hoverGlow: "hover:shadow-primary/20", icon: "text-primary", number: "from-primary to-secondary" },
];

export default function Services() {
  const t = useTranslations("services");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-24 px-4 bg-surface relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading heading={t("heading")} subtitle={t("subtitle")} />

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {serviceKeys.map((key, i) => {
            const colors = accentColors[i];
            const Icon = serviceIcons[key];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12, ease: "easeOut" }}
              >
                <div className={`group relative h-full p-4 sm:p-7 rounded-2xl bg-card border-2 ${colors.border} transition-all duration-300 hover:shadow-xl ${colors.hoverGlow} hover:-translate-y-2 hover:scale-[1.02]`}>
                  {/* Hover glow background */}
                  <div className={`absolute inset-0 rounded-2xl ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    {/* Number + Icon row */}
                    <div className="flex items-center justify-between mb-3 sm:mb-5">
                      <motion.div
                        className={`flex items-center justify-center size-10 sm:size-14 rounded-xl ${colors.bg} border ${colors.border} group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 8 }}
                      >
                        <Icon className={`size-5 sm:size-7 ${colors.icon}`} />
                      </motion.div>

                      <span className={`text-2xl sm:text-3xl font-black bg-gradient-to-br ${colors.number} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-lg font-bold text-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors duration-300">
                      {t(`${key}.title`)}
                    </h3>

                    {/* Accent line */}
                    <div className={`h-0.5 w-6 sm:w-8 rounded-full bg-gradient-to-r ${colors.number} mb-2 sm:mb-3 group-hover:w-12 transition-all duration-300`} />

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {t(`${key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
