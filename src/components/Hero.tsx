"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { personalInfo } from "@/lib/data";
import { FiMail } from "react-icons/fi";
import SocialLinks from "./SocialLinks";

/**
 * Hero section — asymmetric layout on desktop, centered on mobile.
 * Oversized heading, animated avatar with glow ring, dot-grid background.
 */
export default function Hero() {
  const t = useTranslations("hero");
  const role = personalInfo.title;
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "100px" });

  useEffect(() => {
    if (done) return;
    if (text.length < role.length) {
      const timer = setTimeout(() => {
        setText(role.slice(0, text.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    } else {
      setDone(true);
    }
  }, [text, done, role]);

  const orbAnimation1 = isInView
    ? { x: [0, 30, -20, 0], y: [0, -25, 15, 0] }
    : { x: 0, y: 0 };
  const orbAnimation2 = isInView
    ? { x: [0, -25, 20, 0], y: [0, 30, -20, 0] }
    : { x: 0, y: 0 };
  const orbAnimation3 = isInView
    ? { scale: [1, 1.15, 0.9, 1] }
    : { scale: 1 };

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] flex items-center px-4 pt-20 pb-10 overflow-hidden">
      {/* Background gradient orbs — reduced blur on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={orbAnimation1}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-[60px] md:blur-[120px]"
        />
        <motion.div
          animate={orbAnimation2}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/20 rounded-full blur-[60px] md:blur-[120px]"
        />
        <motion.div
          animate={orbAnimation3}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[60px] md:blur-[120px]"
        />
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Desktop: asymmetric two-column | Mobile: centered stack */}
        <div className="flex flex-col items-center gap-10">
          {/* Text content */}
          <div className="flex-1 text-center order-2">
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted text-base sm:text-lg mb-3"
            >
              {t("greeting")}
            </motion.p>

            {/* Name — oversized */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 gradient-text leading-[1.05] tracking-tight"
            >
              {personalInfo.name}
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-8 mb-6"
            >
              <span className="text-lg sm:text-xl text-primary font-mono typewriter-cursor">
                {text}
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-muted max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center mb-8"
            >
              <a
                href="#contact"
                className="group relative px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="absolute inset-0 rounded-lg bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <FiMail size={18} className="relative z-10" />
                <span className="relative z-10">{t("cta_contact")}</span>
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <SocialLinks className="justify-center" />
            </motion.div>
          </div>

          {/* Avatar with glow ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
            className="relative order-1 shrink-0"
          >
            {/* Outer glow ring — pauses when out of view */}
            <motion.div
              animate={isInView ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), transparent, var(--primary))",
                opacity: 0.3,
              }}
            />
            <div className="absolute -inset-2 rounded-full bg-background" />
            <Image
              src="/me.jpg"
              alt={personalInfo.name}
              width={200}
              height={200}
              priority
              className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-2 border-card-border shadow-2xl shadow-primary/10 object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border border-muted/30 flex justify-center p-1">
          <motion.div
            className="w-1 h-1 rounded-full bg-gradient-to-b from-primary to-secondary"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1], scale: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

    </section>
  );
}
