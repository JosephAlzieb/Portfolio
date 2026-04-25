import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Joseph Alzieb | Fullstack Software Engineer",
  description:
    "Portfolio of Joseph Alzieb — Fullstack Software Engineer based in Düsseldorf, Germany. Specializing in Java, Spring Boot, Flutter, and modern web technologies.",
  keywords: [
    "Joseph Alzieb",
    "Software Engineer",
    "Fullstack Developer",
    "Java",
    "Spring Boot",
    "Flutter",
    "Düsseldorf",
    "Portfolio",
  ],
  authors: [{ name: "Joseph Alzieb" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Joseph Alzieb | Fullstack Software Engineer",
    description:
      "Fullstack Software Engineer based in Düsseldorf. Building robust, scalable software solutions.",
    type: "website",
    locale: "en_US",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
