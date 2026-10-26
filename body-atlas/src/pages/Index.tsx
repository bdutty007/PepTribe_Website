import { useState, useCallback, useEffect, useMemo } from "react";
import { BODY_SYSTEMS_FULL, ALL_COMPOUNDS } from "@/data/compounds";
import type { Compound } from "@/data/compounds";
import { getPepCardMeta } from "@/data/pepCards";
import { getPepCardImageUrl } from "@/data/pepCardImages";
import { PILLARS_NAV } from "@/data/bodyAtlasData";
import { SystemCard } from "@/components/SystemCard";
import { BodyFigure } from "@/components/BodyFigure";
import { NavigationPillars } from "@/components/NavigationPillars";
import { PepCardViewerModal } from "@/components/PepCardViewerModal";
import { PepTeamSection } from "@/components/PepTeamSection";
import { BioregulatorPanel } from "@/components/BioregulatorPanel";

const Index = () => {
  const [activeSystemId, setActiveSystemId] = useState<number | null>(null);
  const [hoveredSystemId, setHoveredSystemId] = useState<number | null>(null);
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  // PepCard viewer state: index into the alphabetical compound directory.
  const [viewIndex, setViewIndex] = useState<number | null>(null);

  const handleSystemSelect = useCallback(
    (id: number | null) => {
      setActiveSystemId(id === activeSystemId ? null : id);
    },
    [activeSystemId],
  );

  const leftSystems = BODY_SYSTEMS_FULL.filter((s) => s.side === "left");
  const rightSystems = BODY_SYSTEMS_FULL.filter((s) => s.side === "right");

  const totalCompounds = ALL_COMPOUNDS.length;

  // Alphabetical directory — the canonical browse order for the viewer.
  const sortedCompounds = useMemo(
    () =>
      [...ALL_COMPOUNDS].sort((a, b) =>
        a.compound.name.localeCompare(b.compound.name, "en", {
          sensitivity: "base",
        }),
      ),
    [],
  );

  const openCompound = useCallback(
    (compound: Compound) => {
      const idx = sortedCompounds.findIndex(
        (a) => a.compound.name === compound.name,
      );
      setViewIndex(idx >= 0 ? idx : 0);
    },
    [sortedCompounds],
  );

  // Bioregulator panel → reuse the existing Atlas compound record (matched
  // case-insensitively so uppercase aliases like CORTAGEN / PANCRAGEN resolve).
  const openBioregulator = useCallback(
    (name: string) => {
      const found = ALL_COMPOUNDS.find(
        (a) => a.compound.name.toLowerCase() === name.toLowerCase(),
      )?.compound;
      if (found) openCompound(found);
    },
    [openCompound],
  );

  /**
   * Centralized deep-link resolver for ?compound=<slug>.
   *
   * 1. First tries the canonical Pep-Card lookup (handles all aliases like
   *    cjc-ipa, cjc-ipa-blend, cjc-1295-with-dac, nad-plus, tesa-ipa-cjc,
   *    thymosin-alpha-1, hgh, p21, pnc-27, snap-8, etc.).
   * 2. If a canonical card is found, matches it back to the Atlas compound
   *    whose name/aliases resolve to the same canonical card.
   * 3. Falls back to a mechanical slug comparison against Atlas compound
   *    names so legacy deep links keep working.
   */
  const normalizeCompoundSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\+/g, "plus")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedCompound = params.get("compound");

    if (!requestedCompound) return;

    // 1. Resolve through the centralized canonical Pep-Card metadata.
    const canonical = getPepCardMeta(requestedCompound);

    // 2. Match back to an Atlas compound.
    const match = ALL_COMPOUNDS.find((item) => {
      if (canonical) {
        // Same canonical card => same compound (handles all aliases).
        return getPepCardMeta(item.compound.name)?.slug === canonical.slug;
      }
      // 3. Fallback: mechanical slug comparison for legacy links.
      return (
        normalizeCompoundSlug(item.compound.name) ===
        normalizeCompoundSlug(requestedCompound)
      );
    });

    if (match) {
      openCompound(match.compound);
    }
  }, [openCompound]);

  // Smooth-scroll to the PepTeam chat section when arriving via #peptribe-chat.
  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash !== "#peptribe-chat") return;

      const chatSection = document.getElementById("peptribe-chat");

      if (chatSection) {
        chatSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    requestAnimationFrame(() => {
      setTimeout(handleHashScroll, 250);
    });

    window.addEventListener("hashchange", handleHashScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  const openStack = (stack: {
    title: string;
    category: string;
    accentHex: string;
    compoundNames: string[];
  }) => {
    const found = stack.compoundNames
      .map((n) => ALL_COMPOUNDS.find((a) => a.compound.name === n)?.compound)
      .filter((c): c is Compound => !!c);
    if (found.length === 0) return;
    // Open the first compound in the stack's PepCard viewer.
    openCompound(found[0]);
  };

  const FEATURED_STACKS = [
    {
      badgeNumber: 1,
      category: "COGNITIVE",
      title: "Semax & Selank Cognitive Dual-Stack",
      accentHex: "#7C3DB5",
      description:
        "Neurotrophic dual-stack supporting focus, memory, and calm clarity through complementary BDNF and inhibitory signaling.",
      compoundNames: ["Semax", "Selank"],
    },
    {
      badgeNumber: 9,
      category: "PERFORMANCE",
      title: "CJC-1295 + Ipamorelin Secretagogue Stack",
      accentHex: "#149B9B",
      description:
        "Complementary GHRH + ghrelin signaling supporting natural GH pulses, recovery, and lean body composition.",
      compoundNames: ["CJC/Ipa"],
    },
    {
      badgeNumber: 3,
      category: "TISSUE REPAIR",
      title: "BPC-157 + TB-500 Wolverine Healing Stack",
      accentHex: "#59A634",
      description:
        "Repair coordinator + repair crew blend accelerating tendon, ligament, and soft-tissue healing.",
      compoundNames: ["Wolverine"],
    },
    {
      badgeNumber: 3,
      category: "REGENERATIVE",
      title: "KLOW Complete Regenerative System",
      accentHex: "#59A634",
      description:
        "Four-peptide regenerative stack coordinating whole-body tissue repair, immune balance, and recovery.",
      compoundNames: ["KLOW"],
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Starry background layer */}
      <div className="fixed inset-0 bg-starry pointer-events-none opacity-40" />

      {/* Gradient overlays for depth */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-500/4 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-blue-950/20 to-transparent" />
        <div className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-purple-950/15 to-transparent" />
      </div>

      {/* ────────────────────────────────────── */}
      {/*  HEADER / HERO                     */}
      {/* ────────────────────────────────────── */}
      <header className="relative z-10 pt-8 pb-4 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Logo row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <img
                src="https://assets.cdn.filesafe.space/AOSIbdI8smVgzE3kDr0X/media/6a899f1167bb7ac351c2da86.svg"
                alt="PepTribe Body Atlas Logo"
                className="h-11 w-auto"
              />
            </div>
          </div>

          {/* Main hero title */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-5">
              <span
                className="block bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                YOUR BODY.
              </span>
              <span
                className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                YOUR SIGNALS.
              </span>
              <span
                className="block bg-gradient-to-r from-pink-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                YOUR POTENTIAL.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Interactive body atlas exploring{" "}
              <strong className="text-foreground">9 biological systems</strong>{" "}
              and{" "}
              <strong className="text-foreground">
                {totalCompounds} peptide compounds
              </strong>{" "}
              with their signaling networks. Click any system card or body pin
              to explore signals, mechanisms, dosing, and synergistic stacks.
            </p>
          </div>
        </div>
      </header>

      {/* ────────────────────────────────────── */}
      {/*  MAIN ATLAS GRID                   */}
      {/* ────────────────────────────────────── */}
      <main id="explore" className="relative z-10 px-4 sm:px-6 lg:px-10 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Three-column layout: Left cards | Body figure | Right cards */}
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-6 lg:gap-8 items-start">
            {/* LEFT COLUMN — Systems 1, 2, 3 */}
            <aside className="space-y-4 order-2 lg:order-1">
              {leftSystems.map((system) => (
                <SystemCard
                  key={system.id}
                  system={system}
                  isSelected={activeSystemId === system.id}
                  onSelect={handleSystemSelect}
                  onCompoundClick={openCompound}
                />
              ))}
            </aside>

            {/* CENTER — Body Figure */}
            <section className="flex justify-center order-1 lg:order-2 py-8 min-h-[520px]">
              <BodyFigure
                systems={BODY_SYSTEMS_FULL}
                activeSystemId={activeSystemId ?? hoveredSystemId}
                onSystemHover={setHoveredSystemId}
                onSystemClick={handleSystemSelect}
              />

              {/* Active system info overlay (centered below figure on mobile) */}
              {activeSystemId && (
                <div className="lg:hidden absolute -bottom-4 left-4 right-4 p-4 rounded-xl border border-white/10 bg-card/80 backdrop-blur-sm">
                  <p className="text-sm text-muted-foreground">
                    Viewing:{" "}
                    <strong
                      style={{
                        color: BODY_SYSTEMS_FULL.find(
                          (s) => s.id === activeSystemId,
                        )?.accentHex,
                      }}
                    >
                      {
                        BODY_SYSTEMS_FULL.find((s) => s.id === activeSystemId)
                          ?.title
                      }
                    </strong>
                  </p>
                </div>
              )}
            </section>

            {/* RIGHT COLUMN — Systems 4, 5, 6, 7 */}
            <aside className="space-y-4 order-3">
              {rightSystems.map((system) => (
                <SystemCard
                  key={system.id}
                  system={system}
                  isSelected={activeSystemId === system.id}
                  onSelect={handleSystemSelect}
                  onCompoundClick={openCompound}
                />
              ))}
            </aside>
          </div>

          {/* ────────────────────────────────────── */}
          {/*  PEPTEAM — directly under the body      */}
          {/* ────────────────────────────────────── */}
          <BioregulatorPanel onSelect={openBioregulator} />

          <PepTeamSection />

          {/* ────────────────────────────────────── */}
          {/*  NAVIGATION PILLARS               */}
          {/* ────────────────────────────────────── */}
          <section className="mt-16 pt-10 border-t border-white/5">
            <div className="text-center mb-8">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Navigate Your Journey
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose a body system to explore its peptide signals and related{" "}
                <strong className="text-cyan-400">PepCards</strong>.
              </p>
            </div>

            <NavigationPillars
              items={PILLARS_NAV}
              activeIndex={activeNavIndex}
              onSelect={setActiveNavIndex}
            />
          </section>

          {/* ────────────────────────────────────── */}
          {/*  FEATURED COMPOUND SECTION        */}
          {/* ────────────────────────────────────── */}
          <section className="mt-16 pt-10 border-t border-white/5">
            <h3 className="text-lg font-bold text-foreground text-center mb-2">
              Featured Compound Stacks
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Most requested peptide signal combinations based on clinical
              interest
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURED_STACKS.map((stack) => (
                <button
                  key={`featured-${stack.title}`}
                  onClick={() => openStack(stack)}
                  className="group p-5 rounded-2xl border border-white/5 bg-card/50 backdrop-blur-sm text-left hover:border-white/15 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  style={{
                    boxShadow: `inset 0 1px 0 ${stack.accentHex}08`,
                  }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ backgroundColor: stack.accentHex }}
                      >
                        {stack.badgeNumber}
                      </span>
                      <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
                        {stack.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-foreground mb-1 group-hover:text-primary transition-colors leading-snug">
                      {stack.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                      {stack.description}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider mt-4"
                    style={{ color: stack.accentHex }}
                  >
                    View Stack Details →
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* ────────────────────────────────────── */}
          {/*  FULL COMPOUND DIRECTORY          */}
          {/* ────────────────────────────────────── */}
          <section className="mt-16 pt-10 border-t border-white/5">
            <div className="text-center mb-8">
              <h3 className="text-lg font-bold text-foreground mb-2">
                Complete Compound Directory
              </h3>
              <p className="text-sm text-muted-foreground">
                All{" "}
                <strong className="text-foreground">
                  {totalCompounds} peptide compounds
                </strong>{" "}
                from the PepTribe Body Atlas. Click any card for full details.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {sortedCompounds.map(({ compound, accentHex, systemId }) => (
                <button
                  key={`${systemId}-${compound.name}`}
                  onClick={() => openCompound(compound)}
                  className="group p-3 rounded-xl border border-white/5 bg-card/40 backdrop-blur-sm text-left hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ boxShadow: `inset 0 1px 0 ${accentHex}08` }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mb-2"
                    style={{ backgroundColor: accentHex }}
                  />
                  <h4 className="text-xs font-bold text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
                    {compound.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 leading-snug">
                    {compound.category}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* ────────────────────────────────────── */}
          {/*  STATS FOOTER BAR                 */}
          {/* ────────────────────────────────────── */}
          <section className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Body Systems", value: "9", color: "#7C3DB5" },
              {
                label: "Peptide Compounds",
                value: `${totalCompounds}`,
                color: "#149B9B",
              },
              { label: "Synergy Stacks", value: "50+", color: "#F57C00" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-5 rounded-2xl border border-white/5 bg-card/30 backdrop-blur-sm"
              >
                <div
                  className="text-3xl font-black"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      {/* ────────────────────────────────────── */}
      {/*  FOOTER                            */}
      {/* ────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-md mx-auto">
            The PepTribe Body Atlas is an educational visualization tool. All
            peptide information is presented for research and informational
            purposes only. This is not medical advice. Always consult qualified
            healthcare professionals before considering any bio-signaling
            protocols.
          </p>
          <p className="text-[11px] text-muted-foreground/40 mt-3">
            © 2026 PepTribe. Interactive Body Atlas v2.0. Built with science &
            curiosity.
          </p>
        </div>
      </footer>

      {/* PepCard image viewer */}
      {viewIndex !== null && sortedCompounds[viewIndex] && (
        <PepCardViewerModal
          compoundName={sortedCompounds[viewIndex].compound.name}
          imageUrl={getPepCardImageUrl(
            sortedCompounds[viewIndex].compound.name,
          )}
          previousCompound={
            viewIndex > 0
              ? {
                  name: sortedCompounds[viewIndex - 1].compound.name,
                  imageUrl: getPepCardImageUrl(
                    sortedCompounds[viewIndex - 1].compound.name,
                  ),
                }
              : null
          }
          nextCompound={
            viewIndex < sortedCompounds.length - 1
              ? {
                  name: sortedCompounds[viewIndex + 1].compound.name,
                  imageUrl: getPepCardImageUrl(
                    sortedCompounds[viewIndex + 1].compound.name,
                  ),
                }
              : null
          }
          onClose={() => setViewIndex(null)}
          onNavigate={(t) => {
            const idx = sortedCompounds.findIndex(
              (a) => a.compound.name === t.name,
            );
            if (idx >= 0) setViewIndex(idx);
          }}
        />
      )}
    </div>
  );
};

export default Index;
