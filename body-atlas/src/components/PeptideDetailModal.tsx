import {
  X,
  Beaker,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  Pill,
  Route,
  Link2,
  Sparkles,
  Quote,
  BookOpen,
  LockKeyhole,
} from "lucide-react";
import type { Compound } from "@/data/compounds";
import { getPepCardLandingHref, getPepCardMeta } from "@/data/pepCards";

interface Props {
  compound: Compound;
  accentColor: string;
  isOpen: boolean;
  onClose: () => void;
  stackTitle?: string;
  stackCategory?: string;
  additionalCompounds?: Compound[];
}

/* ──────────────────────────────────────── */
/*  Renders all detail sections for one     */
/*  compound. Used for the primary compound */
/*  and each additional compound in a stack.*/
/* ──────────────────────────────────────── */
function CompoundSections({
  compound,
  accentColor,
  showHeader,
}: {
  compound: Compound;
  accentColor: string;
  showHeader?: boolean;
}) {
  return (
    <>
      {showHeader && (
        <div className="mb-4 pb-3 border-b border-white/5">
          <h3 className="text-lg font-extrabold text-foreground mb-1.5">
            {compound.name}
          </h3>
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold"
            style={{
              backgroundColor: `${accentColor}18`,
              color: accentColor,
            }}
          >
            {compound.category}
          </span>
        </div>
      )}

      {/* Professor Pep quote */}
      {compound.quote && (
        <section className="mb-5">
          <div
            className="flex items-start gap-2 p-3 rounded-lg"
            style={{
              backgroundColor: `${accentColor}08`,
              border: `1px solid ${accentColor}20`,
            }}
          >
            <Quote
              size={16}
              className="shrink-0 mt-0.5"
              style={{ color: accentColor }}
            />
            <p className="text-sm italic text-foreground/80 leading-relaxed">
              {compound.quote}
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground/60 mt-1.5 ml-1">
            — Professor Pep
          </p>
        </section>
      )}

      {/* Primary function */}
      <section className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Primary Function
        </h3>
        <p className="text-sm text-foreground/90 leading-relaxed">
          {compound.primaryFunction}
        </p>
      </section>

      {/* Key benefits */}
      <section className="mb-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
          Key Benefits
        </h3>
        <ul className="space-y-1.5">
          {compound.keyBenefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-2 text-sm text-foreground/85"
            >
              <CheckCircle2
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color: accentColor }}
              />
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      {/* Mechanisms of action */}
      {compound.mechanisms.length > 0 && (
        <section className="mb-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Mechanism of Action
          </h3>
          <div className="space-y-2">
            {compound.mechanisms.map((mech, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <Beaker
                  size={16}
                  className="shrink-0 mt-0.5"
                  style={{ color: accentColor }}
                />
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {mech}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Dosing & route */}
      {(compound.dosing || compound.route) && (
        <section className="mb-5 grid grid-cols-2 gap-3">
          {compound.dosing && (
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 mb-1">
                <Pill size={13} style={{ color: accentColor }} />
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Typical Dosing
                </h4>
              </div>
              <p className="text-xs text-foreground/85 leading-relaxed">
                {compound.dosing}
              </p>
            </div>
          )}
          {compound.route && (
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-1.5 mb-1">
                <Route size={13} style={{ color: accentColor }} />
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  How It&apos;s Taken
                </h4>
              </div>
              <p className="text-xs text-foreground/85 leading-relaxed">
                {compound.route}
              </p>
            </div>
          )}
        </section>
      )}

      {/* Pairs well with */}
      {compound.pairsWith.length > 0 && (
        <section className="mb-5">
          <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            <Link2 size={13} />
            Pairs Well With
          </h3>
          <div className="flex flex-wrap gap-2">
            {compound.pairsWith.map((synergy) => (
              <span
                key={synergy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: `${accentColor}12`,
                  color: accentColor,
                  border: `1px solid ${accentColor}25`,
                }}
              >
                {synergy}
                <ArrowRight size={10} />
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Co-factors */}
      {compound.cofactors.length > 0 && (
        <section className="mb-5">
          <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            <Sparkles size={13} />
            Supportive Co-Factors
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {compound.cofactors.map((co) => (
              <span
                key={co}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/8 text-foreground/80"
              >
                {co}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Evidence level */}
      {compound.evidence && (
        <section className="mb-4">
          <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            <FlaskConical size={13} />
            Evidence Level
          </h3>
          <p className="text-xs text-muted-foreground/80 leading-relaxed p-3 rounded-lg bg-white/[0.02] border border-white/5">
            {compound.evidence}
          </p>
        </section>
      )}
    </>
  );
}

export const PeptideDetailModal = ({
  compound,
  accentColor,
  isOpen,
  onClose,
  stackTitle,
  stackCategory,
  additionalCompounds,
}: Props) => {
  if (!isOpen) return null;

  const extras = additionalCompounds ?? [];
  const isStack = !!stackTitle || extras.length > 0;
  const headerName = stackTitle ?? compound.name;
  const headerCategory = stackCategory ?? compound.category;
  const pepCardMeta = getPepCardMeta(compound.name);
  const pepCardHref = getPepCardLandingHref(compound.name);
  const pepCardBadge = pepCardMeta
    ? pepCardMeta.twoPage
      ? "2-Page Pep-Card"
      : "Single-Page Pep-Card"
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border-2 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: `${accentColor}40`,
          backgroundColor: "hsl(220 20% 6%)",
          backgroundImage: `radial-gradient(circle at 50% 0%, ${accentColor}08 0%, transparent 60%)`,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-5 pb-4 border-b border-white/5">
          <h2 className="text-2xl font-extrabold text-foreground mb-2">
            {headerName}
          </h2>
          <span
            className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
          >
            {headerCategory}
          </span>
        </div>

        {/* Primary compound sections */}
        <CompoundSections
          compound={compound}
          accentColor={accentColor}
          showHeader={isStack}
        />

        {/* Additional compounds in the stack */}
        {extras.map((c) => (
          <div key={c.name}>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                Also in stack
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <CompoundSections
              compound={c}
              accentColor={accentColor}
              showHeader
            />
          </div>
        ))}

        {/* Pep-Card bridge */}
        <section
          className="mt-5 mb-4 p-4 rounded-xl border"
          style={{
            borderColor: `${accentColor}30`,
            background: `linear-gradient(135deg, ${accentColor}0D, rgba(255,255,255,0.02))`,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `${accentColor}18`,
                color: accentColor,
              }}
            >
              <BookOpen size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h3 className="text-sm font-extrabold text-foreground">
                  Explore the Pep-Card
                </h3>
                {pepCardBadge && (
                  <span
                    className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider"
                    style={{
                      backgroundColor: "rgba(56,189,248,0.13)",
                      border: "1px solid rgba(56,189,248,0.22)",
                      color: "#38bdf8",
                    }}
                  >
                    {pepCardBadge}
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground/80 leading-relaxed mb-3">
                Continue from the Body Atlas into the completed PepTribe
                Pep-Card library for a card-based view of this signal, its
                mechanisms, target areas, pairings, cofactors, and evidence
                context.
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={pepCardHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all hover:-translate-y-0.5"
                  style={{
                    color: "hsl(220 25% 5%)",
                    backgroundColor: accentColor,
                    boxShadow: `0 8px 22px ${accentColor}18`,
                  }}
                >
                  <BookOpen size={14} />
                  View Pep-Card
                </a>

                <a
                  href="https://peptribe.app.clientclub.net/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold border border-white/10 bg-white/[0.03] text-foreground/80 hover:bg-white/[0.06] transition-colors"
                >
                  <LockKeyhole size={14} />
                  Member Login
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/15 mt-4">
          <AlertCircle
            size={14}
            className="shrink-0 mt-0.5 text-amber-400/70"
          />
          <p className="text-[11px] text-muted-foreground/70 leading-relaxed">
            For educational and research purposes only. Not medical advice.
            Always consult qualified healthcare providers before considering any
            bio-signaling protocols.
          </p>
        </div>
      </div>
    </div>
  );
};
