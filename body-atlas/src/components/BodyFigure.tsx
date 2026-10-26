import { useEffect, useRef, useState } from "react";
import type { BodySystemFull } from "@/data/compounds";

interface Props {
  systems: BodySystemFull[];
  activeSystemId: number | null;
  onSystemHover: (id: number | null) => void;
  onSystemClick: (id: number | null) => void;
}

// Clean base medical illustration with no baked-in numbers or legacy circles
const BODY_ATLAS_IMAGE =
  "https://vibe.filesafe.space/1787757240011572474/attachments/a5226e5a-df5a-4253-89b5-e2c8b0020b8a.png";

export const BodyFigure = ({
  systems,
  activeSystemId,
  onSystemHover,
  onSystemClick,
}: Props) => {
  // P4 — Pause the ambient pulse-glow animation when the body figure is
  // scrolled off-screen, so the compositor isn't running an infinite
  // animation no one can see. Re-enables when it scrolls back into view.
  const figureRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = figureRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={figureRef}
      className="relative flex items-center justify-center select-none"
      aria-label="Interactive human body atlas showing 9 biological systems"
    >
      {/* Subtle ambient glow behind figure */}
      <div
        className={`absolute inset-0 blur-3xl opacity-20 rounded-full pointer-events-none ${
          inView ? "animate-pulse-glow" : ""
        }`}
        style={{
          background: activeSystemId
            ? (systems.find((s) => s.id === activeSystemId)?.accentHex ??
              "#7C3DB5")
            : "linear-gradient(180deg, #7C3DB5, #149B9B)",
          width: "70%",
          height: "80%",
          left: "15%",
          top: "10%",
        }}
      />

      {/* Body atlas image container with exact relative coordinate bounds */}
      <div className="relative z-10 w-full max-w-sm">
        <img
          src={BODY_ATLAS_IMAGE}
          alt="Interactive human body atlas showing 9 biological systems with peptide signaling networks"
          className="w-full h-auto drop-shadow-2xl rounded-2xl block"
          loading="lazy"
        />

        {/* Exactly 9 official interactive body markers (1–9) */}
        {systems.map((system) => {
          const isActive = activeSystemId === system.id;
          const color = system.accentHex;
          return (
            <button
              key={system.id}
              data-marker={system.badgeNumber}
              onClick={() => {
                const next = isActive ? null : system.id;
                onSystemClick(next);
                // On mobile, scroll to the corresponding system card
                if (
                  next !== null &&
                  window.matchMedia("(max-width: 1023px)").matches
                ) {
                  requestAnimationFrame(() => {
                    document
                      .getElementById(`system-card-${system.id}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "center" });
                  });
                }
              }}
              onMouseEnter={() => onSystemHover(system.id)}
              onMouseLeave={() => onSystemHover(null)}
              aria-label={`${system.title} — system ${system.badgeNumber}`}
              className="atlas-marker absolute z-20 rounded-full flex items-center justify-center transition-shadow duration-200"
              style={
                {
                  "--marker-color": color,
                  left: `${system.pinPosition.x}%`,
                  top: `${system.pinPosition.y}%`,
                  width: "42px",
                  height: "42px",
                  cursor: "pointer",
                  background: "rgba(7, 10, 22, 0.94)",
                  border: isActive
                    ? `2.5px solid ${color}`
                    : `2px solid ${color}`,
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "16px",
                  boxShadow: isActive
                    ? `0 0 12px ${color}, 0 0 24px ${color}80, inset 0 0 10px rgba(255,255,255,0.1)`
                    : `0 0 8px ${color}, 0 0 16px ${color}40, inset 0 0 8px rgba(255,255,255,0.05)`,
                  transform: "translate(-50%, -50%)",
                } as React.CSSProperties
              }
            >
              <span className="atlas-marker-number">{system.badgeNumber}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
