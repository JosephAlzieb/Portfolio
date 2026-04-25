"use client";

import { useTranslations } from "next-intl";
import { projects } from "@/lib/data";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";
import { FiGithub, FiExternalLink } from "react-icons/fi";

/**
 * Projects section showing selected GitHub projects as cards.
 */
export default function Projects() {
  const t = useTranslations("projects");

  return (
    <section id="projects" className="py-20 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeading heading={t("heading")} subtitle={t("subtitle")} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.name} delay={i * 0.1}>
              <div className="group h-full flex flex-col p-6 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
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
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
