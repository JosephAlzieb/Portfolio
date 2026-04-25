"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { personalInfo } from "@/lib/data";
import { FiMail } from "react-icons/fi";
import SocialLinks from "./SocialLinks";

/**
 * Hero section with animated typewriter effect, social links, and CTA buttons.
 */
export default function Hero() {
  const t = useTranslations("hero");
  const role = personalInfo.title;
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

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

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mb-6"
        >
          <img
            src="me.jpg"
            alt={personalInfo.name}
            width={120}
            height={120}
            className="w-28 h-28 rounded-full mx-auto border-4 border-primary/50 shadow-lg shadow-primary/20"
          />
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted text-lg mb-2"
        >
          {t("greeting")}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 gradient-text"
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
          className="text-muted max-w-xl mx-auto mb-8 leading-relaxed"
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
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40"
          >
            <FiMail size={18} />
            {t("cta_contact")}
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted rounded-full flex justify-center"
        >
          <motion.div className="w-1.5 h-1.5 bg-muted rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
