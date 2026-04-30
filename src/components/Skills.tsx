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
  SiGradle, SiApachemaven, SiClaude, SiOpenai,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { TbSql, TbApi, TbTestPipe, TbDeviceDesktopCheck } from "react-icons/tb";
import { MdIntegrationInstructions } from "react-icons/md";
import { GrTest } from "react-icons/gr";
import { DiScrum } from "react-icons/di";
import { BsRobot, BsChatDots } from "react-icons/bs";
import { RiRobot2Line } from "react-icons/ri";
import {
  HiOutlineCodeBracket,
  HiOutlineServerStack,
  HiOutlineCircleStack,
  HiOutlineBeaker,
  HiOutlineWrenchScrewdriver,
  HiOutlineCloud,
  HiOutlineCpuChip,
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
  claude: <SiClaude />,
  claudeapi: <SiClaude />,
  mcp: <HiOutlineCpuChip />,
  prompt: <BsChatDots />,
  agents: <RiRobot2Line />,
  embeddings: <HiOutlineCpuChip />,
  openai: <SiOpenai />,
};

/** Category header icons */
const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <HiOutlineCodeBracket className="text-2xl" />,
  backend: <HiOutlineServerStack className="text-2xl" />,
  database: <HiOutlineCircleStack className="text-2xl" />,
  testing: <HiOutlineBeaker className="text-2xl" />,
  tool: <HiOutlineWrenchScrewdriver className="text-2xl" />,
  cloud: <HiOutlineCloud className="text-2xl" />,
  ai: <HiOutlineCpuChip className="text-2xl" />,
};

const categoryColors: Record<string, { accent: string; glow: string; ring: string }> = {
  frontend: { accent: "text-primary", glow: "bg-primary/10", ring: "ring-primary/20" },
  backend: { accent: "text-secondary", glow: "bg-secondary/10", ring: "ring-secondary/20" },
  database: { accent: "text-accent", glow: "bg-accent/10", ring: "ring-accent/20" },
  testing: { accent: "text-primary", glow: "bg-primary/10", ring: "ring-primary/20" },
  tool: { accent: "text-secondary", glow: "bg-secondary/10", ring: "ring-secondary/20" },
  cloud: { accent: "text-accent", glow: "bg-accent/10", ring: "ring-accent/20" },
  ai: { accent: "text-primary", glow: "bg-primary/10", ring: "ring-primary/20" },
};

const categories = ["ai", "frontend", "backend", "database", "testing", "cloud"] as const;

/** Individual skill chip — hexagonal-inspired with glow on hover */
function SkillChip({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="group/chip relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-card/80 border border-card-border/60 hover:border-primary/50 transition-all duration-300 cursor-default overflow-hidden"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/chip:opacity-100 transition-opacity duration-300" />
      
      <span className="relative text-lg text-muted group-hover/chip:text-primary transition-colors duration-300">
        {iconMap[skill.icon] ?? <span className="text-xs font-bold">{skill.name[0]}</span>}
      </span>
      <span className="relative text-sm font-medium text-foreground/80 group-hover/chip:text-foreground transition-colors duration-300">
        {skill.name}
      </span>
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
  const colors = categoryColors[category];

  return (
    <>
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl pointer-events-none">
        <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full ${colors.glow} opacity-50`} />
      </div>

      <div className="relative flex items-center gap-3 mb-6">
        {/* Icon node with ring */}
        <div className={`relative flex items-center justify-center w-12 h-12 rounded-2xl ${colors.glow} ${colors.accent} ring-2 ${colors.ring} transition-all duration-300`}>
          {categoryIcons[category]}
          {/* Connecting dot */}
          <div className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${colors.glow} border-2 border-card hidden lg:block`} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{label}</h3>
          <p className="text-[11px] text-muted/60 font-mono">{items.length} skills</p>
        </div>
      </div>

      <div className="relative flex flex-wrap gap-2">
        {items.map((skill, i) => (
          <SkillChip key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </>
  );
}

/** Desktop: Category card */
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl bg-card/70 backdrop-blur-sm border border-card-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 p-6 flex flex-col overflow-hidden"
    >
      <CategoryCardContent category={category} label={label} items={items} />
    </motion.div>
  );
}

/**
 * Skills / Tech Stack section — Constellation node-map aesthetic
 * Desktop: 3x2 grid | Mobile: swipeable carousel
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
    <section id="skills" className="py-28 bg-surface relative overflow-hidden">
      {/* Constellation dots background */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: "10%", y: "20%", size: 3, delay: 0 },
          { x: "85%", y: "15%", size: 2, delay: 0.5 },
          { x: "70%", y: "80%", size: 4, delay: 1 },
          { x: "25%", y: "75%", size: 2, delay: 1.5 },
          { x: "50%", y: "10%", size: 3, delay: 0.8 },
          { x: "90%", y: "50%", size: 2, delay: 1.2 },
        ].map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/20"
            style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: dot.delay }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
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
