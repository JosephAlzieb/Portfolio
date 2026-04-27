"use client";

import { useTranslations } from "next-intl";
import { skills, type Skill } from "@/lib/data";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import MobileSwipeCarousel from "./MobileSwipeCarousel";
import {
  FaJava, FaDocker, FaGitAlt, FaReact,
} from "react-icons/fa";
import {
  SiSpringboot, SiHtml5, SiCss, SiFlutter,
  SiVaadin, SiPostgresql, SiMariadb, SiMongodb,
  SiGradle, SiApachemaven,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { TbSql, TbApi, TbTestPipe, TbDeviceDesktopCheck } from "react-icons/tb";
import { MdIntegrationInstructions } from "react-icons/md";
import { GrTest } from "react-icons/gr";
import { DiScrum } from "react-icons/di";
import {
  HiOutlineCodeBracket,
  HiOutlineServerStack,
  HiOutlineCircleStack,
  HiOutlineBeaker,
  HiOutlineWrenchScrewdriver,
  HiOutlineCloud,
} from "react-icons/hi2";

/** Map skill icon identifiers to React icon components */
const iconMap: Record<string, React.ReactNode> = {
  java: <FaJava />,
  spring: <SiSpringboot />,
  rest: <TbApi />,
  grpc: <TbApi />,
  vaadin: <SiVaadin />,
  react: <FaReact />,
  html5: <SiHtml5 />,
  css3: <SiCss />,
  flutter: <SiFlutter />,
  sql: <TbSql />,
  mongodb: <SiMongodb />,
  mariadb: <SiMariadb />,
  postgresql: <SiPostgresql />,
  unit: <GrTest />,
  integration: <MdIntegrationInstructions />,
  uitest: <TbDeviceDesktopCheck />,
  e2e: <TbTestPipe />,
  azure: <VscAzure />,
  docker: <FaDocker />,
  podman: <FaDocker />,
  maven: <SiApachemaven />,
  gradle: <SiGradle />,
  git: <FaGitAlt />,
  scrum: <DiScrum />,
};

/** Category header icons */
const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <HiOutlineCodeBracket className="text-2xl" />,
  backend: <HiOutlineServerStack className="text-2xl" />,
  database: <HiOutlineCircleStack className="text-2xl" />,
  testing: <HiOutlineBeaker className="text-2xl" />,
  tool: <HiOutlineWrenchScrewdriver className="text-2xl" />,
  cloud: <HiOutlineCloud className="text-2xl" />,
};

const categories = ["frontend", "backend", "database", "testing", "tool", "cloud"] as const;

/** Individual skill chip inside a card — no per-chip IntersectionObserver */
function SkillChip({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-card-border hover:border-primary/50 hover:bg-primary/5 transition-colors duration-200 cursor-default"
    >
      <span className="text-lg text-muted group-hover:text-primary transition-colors">
        {iconMap[skill.icon] ?? <span className="text-xs font-bold">{skill.name[0]}</span>}
      </span>
      <span className="text-sm font-medium text-foreground/80">{skill.name}</span>
    </motion.div>
  );
}

/** Category card content (shared between desktop and mobile) */
function CategoryCardContent({
  category,
  label,
  items,
}: {
  category: string;
  label: string;
  items: Skill[];
}) {
  return (
    <>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
          {categoryIcons[category]}
        </div>
        <h3 className="text-lg font-bold text-foreground">{label}</h3>
      </div>
      <div className="relative flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <SkillChip key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </>
  );
}

/** Desktop: Category card with scroll animation */
function CategoryCard({
  category,
  label,
  items,
  index,
}: {
  category: string;
  label: string;
  items: Skill[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl bg-card border border-card-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 p-6 flex flex-col"
    >
      <CategoryCardContent category={category} label={label} items={items} />
    </motion.div>
  );
}

/**
 * Skills / Tech Stack section
 * Desktop: 3×2 grid | Mobile: swipeable card carousel
 */
export default function Skills() {
  const t = useTranslations("skills");

  const groupedRows = categories
    .map((category) => ({
      category,
      label: t(`categories.${category}`),
      items: skills.filter((s) => s.category === category),
    }))
    .filter((row) => row.items.length > 0);

  const carouselItems = groupedRows.map((row) => ({
    key: row.category,
    peekIcon: categoryIcons[row.category],
    content: (
      <div className="group relative h-full">
        <CategoryCardContent
          category={row.category}
          label={row.label}
          items={row.items}
        />
      </div>
    ),
  }));

  return (
    <section id="skills" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading heading={t("heading")} subtitle={t("subtitle")} />

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groupedRows.map((row, i) => (
            <CategoryCard
              key={row.category}
              category={row.category}
              label={row.label}
              items={row.items}
              index={i}
            />
          ))}
        </div>

        {/* Mobile swipeable carousel */}
        <div className="md:hidden">
          <MobileSwipeCarousel items={carouselItems} height={280} />
        </div>
      </div>
    </section>
  );
}
