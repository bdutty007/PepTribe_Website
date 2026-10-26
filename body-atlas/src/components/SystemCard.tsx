import { useState } from "react";
import type { BodySystemFull, Compound } from "@/data/compounds";
import { SystemIcon } from "@/components/SystemIcon";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  system: BodySystemFull;
  isSelected: boolean;
  onSelect: (id: number | null) => void;
  onCompoundClick: (compound: Compound) => void;
}

export const SystemCard = ({
  system,
  isSelected,
  onSelect,
  onCompoundClick,
}: Props) => {
  const [showPeptides, setShowPeptides] = useState(false);

  return (
    <div
      id={`system-card-${system.id}`}
      className={`group relative rounded-2xl border-2 p-4 transition-all duration-500 backdrop-blur-sm scroll-mt-6 ${
        system.borderClass
      } ${isSelected ? "scale-[1.02] z-10" : "hover:scale-[1.01]"}`}
      style={{
        background: `linear-gradient(135deg, hsl(var(--background)) 0%, ${system.accentHex}08 100%)`,
        boxShadow: isSelected
          ? `0 0 40px ${system.accentHex}30, inset 0 0 30px ${system.accentHex}10`
          : undefined,
      }}
    >
      {/* Badge number */}
      <div
        className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full font-bold text-sm text-white shadow-lg"
        style={{ backgroundColor: system.accentHex }}
      >
        {system.badgeNumber}
      </div>

      {/* Header row — clickable to highlight body pin */}
      <div
        className="flex items-start gap-3 mb-3 cursor-pointer"
        onClick={() => onSelect(isSelected ? null : system.id)}
      >
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/10"
          style={{ backgroundColor: `${system.accentHex}15` }}
        >
          <SystemIcon
            name={system.iconName as any}
            size={28}
            style={{ color: system.accentHex }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-base font-bold tracking-wide leading-tight"
            style={{ color: system.accentHex }}
          >
            {system.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {system.subtitle}
          </p>
        </div>
      </div>

      {/* Clear expand / collapse control */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowPeptides(!showPeptides);
        }}
        className="flex w-full items-center justify-center gap-2 mt-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
        style={{
          backgroundColor: showPeptides
            ? `${system.accentHex}18`
            : `${system.accentHex}0a`,
          color: system.accentHex,
          border: `1px solid ${system.accentHex}25`,
        }}
      >
        {showPeptides ? (
          <>
            <ChevronUp size={14} />
            Collapse
          </>
        ) : (
          <>
            <ChevronDown size={14} />
            View {system.compounds.length} Compounds
          </>
        )}
      </button>

      {/* Compound preview cards */}
      {showPeptides && (
        <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 mt-3">
          {system.compounds.map((compound) => (
            <CompoundPreview
              key={compound.name}
              compound={compound}
              accentColor={system.accentHex}
              onClick={() => onCompoundClick(compound)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ──────────────────────────────────────── */
/*  Mini compound preview inside a card     */
/* ──────────────────────────────────────── */
function CompoundPreview({
  compound,
  accentColor,
  onClick,
}: {
  compound: Compound;
  accentColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="w-full text-left rounded-lg border border-white/5 bg-background/50 p-3 hover:border-white/15 hover:bg-background/70 transition-colors"
    >
      <h4 className="text-sm font-semibold text-foreground mb-1.5">
        {compound.name}
      </h4>
      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
        {compound.primaryFunction}
      </p>
      <div className="flex flex-wrap gap-1 mt-2">
        {(compound.keyBenefits ?? []).slice(0, 3).map((b) => (
          <span
            key={b}
            className="inline-block px-1.5 py-0.5 text-[9px] rounded-full"
            style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
          >
            {b.split(" ")[0]}
          </span>
        ))}
      </div>
    </button>
  );
}
