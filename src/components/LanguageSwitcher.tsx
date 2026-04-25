"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

/**
 * Language switcher toggle (EN / DE).
 */
export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const next = locale === "en" ? "de" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <button
      onClick={toggleLocale}
      className="px-2 py-1 rounded-lg text-xs font-semibold hover:bg-card transition-colors text-muted hover:text-foreground border border-card-border"
      aria-label={`Switch language to ${locale === "en" ? "Deutsch" : "English"}`}
    >
      {locale === "en" ? "DE" : "EN"}
    </button>
  );
}
