/**
 * Decorative divider between sections.
 * Uses a wave/organic shape instead of a simple line.
 * Pure CSS — no client JS needed.
 */
export default function SectionDivider() {
  return (
    <div className="relative py-6 overflow-hidden">
      <div className="flex items-center justify-center">
        <div className="relative flex items-center w-full max-w-3xl mx-auto px-8">
          {/* Left fading line */}
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-card-border/60" />

          {/* Center ornament — three dots with spacing */}
          <div className="mx-6 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-primary/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 ring-2 ring-primary/10" />
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </div>

          {/* Right fading line */}
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-card-border/60" />
        </div>
      </div>
    </div>
  );
}
