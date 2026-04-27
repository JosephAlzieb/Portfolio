"use client";

import { useTranslations } from "next-intl";
import { certifications } from "@/lib/data";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import MobileSwipeCarousel from "./MobileSwipeCarousel";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { SiUdemy, SiVaadin, SiAnthropic } from "react-icons/si";

/** Map issuer names to their brand icons */
const issuerIcons: Record<string, React.ElementType> = {
  "Anthropic Education": SiAnthropic,
  Vaadin: SiVaadin,
  Udemy: SiUdemy,
};

function IssuerIcon({ issuer, size }: { issuer: string; size: number }) {
  const Icon = issuerIcons[issuer];
  return Icon ? <Icon size={size} /> : <FiAward size={size} />;
}

/** Group certifications by issuer */
function groupByIssuer(certs: typeof certifications) {
  const groups: { issuer: string; certs: typeof certifications }[] = [];
  for (const cert of certs) {
    const existing = groups.find((g) => g.issuer === cert.issuer);
    if (existing) {
      existing.certs.push(cert);
    } else {
      groups.push({ issuer: cert.issuer, certs: [cert] });
    }
  }
  return groups;
}

/** Content for a single cert entry inside a group card */
function CertEntry({
  cert,
  viewLabel,
}: {
  cert: (typeof certifications)[number];
  viewLabel: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="text-primary mt-0.5 shrink-0">
        <FiAward size={16} />
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-medium text-foreground leading-snug">
          {cert.name}
        </h4>
        <p className="text-[11px] text-muted">{cert.date}</p>
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-primary hover:text-primary-dark mt-0.5 transition-colors"
          >
            <FiExternalLink size={11} />
            {viewLabel}
          </a>
        )}
      </div>
    </div>
  );
}

/** Grouped card content (shared between desktop grid and mobile carousel) */
function CertGroupContent({
  issuer,
  certs,
  viewLabel,
}: {
  issuer: string;
  certs: typeof certifications;
  viewLabel: string;
}) {
  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
          <IssuerIcon issuer={issuer} size={20} />
        </div>
        <h3 className="text-base font-bold text-foreground">{issuer}</h3>
      </div>
      <div className="space-y-3">
        {certs.map((cert) => (
          <CertEntry key={cert.name} cert={cert} viewLabel={viewLabel} />
        ))}
      </div>
    </>
  );
}

/**
 * Certifications section displaying professional credentials.
 * Desktop: 3-column grid (flat) | Mobile: swipeable carousel grouped by issuer
 */
export default function Certifications() {
  const t = useTranslations("certifications");
  const viewLabel = t("view_credential");
  const groups = groupByIssuer(certifications);

  const carouselItems = groups.map((group) => ({
    key: group.issuer,
    peekIcon: <IssuerIcon issuer={group.issuer} size={16} />,
    content: (
      <CertGroupContent
        issuer={group.issuer}
        certs={group.certs}
        viewLabel={viewLabel}
      />
    ),
  }));

  return (
    <section id="certifications" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeading heading={t("heading")} subtitle={t("subtitle")} />

        {/* Desktop: full flat grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <AnimatedSection key={cert.name} delay={i * 0.05}>
              <div className="group p-5 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full">
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
                        {viewLabel}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Mobile: swipeable carousel grouped by issuer */}
        <div className="md:hidden">
          <MobileSwipeCarousel items={carouselItems} height={380} />
        </div>
      </div>
    </section>
  );
}
