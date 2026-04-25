"use client";

import { useTranslations } from "next-intl";
import { personalInfo } from "@/lib/data";
import SocialLinks from "./SocialLinks";

/**
 * Footer with social links and copyright.
 */
export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-8 px-4 border-t border-card-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {personalInfo.name}. {t("rights")}
        </p>
        <SocialLinks size={18} />
      </div>
    </footer>
  );
}
