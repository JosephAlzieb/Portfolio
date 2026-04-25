"use client";

import { useState, useCallback, type FormEvent, type FocusEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const baseInputClasses =
  "w-full px-4 py-3 rounded-lg bg-background/50 border outline-none transition-all duration-300 text-foreground placeholder:text-muted/40";

const inputOk =
  "border-card-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_20px_-4px] focus:shadow-primary/25";

const inputErr =
  "border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

/**
 * Contact section with field-level validation, async submission, and inline feedback.
 */
export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /** Validate a single field, return error key or undefined. */
  const validateField = useCallback(
    (name: string, value: string): string | undefined => {
      const v = value.trim();
      switch (name) {
        case "name":
          if (!v) return t("validation_name_required");
          if (v.length < 2) return t("validation_name_min");
          return undefined;
        case "email":
          if (!v) return t("validation_email_required");
          if (!EMAIL_RE.test(v)) return t("validation_email_invalid");
          return undefined;
        case "message":
          if (!v) return t("validation_message_required");
          if (v.length < 10) return t("validation_message_min");
          return undefined;
        default:
          return undefined;
      }
    },
    [t],
  );

  /** Validate all fields, return true if valid. */
  const validateAll = useCallback(
    (form: HTMLFormElement): boolean => {
      const data = new FormData(form);
      const next: FieldErrors = {};
      let valid = true;
      for (const field of ["name", "email", "message"] as const) {
        const err = validateField(field, (data.get(field) as string) ?? "");
        if (err) {
          next[field] = err;
          valid = false;
        }
      }
      setErrors(next);
      setTouched({ name: true, email: true, message: true });
      return valid;
    },
    [validateField],
  );

  /** On blur: validate touched field. */
  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  /** On input change: clear error if field is now valid. */
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (!touched[name]) return;
    const err = validateField(name, value);
    if (!err) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FieldErrors];
        return next;
      });
    } else {
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!validateAll(form)) return;

    setStatus("sending");
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xeevdqzq", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setErrors({});
        setTouched({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function inputCx(field: keyof FieldErrors) {
    return `${baseInputClasses} ${touched[field] && errors[field] ? inputErr : inputOk}`;
  }

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <SectionHeading heading={t("heading")} subtitle={t("subtitle")} />

        <AnimatedSection delay={0.2}>
          <div className="relative p-6 sm:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-card-border/60 shadow-xl shadow-primary/5">
            {/* Subtle gradient accent on top border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-t-2xl" />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-16"
              >
                <FiCheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {t("success_title")}
                </h3>
                <p className="text-muted mb-6">{t("success_message")}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all duration-200"
                >
                  {t("send_another")}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                    {t("name")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={t("name_placeholder")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={inputCx("name")}
                  />
                  <FieldError message={errors.name} />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t("email_placeholder")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={inputCx("email")}
                  />
                  <FieldError message={errors.email} />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    {t("message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t("message_placeholder")}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`${inputCx("message")} resize-none`}
                  />
                  <FieldError message={errors.message} />
                </div>

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500 text-sm"
                  >
                    <FiAlertCircle size={16} />
                    {t("error_message")}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === "sending" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <FiSend size={18} />
                  )}
                  {status === "sending" ? t("sending") : t("send")}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/** Animated inline field error message. */
function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          className="text-red-500 text-xs mt-1.5 flex items-center gap-1"
        >
          <FiAlertCircle size={12} className="shrink-0" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
