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

const issuerAccents: Record<string, { gradient: string; bg: string; border: string }> = {
  "Anthropic Education": { gradient: "from-orange-400 to-amber-500", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  Vaadin: { gradient: "from-cyan-400 to-blue-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  Udemy: { gradient: "from-purple-400 to-violet-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
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

/** Content for a single cert entry */
function CertEntry({
  cert,
  viewLabel,
  index,
}: {
  cert: (typeof certifications)[number];
  viewLabel: string;
  index: number;
}) {
  const accent = issuerAccents[cert.issuer] ?? issuerAccents["Udemy"];

  return (
    <div className="group/cert relative flex items-start gap-3 py-3 px-3 -mx-3 rounded-xl hover:bg-card/50 transition-all duration-300">
      {/* Rank badge */}
      <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg ${accent.bg} ${accent.border} border`}>
        <span className="text-[10px] font-bold text-foreground/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-medium text-foreground leading-snug group-hover/cert:text-primary transition-colors duration-300">
          {cert.name}
        </h4>
        <p className="text-[11px] text-muted mt-0.5">{cert.date}</p>
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-primary hover:text-primary-dark mt-1 transition-colors"
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
  const accent = issuerAccents[issuer] ?? issuerAccents["Udemy"];

  return (
    <>
      {/* Header with metallic gradient bar */}
      <div className="relative mb-4 shrink-0">
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${accent.gradient} rounded-t-xl opacity-60`} />
        <div className="flex items-center gap-3 pt-4">
          <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${accent.bg} ${accent.border} border`}>
            <IssuerIcon issuer={issuer} size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">{issuer}</h3>
            <p className="text-[11px] text-muted font-mono">{certs.length} credentials</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-card-border/30 overflow-y-auto overflow-x-hidden min-h-0 flex-1">
        {certs.map((cert, i) => (
          <CertEntry key={cert.name} cert={cert} viewLabel={viewLabel} index={i} />
        ))}
      </div>
    </>
  );
}

/**
 * Certifications section — Trophy-shelf aesthetic with issuer branding,
 * metallic gradient accents, and numbered badge entries.
 * Desktop: grouped by issuer in columns | Mobile: swipeable carousel
 */
export default function Certifications() {
  const t = useTranslations("certifications");
  const viewLabel = t("view_credential");
  const rawGroups = groupByIssuer(certifications);
  // Display order: Anthropic, Udemy, Vaadin (Udemy in the middle)
  const desiredOrder = ["Anthropic Education", "Udemy", "Vaadin"];
  const groups = [...rawGroups].sort((a, b) => {
    const ai = desiredOrder.indexOf(a.issuer);
    const bi = desiredOrder.indexOf(b.issuer);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

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
    <section id="certifications" className="py-28 px-4 bg-background relative overflow-hidden">
      {/* Decorative trophy glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading heading={t("heading")} subtitle={t("subtitle")} />

        {/* Desktop: grouped by issuer */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {groups.map((group, i) => (
            <AnimatedSection key={group.issuer} delay={i * 0.1}>
              <div className="relative h-full max-h-[420px] flex flex-col p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-card-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
                <CertGroupContent
                  issuer={group.issuer}
                  certs={group.certs}
                  viewLabel={viewLabel}
                />
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
