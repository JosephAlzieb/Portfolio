/**
 * Central data file for Joseph Alzieb's portfolio.
 * All personal information, skills, projects, certifications, and services
 * are maintained here for easy updates.
 */

// ─── Personal Info ───────────────────────────────────────────────────────────

export const personalInfo = {
  name: "Joseph Alzieb",
  title: "Fullstack Software Engineer",
  location: "Düsseldorf, Germany",
  company: "GEBIT Solutions GmbH",
  university: "Heinrich Heine University Düsseldorf",
  studyPeriod: "2019 – 2022",
  email: "josephalzieb@gmail.com",
} as const;

// ─── Social Links ────────────────────────────────────────────────────────────

export const socialLinks = {
  github: "https://github.com/JosephAlzieb",
  linkedin: "https://www.linkedin.com/in/joseph-alzieb-573092220/",
} as const;

// ─── Languages (spoken) ─────────────────────────────────────────────────────

export const spokenLanguages = [
  { name: "German", level: "Professional" },
  { name: "English", level: "Working proficiency" },
  { name: "Arabic", level: "Native" },
] as const;

// ─── Technical Skills ────────────────────────────────────────────────────────

export type Skill = {
  name: string;
  icon: string;
  category: "backend" | "frontend" | "database" | "testing" | "cloud" | "tool";
};

export const skills: Skill[] = [
  // Backend
  { name: "Java", icon: "java", category: "backend" },
  { name: "Spring Boot", icon: "spring", category: "backend" },
  { name: "RESTful API", icon: "rest", category: "backend" },
  { name: "gRPC", icon: "grpc", category: "backend" },

  // Frontend
  { name: "Vaadin", icon: "vaadin", category: "frontend" },
  { name: "React", icon: "react", category: "frontend" },
  { name: "CSS", icon: "css3", category: "frontend" },
  { name: "Flutter", icon: "flutter", category: "frontend" },

  // Database
  { name: "SQL", icon: "sql", category: "database" },
  { name: "MongoDB", icon: "mongodb", category: "database" },
  { name: "MariaDB", icon: "mariadb", category: "database" },
  { name: "PostgreSQL", icon: "postgresql", category: "database" },

  // Testing
  { name: "Unit Testing", icon: "unit", category: "testing" },
  { name: "Integration Testing", icon: "integration", category: "testing" },
  { name: "UI Testing", icon: "uitest", category: "testing" },
  { name: "E2E Testing", icon: "e2e", category: "testing" },

  // Cloud & DevOps
  { name: "Microsoft Azure", icon: "azure", category: "cloud" },
  { name: "Docker", icon: "docker", category: "cloud" },


  // Tools
  { name: "Podman", icon: "podman", category: "tool" },
  { name: "Maven", icon: "maven", category: "tool" },
  { name: "Git", icon: "git", category: "tool" },
  { name: "Scrum", icon: "scrum", category: "tool" },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export type Project = {
  name: string;
  descriptionKey: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    name: "Crypto Price Tracker",
    descriptionKey: "projects.crypto_tracker.description",
    techStack: ["Dart", "Flutter", "API"],
    githubUrl: "https://github.com/JosephAlzieb/Crypto-Price-Tracker",
  },
  {
    name: "Crypto Wallet App",
    descriptionKey: "projects.crypto_wallet.description",
    techStack: ["Dart", "Flutter", "Firebase"],
    githubUrl: "https://github.com/JosephAlzieb/Crypto_Wallet_App",
  },
  {
    name: "Facebook UI Clone",
    descriptionKey: "projects.facebook_ui.description",
    techStack: ["Dart", "Flutter"],
    githubUrl: "https://github.com/JosephAlzieb/facebook_ui",
  },
  {
    name: "Meal App",
    descriptionKey: "projects.meal_app.description",
    techStack: ["Dart", "Flutter"],
    githubUrl: "https://github.com/JosephAlzieb/meal_app",
  },
  {
    name: "Product Management",
    descriptionKey: "projects.products.description",
    techStack: ["Java", "Spring Boot"],
    githubUrl: "https://github.com/JosephAlzieb/products",
  },
  {
    name: "Portfolio Website",
    descriptionKey: "projects.portfolio.description",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/JosephAlzieb/Portfolio",
  },
];

// ─── Certifications ─────────────────────────────────────────────────────────

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    name: "Claude 101",
    issuer: "Anthropic Education",
    date: "Apr 2026",
    credentialUrl: "https://verify.skilljar.com/c/nvgxq5u7x2do",
  },
  {
    name: "Introduction to Claude Cowork",
    issuer: "Anthropic Education",
    date: "Apr 2026",
    credentialUrl: "https://verify.skilljar.com/c/7zb7ut9x67so",
  },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic Education",
    date: "Apr 2026",
    credentialUrl: "https://verify.skilljar.com/c/ncb6etwg3t38",
  },
  {
    name: "Certified Vaadin 24 Developer",
    issuer: "Vaadin",
    date: "Sep 2024",
    credentialUrl:
      "https://vaadin.com/learn/certificate/1d93f123-abe6-41bb-8b42-d18dad664fc5",
  },
  {
    name: "Certified Vaadin 14 Developer",
    issuer: "Vaadin",
    date: "Sep 2024",
    credentialUrl:
      "https://vaadin.com/learn/certificate/9e2070de-6824-4c1b-80c8-0c06d29ecba3",
  },
  {
    name: "Java EE with Vaadin, JPA, Microservices, Spring and Maven",
    issuer: "Udemy",
    date: "Jan 2023",
    credentialUrl: "https://ude.my/UC-a8fc5d72-0411-4557-94d8-3bec7dd6c803",
  },
  {
    name: "Spring Boot & Spring Framework: IoC, DI, Bean-Container",
    issuer: "Udemy",
    date: "Dec 2022",
    credentialUrl: "https://ude.my/UC-a8fc5d72-0411-4557-94d8-3bec7dd6c803",
  },
  {
    name: "Working with Git",
    issuer: "Udemy",
    date: "Dec 2022",
    credentialUrl: "https://ude.my/UC-2f613e13-8b80-4c86-87ff-f87a1b8e6db1",
  },
  {
    name: "Java SE",
    issuer: "Udemy",
    date: "Nov 2022",
    credentialUrl: "https://ude.my/UC-0924648d-2d02-4d89-b3e0-e821ccbfd968",
  },
  {
    name: "Flutter & Dart Development",
    issuer: "Udemy",
    date: "Mar 2022",
    credentialUrl: "https://ude.my/UC-1c6ab070-50df-4efa-806d-70a8deeace07",
  },
  {
    name: "Java Masterclass",
    issuer: "Udemy",
    date: "Feb 2021",
    credentialUrl: "https://ude.my/UC-66ff4313-ad95-4808-a142-7b0d102a28d8",
  },
  {
    name: "Python",
    issuer: "Udemy",
    date: "Feb 2021",
    credentialUrl: "https://ude.my/UC-1f485347-24f7-445b-8647-f6388ffef37e",
  },
];

// ─── Navigation Items ────────────────────────────────────────────────────────

export const navItems = [
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.skills", href: "#skills" },
  { labelKey: "nav.services", href: "#services" },
  { labelKey: "nav.projects", href: "#projects" },
  { labelKey: "nav.certifications", href: "#certifications" },
  { labelKey: "nav.contact", href: "#contact" },
] as const;
