import { useState } from "react";
import { PlusCircle, RotateCcw } from "lucide-react";
import { PEP_CHARACTERS } from "@/data/pepTeam";
import { PepCharacterCard } from "@/components/PepCharacterCard";

export interface ResetRequest {
  id: string;
  n: number;
}

export const PepTeamSection = () => {
  // Only one character chat expanded at a time on desktop.
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // One-shot reset request targeting a SPECIFIC character. The global
  // "Start New Chat" button only resets the currently expanded character —
  // never all three. Each card inspects this and acts only if its id matches.
  const [resetRequest, setResetRequest] = useState<ResetRequest | null>(null);
  const resetCounter = useState(0)[1];

  const toggle = (id: string) =>
    setExpandedId((cur) => (cur === id ? null : id));

  const handleGlobalNewChat = () => {
    // Act on the currently selected/open character only. If none is open,
    // there is no active conversation to reset — no-op.
    if (!expandedId) return;
    setResetRequest({ id: expandedId, n: Date.now() });
    // bump counter to force a re-render even if id is identical
    resetCounter((c) => c + 1);
  };

  const isAnyExpanded = expandedId !== null;

  return (
    <section
      id="peptribe-chat"
      className="mt-12 pt-10 border-t border-white/5"
      style={{ scrollMarginTop: "90px" }}
    >
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Meet the PepTeam
          </h3>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
          Three guides, three perspectives. Click any character to start a live
          chat — ask about mechanisms, what it all means, or just explore.
        </p>

        {/* Start New Chat Control — resets ONLY the currently open character. */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={handleGlobalNewChat}
            disabled={!isAnyExpanded}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-100 shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            title={
              isAnyExpanded
                ? "Start a fresh conversation for the currently open character"
                : "Open a character chat first, then start a new chat"
            }
          >
            <PlusCircle size={16} className="text-cyan-400" />
            <span>Start New Chat</span>
            <RotateCcw size={13} className="text-cyan-400/70 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Cards: 1 col mobile (scrollable), 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
        {PEP_CHARACTERS.map((character) => (
          <PepCharacterCard
            key={character.id}
            character={character}
            isExpanded={expandedId === character.id}
            onToggle={() => toggle(character.id)}
            resetRequest={resetRequest}
          />
        ))}
      </div>
    </section>
  );
};
