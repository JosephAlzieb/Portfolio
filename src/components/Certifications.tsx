"use client";

import { useTranslations } from "next-intl";
import { certifications } from "@/lib/data";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { FiAward, FiExternalLink } from "react-icons/fi";

/**
 * Certifications section displaying professional credentials.
 */
export default function Certifications() {
  const t = useTranslations("certifications");

  return (
    <section id="certifications" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading heading={t("heading")} subtitle={t("subtitle")} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <AnimatedSection key={cert.name} delay={i * 0.05}>
              <div className="group p-5 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-0.5 shrink-0">
                    <FiAward size={20} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground leading-snug mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-xs text-muted">
                      {cert.issuer} &middot; {cert.date}
                    </p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-dark mt-2 transition-colors"
                      >
                        <FiExternalLink size={12} />
                        {t("view_credential")}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
