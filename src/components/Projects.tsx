"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { projects } from "@/lib/data";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { FiGithub, FiExternalLink, FiChevronDown, FiChevronUp } from "react-icons/fi";

/** Number of project cards visible on mobile before expanding */
const MOBILE_VISIBLE_COUNT = 2;

/** A single project card (shared between desktop and mobile) */
function ProjectCard({
  project,
  index,
  t,
}: {
  project: (typeof projects)[number];
  index: number;
  t: ReturnType<typeof useTranslations<"projects">>;
}) {
  return (
    <AnimatedSection key={project.name} delay={index * 0.1}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="group h-full flex flex-col p-6 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
      >
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-muted mb-4 flex-1 leading-relaxed">
          {t(project.descriptionKey.replace("projects.", ""))}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
          >
            <FiGithub size={16} />
            {t("view_code")}
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
            >
              <FiExternalLink size={16} />
              {t("view_live")}
            </a>
          )}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

/**
 * Projects section showing selected GitHub projects as cards.
 * Desktop: full grid | Mobile: 2 visible + "Show all" expand button
 */
export default function Projects() {
  const t = useTranslations("projects");
  const [expanded, setExpanded] = useState(false);

  const visibleProjects = projects.slice(0, MOBILE_VISIBLE_COUNT);
  const hiddenProjects = projects.slice(MOBILE_VISIBLE_COUNT);
  const hasMore = hiddenProjects.length > 0;

  return (
    <section id="projects" className="py-20 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
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
                className="mt-5 mx-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
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
