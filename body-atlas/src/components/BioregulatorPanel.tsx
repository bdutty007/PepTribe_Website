import { BIOREGULATORS } from "@/data/bioregulators";

interface Props {
  onSelect: (name: string) => void;
}

/**
 * Secondary reference panel listing the PepTribe peptide bioregulators
 * organized by their primary organ/tissue target. This is NOT a 10th body
 * system — the Atlas remains a 9-system model. Clicking an item opens the
 * existing peptide detail modal via the parent-supplied onSelect handler.
 */
export const BioregulatorPanel = ({ onSelect }: Props) => {
  return (
    <section className="mt-10">
      <div
        className="rounded-2xl border border-cyan-400/20 bg-card/40 backdrop-blur-md p-5 sm:p-6"
        style={{
          boxShadow:
            "0 0 24px rgba(34,211,238,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-bold text-foreground tracking-tight">
                Peptide Bioregulators
              </h3>
              <span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                {BIOREGULATORS.length} Bioregulators
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Organ- and tissue-specific signaling peptides
            </p>
          </div>
          <p className="text-xs text-muted-foreground/70 max-w-xs leading-relaxed">
            Explore bioregulators organized by their primary tissue or organ
            target.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {BIOREGULATORS.map((b) => (
            <button
              key={b.name}
              type="button"
              onClick={() => onSelect(b.name)}
              aria-label={`${b.name} — ${b.tissue} bioregulator`}
              className="group text-left rounded-xl border border-white/5 bg-background/40 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
              style={{ borderLeft: `3px solid ${b.color}` }}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                  Bioregulator
                </span>
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: b.color,
                    boxShadow: `0 0 8px ${b.color}80`,
                  }}
                  aria-hidden="true"
                />
              </div>
              <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {b.name}
              </h4>
              <p className="text-xs text-muted-foreground leading-snug mt-1 mb-1.5">
                {b.tissue}
              </p>
              <p
                className="text-[10px] uppercase tracking-wider font-medium"
                style={{ color: b.color }}
              >
                {b.system}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
