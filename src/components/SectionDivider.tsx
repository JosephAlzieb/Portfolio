/**
 * A simple decorative divider between sections.
 * Pure CSS — no client JS needed.
 */
export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative flex items-center w-full max-w-2xl mx-auto px-6">
        {/* Left gradient line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-primary/50" />
        {/* Center diamond */}
        <div className="mx-4 w-2.5 h-2.5 rotate-45 bg-primary/70 shadow-lg shadow-primary/30" />
        {/* Right gradient line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/30 to-primary/50" />
      </div>
    </div>
  );
}
