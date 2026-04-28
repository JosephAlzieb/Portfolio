"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { projects } from "@/lib/data";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp, FiFolder } from "react-icons/fi";

/** Number of project cards visible on mobile before expanding */
const MOBILE_VISIBLE_COUNT = 2;

const cardAccents = [
  "from-primary to-blue-400",
  "from-secondary to-purple-400",
  "from-accent to-cyan-400",
  "from-primary to-secondary",
  "from-secondary to-accent",
  "from-accent to-primary",
];

/** A single project card — case-study style with diagonal accent bar */
function ProjectCard({
  project,
  index,
  t,
}: {
  project: (typeof projects)[number];
  index: number;
  t: ReturnType<typeof useTranslations<"projects">>;
}) {
  const accent = cardAccents[index % cardAccents.length];

  return (
    <AnimatedSection key={project.name} delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="group h-full flex flex-col rounded-2xl bg-card/70 backdrop-blur-sm border border-card-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
      >
        {/* Top accent bar with project number */}
        <div className="relative h-24 overflow-hidden">
          {/* Gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500`} />

          {/* Diagonal stripe pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(135deg, var(--foreground) 0, var(--foreground) 1px, transparent 1px, transparent 12px)`,
            }}
          />

          {/* Project number */}
          <div className="absolute top-3 left-5 flex items-center gap-2">
            <FiFolder className={`size-4 text-foreground/30`} />
            <span className="text-xs font-mono text-foreground/30 tracking-wider">
              PROJECT_{String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Large decorative number */}
          <div className="absolute -bottom-4 right-4 text-[72px] font-black text-foreground/[0.03] leading-none select-none">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 -mt-2">
          <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>

          <p className="text-sm text-muted mb-5 flex-1 leading-relaxed">
            {t(project.descriptionKey.replace("projects.", ""))}
          </p>

          {/* Tech tags — pill style */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2.5 py-1 rounded-full bg-primary/8 text-primary/80 border border-primary/15 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links — separated by a subtle divider */}
          <div className="flex gap-4 pt-3 border-t border-card-border/30">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-300 group/link"
            >
              <FiGithub size={15} className="group-hover/link:scale-110 transition-transform" />
              {t("view_code")}
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors duration-300 group/link"
              >
                <FiExternalLink size={15} className="group-hover/link:scale-110 transition-transform" />
                {t("view_live")}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

/**
 * Projects section — Magazine case-study layout with diagonal accent headers,
 * project numbering, and distinctive card designs.
 */
export default function Projects() {
  const t = useTranslations("projects");
  const [expanded, setExpanded] = useState(false);

  const visibleProjects = projects.slice(0, MOBILE_VISIBLE_COUNT);
  const hiddenProjects = projects.slice(MOBILE_VISIBLE_COUNT);
  const hasMore = hiddenProjects.length > 0;

  return (
    <section id="projects" className="py-28 px-4 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading heading={t("heading")} subtitle={t("subtitle")} />

        {/* Desktop: full grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} t={t} />
          ))}
        </div>

        {/* Mobile: limited + expand */}
        <div className="md:hidden">
          <div className="grid gap-4">
            {visibleProjects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} t={t} />
            ))}
          </div>

          {hasMore && (
            <>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-4 pt-4">
                      {hiddenProjects.map((project, i) => (
                        <ProjectCard
                          key={project.name}
                          project={project}
                          index={MOBILE_VISIBLE_COUNT + i}
                          t={t}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => setExpanded(!expanded)}
                className="mt-6 mx-auto flex items-center gap-2 px-6 py-2.5 rounded-full bg-card border border-card-border/60 text-foreground text-sm font-medium hover:border-primary/40 hover:text-primary transition-all duration-300"
                whileTap={{ scale: 0.95 }}
              >
                {expanded ? t("showLess") : t("showAll")}
                {expanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
              </motion.button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
