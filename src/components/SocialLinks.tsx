"use client";

import { socialLinks } from "@/lib/data";
import { FiGithub, FiLinkedin } from "react-icons/fi";

/**
 * Reusable social links (GitHub + LinkedIn).
 */
export default function SocialLinks({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const links = [
    { href: socialLinks.github, icon: <FiGithub size={size} />, label: "GitHub" },
    { href: socialLinks.linkedin, icon: <FiLinkedin size={size} />, label: "LinkedIn" },
  ];

  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-lg border border-card-border hover:border-primary hover:text-primary transition-all hover:bg-card"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}
