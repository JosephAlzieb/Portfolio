import AnimatedSection from "./AnimatedSection";

/**
 * Reusable section heading with gradient title and subtitle.
 */
export default function SectionHeading({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle: string;
}) {
  return (
    <AnimatedSection>
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 gradient-text">
        {heading}
      </h2>
      <p className="text-muted text-center mb-12">{subtitle}</p>
    </AnimatedSection>
  );
}
