"use client";

import { useTranslations } from "next-intl";
import { personalInfo } from "@/lib/data";
import SocialLinks from "./SocialLinks";

/**
 * Footer with gradient top border, social links, built-with, and copyright.
 */
export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative pt-10 pb-8 px-4">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-5">
          {/* Social links */}
          <SocialLinks size={18} />

          {/* Copyright */}
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {personalInfo.name}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
